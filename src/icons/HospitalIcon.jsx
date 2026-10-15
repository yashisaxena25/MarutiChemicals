import React from 'react';

/**
 * Category 03 — Hospitals & Healthcare Icon
 * Hover animation:
 * - A clean medical cross with hospital structural facade
 * - On hover/focus: an ECG heartbeat line traces smoothly through the cross
 * - Restrained medical pulse glow
 */
export function HospitalIcon({ isHovered }) {
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
      {/* Hospital Building Outline */}
      <path
        d="M12 56V18C12 16.5 13.5 15 15 15H49C50.5 15 52 16.5 52 18V56"
        stroke="#1e293b"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      
      {/* Ground Base Line */}
      <path d="M8 56H56" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" />

      {/* Hospital Entrance Portico */}
      <path d="M28 56V46H36V56" stroke="#1e293b" strokeWidth="2" />

      {/* Architectural Window Accents */}
      <line x1="18" y1="22" x2="22" y2="22" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      <line x1="42" y1="22" x2="46" y2="22" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="30" x2="22" y2="30" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      <line x1="42" y1="30" x2="46" y2="30" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />

      {/* Red/Cobalt Medical Cross Background Pill */}
      <rect
        x="24"
        y="22"
        width="16"
        height="16"
        rx="3"
        fill={isHovered ? "#dbeafe" : "#f1f5f9"}
        stroke="#2563eb"
        strokeWidth="1.5"
        style={{
          transformOrigin: '32px 30px',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'all 500ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Cross symbol */}
      <path
        d="M32 25V35M27 30H37"
        stroke={isHovered ? '#1d4ed8' : '#3b82f6'}
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      {/* ECG Heartbeat Line Trace that draws itself across */}
      <path
        d="M10 40 H22 L25 36 L28 44 L31 34 L34 42 L37 40 H54"
        stroke="#2563eb"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="60"
        strokeDashoffset={isHovered ? "0" : "60"}
        style={{
          opacity: isHovered ? 1 : 0.15,
          transition: 'stroke-dashoffset 850ms cubic-bezier(0.4, 0, 0.2, 1), opacity 400ms ease',
        }}
      />
    </svg>
  );
}
