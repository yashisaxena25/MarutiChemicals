import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AnimatedIndustryIcon } from './AnimatedIndustryIcon';

export function IndustryCard({ industry, isFeatured = false, onSelect }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      role="article"
      tabIndex={0}
      className="industry-feature-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onClick={() => onSelect && onSelect(industry)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect && onSelect(industry);
        }
      }}
      style={{
        border: '1px solid var(--border-subtle)',
        borderRadius: '4px',
        padding: '2.5rem 2.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: isFeatured ? '410px' : '370px',
        backgroundColor: isHovered ? 'var(--bg-card-hover)' : 'var(--bg-card)',
        transform: isHovered ? 'translateY(-5px)' : 'none',
        boxShadow: isHovered
          ? '0 20px 40px -12px rgba(15, 118, 110, 0.14), 0 4px 12px -2px rgba(0, 0, 0, 0.05)'
          : '0 2px 6px rgba(0,0,0,0.02)',
        borderColor: isHovered ? industry.accent : 'var(--border-subtle)',
        transition: 'all 320ms cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background glow/accent indicator on hover */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          backgroundColor: industry.accent,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 300ms ease',
        }}
      />

      {/* Top Header Row: Category Number and Animated Custom Icon */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
          <div>
            <span
              className="font-mono-tag"
              style={{
                color: isHovered ? industry.accent : 'var(--text-subtle)',
                fontWeight: 600,
                transition: 'color 250ms ease',
                display: 'block',
              }}
            >
              CATEGORY [{industry.number}]
            </span>
            <div
              style={{
                width: isHovered ? '32px' : '14px',
                height: '2px',
                backgroundColor: industry.accent,
                marginTop: '6px',
                transition: 'width 300ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </div>

          <div
            className="industry-icon-badge"
            style={{
              width: '64px',
              height: '64px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '12px',
              backgroundColor: isHovered ? `${industry.accent}18` : 'var(--bg-surface)',
              border: `1.5px solid ${isHovered ? industry.accent : 'var(--border-subtle)'}`,
              boxShadow: isHovered
                ? `0 10px 25px -4px ${industry.accent}35, 0 0 0 3px ${industry.accent}15`
                : '0 2px 6px rgba(0, 0, 0, 0.04)',
              transform: isHovered ? 'scale(1.16) translateY(-2px)' : 'scale(1)',
              transition: 'all 350ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <AnimatedIndustryIcon type={industry.iconType} isHovered={isHovered} />
          </div>
        </div>

        {/* Title & Description */}
        <h3
          className="font-display"
          style={{
            fontSize: isFeatured ? '1.65rem' : '1.38rem',
            color: 'var(--text-main)',
            lineHeight: 1.25,
            marginBottom: '0.85rem',
            letterSpacing: '-0.01em',
            transition: 'color 200ms ease',
          }}
        >
          {industry.title}
        </h3>
        
        <p
          style={{
            fontSize: '0.92rem',
            color: 'var(--text-muted)',
            lineHeight: 1.65,
            marginBottom: '1.75rem',
          }}
        >
          {industry.description}
        </p>

        {/* Key Product Scope Points */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '1.25rem',
            marginBottom: '1.5rem',
          }}
        >
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {industry.details.map((item, idx) => (
              <li
                key={idx}
                style={{
                  fontSize: '0.84rem',
                  color: isHovered ? 'var(--text-main)' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.6rem',
                  transform: isHovered ? 'translateX(3px)' : 'none',
                  transition: `color 200ms ease, transform 250ms ${idx * 40}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                }}
              >
                <span style={{ color: industry.accent, fontWeight: 'bold' }}>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Action Link & Directional Arrow */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '1.25rem',
          marginTop: 'auto',
        }}
      >
        <span
          className="font-mono-tag"
          style={{
            color: isHovered ? industry.accent : 'var(--text-main)',
            fontWeight: 600,
            transition: 'color 250ms ease',
          }}
        >
          View Scope
        </span>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: isHovered ? industry.accent : 'var(--accent-teal-bg)',
            color: isHovered ? '#ffffff' : 'var(--text-main)',
            transform: isHovered ? 'translate(4px, -4px) scale(1.08)' : 'none',
            boxShadow: isHovered ? '0 4px 12px rgba(15, 118, 110, 0.3)' : 'none',
            transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <ArrowUpRight size={17} />
        </div>
      </div>
    </div>
  );
}
