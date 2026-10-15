import React from 'react';

/**
 * Category 05 — Clean Room Products (Airflow / Ventilation Icon)
 * Hover animation:
 * - Cleanroom filter chamber boundary remains stable
 * - Staggered laminar airflow paths glide smoothly through the filter grid
 * - Controlled industrial aero-dynamics
 */
export function AirflowIcon({ isHovered }) {
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
      {/* HEPA Filter Frame / Plenum Box */}
      <rect
        x="12"
        y="12"
        width="40"
        height="12"
        rx="2"
        stroke="#1e293b"
        strokeWidth="2.2"
        fill="#f8fafc"
      />

      {/* Internal HEPA Pleat Vanes */}
      <line x1="20" y1="12" x2="20" y2="24" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="28" y1="12" x2="28" y2="24" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="36" y1="12" x2="36" y2="24" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="44" y1="12" x2="44" y2="24" stroke="#94a3b8" strokeWidth="1.5" />

      {/* Cleanroom Controlled Airflow Streamlines (staggered downward flow) */}
      {/* Streamline 1 (Left) */}
      <path
        d="M20 28 V48 M20 48 L17 44 M20 48 L23 44"
        stroke="#0891b2"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="24"
        strokeDashoffset={isHovered ? "0" : "8"}
        style={{
          transform: isHovered ? 'translateY(5px)' : 'translateY(0)',
          opacity: isHovered ? 1 : 0.45,
          transition: 'all 600ms 50ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Streamline 2 (Center Primary Flow) */}
      <path
        d="M32 28 V54 M32 54 L29 50 M32 54 L35 50"
        stroke="#06b6d4"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="30"
        strokeDashoffset={isHovered ? "0" : "10"}
        style={{
          transform: isHovered ? 'translateY(6px)' : 'translateY(0)',
          opacity: isHovered ? 1 : 0.6,
          transition: 'all 700ms 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Streamline 3 (Right) */}
      <path
        d="M44 28 V48 M44 48 L41 44 M44 48 L47 44"
        stroke="#0891b2"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="24"
        strokeDashoffset={isHovered ? "0" : "8"}
        style={{
          transform: isHovered ? 'translateY(5px)' : 'translateY(0)',
          opacity: isHovered ? 1 : 0.45,
          transition: 'all 600ms 100ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Secondary micro-drift particles indicating laminar purity */}
      <circle
        cx="26"
        cy={isHovered ? "42" : "34"}
        r="1.5"
        fill="#06b6d4"
        style={{
          opacity: isHovered ? 0.9 : 0,
          transition: 'all 650ms 200ms ease-out',
        }}
      />
      <circle
        cx="38"
        cy={isHovered ? "45" : "36"}
        r="1.5"
        fill="#06b6d4"
        style={{
          opacity: isHovered ? 0.9 : 0,
          transition: 'all 750ms 120ms ease-out',
        }}
      />
    </svg>
  );
}
