import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

// PERFECT 6-FOLD ROTATIONAL & REFLECTIONAL SYMMETRIC BENZENE DERIVATIVE (Hexasubstituted Ring)
// - Ring radius: 1.85 units in XY plane (6 carbons with alternating double bonds)
// - 6 Symmetric Radial Arms extending outwards at identical lengths (R = 3.65)
// - Perfectly centered at [0, 0, 0] with balanced harmonic proportions
const RING_RADIUS = 1.85;
const ARM_RADIUS = 3.65;

const RAW_ATOMS = [
  // 6 Ring Core Atoms: Blue and White palette
  { index: 0, lightColor: '#0284c7', darkColor: '#38bdf8', radius: 0.35, angle: 0 },
  { index: 1, lightColor: '#e0f2fe', darkColor: '#1e293b', radius: 0.35, angle: Math.PI / 3 },
  { index: 2, lightColor: '#0284c7', darkColor: '#38bdf8', radius: 0.35, angle: (2 * Math.PI) / 3 },
  { index: 3, lightColor: '#e0f2fe', darkColor: '#1e293b', radius: 0.35, angle: Math.PI },
  { index: 4, lightColor: '#0284c7', darkColor: '#38bdf8', radius: 0.35, angle: (4 * Math.PI) / 3 },
  { index: 5, lightColor: '#e0f2fe', darkColor: '#1e293b', radius: 0.35, angle: (5 * Math.PI) / 3 },

  // 6 Symmetric Outer Arm Substituents (Cyan, Deep Blue & Pearl White)
  { index: 6, lightColor: '#06b6d4', darkColor: '#06b6d4', radius: 0.42, angle: 0, zOffset: 0.4 },
  { index: 7, lightColor: '#bae6fd', darkColor: '#0284c7', radius: 0.42, angle: Math.PI / 3, zOffset: -0.4 },
  { index: 8, lightColor: '#0369a1', darkColor: '#38bdf8', radius: 0.42, angle: (2 * Math.PI) / 3, zOffset: 0.4 },
  { index: 9, lightColor: '#e2e8f0', darkColor: '#94a3b8', radius: 0.42, angle: Math.PI, zOffset: -0.4 },
  { index: 10, lightColor: '#0284c7', darkColor: '#38bdf8', radius: 0.42, angle: (4 * Math.PI) / 3, zOffset: 0.4 },
  { index: 11, lightColor: '#38bdf8', darkColor: '#0284c7', radius: 0.42, angle: (5 * Math.PI) / 3, zOffset: -0.4 },
].map((item) => {
  const isOuter = item.index >= 6;
  const r = isOuter ? ARM_RADIUS : RING_RADIUS;
  const x = Math.cos(item.angle) * r;
  const y = Math.sin(item.angle) * r;
  const z = isOuter ? (item.zOffset || 0) : 0;
  return {
    ...item,
    rawPos: [x, y, z],
  };
});

// 12 Total Symmetric Bonds
const RAW_BONDS = [
  // 6 Ring Core Bonds
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 0],
  // 6 Symmetric Radial Arm Bonds
  [0, 6],
  [1, 7],
  [2, 8],
  [3, 9],
  [4, 10],
  [5, 11],
];

// Alternating double bonds on ring for classic aromatic resonance
const DOUBLE_BOND_PAIRS = new Set(['0-1', '2-3', '4-5']);

function computeSymmetricMoleculeGeometry() {
  // Centered atoms
  const centeredAtoms = RAW_ATOMS.map((a) => {
    const pos = new THREE.Vector3(...a.rawPos);
    return {
      ...a,
      posVector: pos,
      position: [pos.x, pos.y, pos.z],
    };
  });

  const ringCenter = new THREE.Vector3(0, 0, 0);

  const halfBonds = [];
  const doubleBonds = [];

  RAW_BONDS.forEach(([fromIdx, toIdx], bIdx) => {
    const atomA = centeredAtoms[fromIdx];
    const atomB = centeredAtoms[toIdx];

    const A = atomA.posVector.clone();
    const B = atomB.posVector.clone();

    const direction = new THREE.Vector3().subVectors(B, A);
    const unit = direction.clone().normalize();

    const start = A.clone().add(unit.clone().multiplyScalar(atomA.radius * 0.85));
    const end = B.clone().sub(unit.clone().multiplyScalar(atomB.radius * 0.85));

    const bondMidpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const halfLength = start.distanceTo(end) * 0.5;

    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), unit);

    // Half A (colored to match Atom A)
    const midA = new THREE.Vector3().addVectors(start, bondMidpoint).multiplyScalar(0.5);
    halfBonds.push({
      key: `half-${bIdx}-A`,
      atomIndex: fromIdx,
      position: [midA.x, midA.y, midA.z],
      quaternion,
      length: halfLength,
    });

    // Half B (colored to match Atom B)
    const midB = new THREE.Vector3().addVectors(bondMidpoint, end).multiplyScalar(0.5);
    halfBonds.push({
      key: `half-${bIdx}-B`,
      atomIndex: toIdx,
      position: [midB.x, midB.y, midB.z],
      quaternion,
      length: halfLength,
    });

    // Symmetrical parallel double-bond lines directed inward toward center
    const pairKey = `${fromIdx}-${toIdx}`;
    if (DOUBLE_BOND_PAIRS.has(pairKey)) {
      const toRing = new THREE.Vector3().subVectors(ringCenter, bondMidpoint);
      const proj = unit.clone().multiplyScalar(toRing.dot(unit));
      const perp = toRing.clone().sub(proj).normalize().multiplyScalar(0.14);

      const dStart = start.clone().add(perp);
      const dEnd = end.clone().add(perp);
      const dMidpoint = new THREE.Vector3().addVectors(dStart, dEnd).multiplyScalar(0.5);
      const dLength = dStart.distanceTo(dEnd);

      doubleBonds.push({
        key: `double-${bIdx}`,
        position: [dMidpoint.x, dMidpoint.y, dMidpoint.z],
        quaternion,
        length: dLength,
        atomAIdx: fromIdx,
      });
    }
  });

  return { centeredAtoms, halfBonds, doubleBonds };
}

const {
  centeredAtoms: ATOMS,
  halfBonds: HALF_BONDS,
  doubleBonds: DOUBLE_BONDS,
} = computeSymmetricMoleculeGeometry();

function MoleculeCluster({ prefersReducedMotion, isMobile, isDark }) {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (prefersReducedMotion || !groupRef.current) return;

    // Smooth continuous rotation around centered Y-axis (~25 seconds per full turn)
    const turnDuration = 25;
    const rotSpeed = (Math.PI * 2) / turnDuration;
    groupRef.current.rotation.y += rotSpeed * delta;
  });

  // Placement restored directly behind the headline text
  const groupPosition = isMobile ? [0, 0, 0] : [-2.5, 0, 0];
  const groupScale = isMobile ? 0.38 : 0.52;

  return (
    <group
      ref={groupRef}
      position={groupPosition}
      scale={groupScale}
      rotation={[0.3, 0, 0.2]} // Constant balanced tilt for rich 3D depth
    >
      {/* Symmetrical Atoms */}
      {ATOMS.map((atom) => {
        const atomColor = isDark ? atom.darkColor : atom.lightColor;
        return (
          <mesh key={`atom-${atom.index}`} position={atom.position}>
            <sphereGeometry args={[atom.radius, 36, 36]} />
            <meshPhysicalMaterial
              color={atomColor}
              roughness={isDark ? 0.22 : 0.15}
              metalness={0.05}
              clearcoat={1.0}
              clearcoatRoughness={0.1}
              transmission={0}
              transparent={false}
            />
          </mesh>
        );
      })}

      {/* Symmetrical Dual-Tone CPK Split Bonds */}
      {HALF_BONDS.map((hb) => {
        const parentAtom = ATOMS[hb.atomIndex];
        const bondColor = isDark ? parentAtom.darkColor : parentAtom.lightColor;
        return (
          <mesh key={hb.key} position={hb.position} quaternion={hb.quaternion}>
            <cylinderGeometry args={[0.07, 0.07, hb.length, 24]} />
            <meshPhysicalMaterial
              color={bondColor}
              roughness={0.2}
              metalness={0.05}
              clearcoat={1.0}
              clearcoatRoughness={0.1}
              transmission={0}
              transparent={false}
            />
          </mesh>
        );
      })}

      {/* Parallel Double Bond Inward Lines */}
      {DOUBLE_BONDS.map((db) => {
        const atomA = ATOMS[db.atomAIdx];
        const dbColor = isDark ? atomA.darkColor : atomA.lightColor;
        return (
          <mesh key={db.key} position={db.position} quaternion={db.quaternion}>
            <cylinderGeometry args={[0.045, 0.045, db.length, 20]} />
            <meshPhysicalMaterial
              color={dbColor}
              roughness={0.25}
              metalness={0.05}
              clearcoat={1.0}
              clearcoatRoughness={0.1}
              transmission={0}
              transparent={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export function MoleculeBackground() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);
    const handleMotionChange = (e) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    const screenQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(screenQuery.matches);
    const handleScreenChange = (e) => setIsMobile(e.matches);
    screenQuery.addEventListener('change', handleScreenChange);

    const handleVisibility = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      screenQuery.removeEventListener('change', handleScreenChange);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: isMobile ? 0.45 : 0.75,
        transition: 'opacity 400ms ease',
      }}
      aria-hidden="true"
    >
      <Canvas
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        camera={{ fov: 25, position: [0, 0, 22], near: 0.1, far: 100 }}
        frameloop={isVisible ? 'always' : 'never'}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <ambientLight intensity={isDark ? 1.4 : 1.7} />
        <directionalLight position={[8, 10, 6]} intensity={isDark ? 1.7 : 2.1} />
        <pointLight position={[-6, 4, 6]} intensity={isDark ? 1.1 : 1.4} color="#38bdf8" />
        <pointLight position={[4, -6, 5]} intensity={isDark ? 0.9 : 1.2} color="#ffffff" />

        <Suspense fallback={null}>
          <Environment preset="city" />
          <MoleculeCluster
            prefersReducedMotion={isReducedMotion}
            isMobile={isMobile}
            isDark={isDark}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default MoleculeBackground;
