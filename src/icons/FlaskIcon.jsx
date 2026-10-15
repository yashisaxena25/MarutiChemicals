import React from 'react';

/**
 * Category 01 — Pharmaceutical Industry Flask Icon
 * Hover animation:
 * - Liquid rises smoothly inside the flask boundary using SVG clipPath
 * - Gentle wave curvature on the liquid level
 * - Tiny bubbles rise inside the liquid
 * - Outer flask contour and graduation tick marks remain crisp
 */
export function FlaskIcon({ isHovered }) {
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
      <defs>
        {/* Clip path matching the exact inner contour of the conical flask */}
        <clipPath id="flaskInnerClip">
          <path d="M26 12 H38 V26 L51 50 C52.5 53 50.5 56 47 56 H17 C13.5 56 11.5 53 13 50 L26 26 Z" />
        </clipPath>
      </defs>

      {/* Background Liquid with Wave & Rise Animation */}
      <g clipPath="url(#flaskInnerClip)">
        {/* Liquid Container Group */}
        <g
          style={{
            transform: isHovered ? 'translateY(0px)' : 'translateY(28px)',
            transition: 'transform 750ms cubic-bezier(0.2, 0.8, 0.25, 1)',
          }}
        >
          {/* Liquid Base Fill */}
          <rect
            x="8"
            y="26"
            width="48"
            height="34"
            fill="#0d9488"
            style={{
              opacity: isHovered ? 1 : 0.45,
              transition: 'opacity 350ms ease',
            }}
          />

          {/* Liquid Surface Wave */}
          <path
            d="M8 26 Q 20 22, 32 26 T 56 26 L56 32 L8 32 Z"
            fill="#2dd4bf"
            style={{
              transform: isHovered ? 'translateX(0)' : 'translateX(-4px)',
              transition: 'transform 700ms ease-in-out',
            }}
          />

          {/* Rising Bubbles inside liquid */}
          <circle
            cx="24"
            cy={isHovered ? "36" : "50"}
            r="1.8"
            fill="#ccfbf1"
            style={{
              opacity: isHovered ? 0.85 : 0,
              transition: 'all 700ms 150ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
          <circle
            cx="38"
            cy={isHovered ? "32" : "52"}
            r="2.2"
            fill="#ffffff"
            style={{
              opacity: isHovered ? 0.9 : 0,
              transition: 'all 800ms 100ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
          <circle
            cx="30"
            cy={isHovered ? "42" : "54"}
            r="1.4"
            fill="#ccfbf1"
            style={{
              opacity: isHovered ? 0.7 : 0,
              transition: 'all 600ms 200ms ease-out',
            }}
          />
        </g>
      </g>

      {/* Graduations / Measurement tick lines */}
      <line x1="28" y1="36" x2="35" y2="36" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="26" y1="42" x2="35" y2="42" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="23" y1="48" x2="35" y2="48" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />

      {/* Outer Flask Outline (Kept crisply on top) */}
      {/* Lip at neck */}
      <rect x="25" y="8" width="14" height="4" rx="2" stroke="#1e293b" strokeWidth="2.4" fill="none" />
      
      {/* Body & Neck contour */}
      <path
        d="M27 12 V25 L14 49 C12.5 52 14.5 56 18 56 H46 C49.5 56 51.5 52 50 49 L37 25 V12"
        stroke="#1e293b"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Glass specular sheen highlight */}
      <path
        d="M45 48 L35 29"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
