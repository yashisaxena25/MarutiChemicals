import React from 'react';

/**
 * Category 02 — Food Industry Wheat Stalk / Leaf Icon
 * Hover animation:
 * - The stem articulates and bends gently
 * - Individual leaf husks sway subtly with organic staggered timing
 * - Smooth, graceful spring return
 */
export function WheatIcon({ isHovered }) {
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
      <g
        style={{
          transformOrigin: '32px 56px',
          transform: isHovered ? 'rotate(5deg)' : 'rotate(0deg)',
          transition: 'transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Central Stem */}
        <path
          d="M32 56 Q31 34 32 14"
          stroke="#1e293b"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Top Grain / Ear */}
        <path
          d="M32 14 C30 10 34 8 32 6 C30 8 34 10 32 14"
          fill="#16a34a"
          stroke="#1e293b"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* Left Grain 1 */}
        <path
          d="M32 20 C27 18 24 23 28 26 C30 25 31 22 32 20 Z"
          fill={isHovered ? '#22c55e' : '#86efac'}
          stroke="#1e293b"
          strokeWidth="1.8"
          style={{
            transformOrigin: '32px 20px',
            transform: isHovered ? 'rotate(-6deg) scale(1.05)' : 'rotate(0deg) scale(1)',
            transition: 'all 600ms 50ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Right Grain 1 */}
        <path
          d="M32 24 C37 22 40 27 36 30 C34 29 33 26 32 24 Z"
          fill={isHovered ? '#16a34a' : '#4ade80'}
          stroke="#1e293b"
          strokeWidth="1.8"
          style={{
            transformOrigin: '32px 24px',
            transform: isHovered ? 'rotate(8deg) scale(1.05)' : 'rotate(0deg) scale(1)',
            transition: 'all 650ms 100ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Left Grain 2 */}
        <path
          d="M32 30 C25 28 22 35 27 38 C30 36 31 32 32 30 Z"
          fill={isHovered ? '#22c55e' : '#86efac'}
          stroke="#1e293b"
          strokeWidth="1.8"
          style={{
            transformOrigin: '32px 30px',
            transform: isHovered ? 'rotate(-8deg)' : 'rotate(0deg)',
            transition: 'all 650ms 150ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Right Grain 2 */}
        <path
          d="M32 36 C39 34 42 41 37 44 C34 42 33 38 32 36 Z"
          fill={isHovered ? '#16a34a' : '#4ade80'}
          stroke="#1e293b"
          strokeWidth="1.8"
          style={{
            transformOrigin: '32px 36px',
            transform: isHovered ? 'rotate(9deg)' : 'rotate(0deg)',
            transition: 'all 700ms 200ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Gentle lower leaf */}
        <path
          d="M32 44 C24 43 18 50 24 53 C28 50 31 46 32 44 Z"
          fill="#bbf7d0"
          stroke="#1e293b"
          strokeWidth="1.8"
          style={{
            transformOrigin: '32px 44px',
            transform: isHovered ? 'rotate(-4deg)' : 'rotate(0deg)',
            transition: 'all 600ms 250ms ease-out',
          }}
        />
      </g>
    </svg>
  );
}
