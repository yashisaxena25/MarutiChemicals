import React from 'react';

/**
 * Category 04 — Medical Equipment & Supplies (Stethoscope)
 * Hover animation:
 * - Stethoscope earpieces remain balanced
 * - The flexible tubing articulates subtly
 * - The chest piece diaphragm moves with an acoustic ripple pulse
 */
export function StethoscopeIcon({ isHovered }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width="48"
      height="48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
      aria-hidden="true"
    >
      {/* Binaural headset tubes & earpieces */}
      <circle cx="20" cy="14" r="2.5" fill="#1e293b" />
      <circle cx="34" cy="14" r="2.5" fill="#1e293b" />

      {/* Headset Arch */}
      <path
        d="M20 16 V22 C20 28 27 30 27 34"
        stroke="#1e293b"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M34 16 V22 C34 28 27 30 27 34"
        stroke="#1e293b"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Joint Collar */}
      <rect x="25" y="33" width="4" height="4" rx="1" fill="#475569" />

      {/* Flexible Tubing that shifts with fluid curve */}
      <path
        d={isHovered ? "M27 37 C27 48 40 48 40 38 C40 30 48 30 48 38" : "M27 37 C27 50 38 50 38 39 C38 30 46 32 46 40"}
        stroke="#0284c7"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
        style={{
          transition: 'd 700ms cubic-bezier(0.34, 1.3, 0.64, 1)',
        }}
      />

      {/* Chest Piece (Diaphragm & Bell) */}
      <g
        style={{
          transform: isHovered ? 'translate(48px, 40px) scale(1.08)' : 'translate(46px, 42px) scale(1)',
          transformOrigin: '0 0',
          transition: 'all 600ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Acoustic pulse ripple ring */}
        <circle
          cx="0"
          cy="0"
          r={isHovered ? "11" : "5"}
          stroke="#38bdf8"
          strokeWidth="1.5"
          fill="none"
          style={{
            opacity: isHovered ? 0.6 : 0,
            transition: 'all 750ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Outer Ring */}
        <circle cx="0" cy="0" r="6" fill="#f8fafc" stroke="#1e293b" strokeWidth="2" />
        
        {/* Core diaphragm center */}
        <circle cx="0" cy="0" r="2.8" fill={isHovered ? "#0284c7" : "#64748b"} />
      </g>
    </svg>
  );
}
