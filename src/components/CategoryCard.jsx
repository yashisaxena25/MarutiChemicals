import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { AnimatedIndustryIcon } from './AnimatedIndustryIcon';

export function CategoryCard({ category, onSelectCategory }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={() => onSelectCategory(category.id)}
      role="button"
      tabIndex={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectCategory(category.id);
        }
      }}
      className="maruti-category-card"
      style={{
        backgroundColor: isHovered ? 'var(--bg-card-hover)' : 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '8px',
        padding: '2rem 1.75rem',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '270px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: isHovered
          ? '0 16px 32px -8px rgba(13, 148, 136, 0.15), 0 4px 12px -2px rgba(0, 0, 0, 0.04)'
          : '0 2px 8px rgba(0, 0, 0, 0.03)',
        transform: isHovered ? 'translateY(-4px)' : 'none',
        borderColor: isHovered ? (category.accent || 'var(--accent-lime)') : 'var(--border-subtle)',
        transition: 'all 280ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Top Accent Strip */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          backgroundColor: category.accent || 'var(--accent-lime)',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 250ms ease',
        }}
      />

      <div>
        {/* Animated Custom Icon matching reference image style */}
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '10px',
            backgroundColor: isHovered ? `${category.accent || '#0d9488'}18` : 'var(--bg-surface)',
            border: `1.5px solid ${isHovered ? (category.accent || '#0d9488') : 'var(--border-subtle)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
            transform: isHovered ? 'scale(1.1) translateY(-2px)' : 'none',
            transition: 'all 280ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <AnimatedIndustryIcon type={category.iconType} isHovered={isHovered} />
        </div>

        {/* Category Name */}
        <h3
          className="font-display"
          style={{
            fontSize: '1.3rem',
            fontWeight: 700,
            color: 'var(--text-main)',
            lineHeight: 1.3,
            marginBottom: '0.65rem',
            letterSpacing: '-0.01em',
          }}
        >
          {category.name}
        </h3>

        {/* Short Description */}
        <p
          style={{
            fontSize: '0.88rem',
            color: 'var(--text-muted)',
            lineHeight: 1.55,
            marginBottom: '1.5rem',
          }}
        >
          {category.shortDesc}
        </p>
      </div>

      {/* "Related products ->" link matching exact screenshot style */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: isHovered ? '0.65rem' : '0.4rem',
          fontSize: '0.9rem',
          fontWeight: 700,
          color: category.accent || '#0d9488',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '1rem',
          transition: 'all 200ms ease',
        }}
      >
        <span>Related products</span>
        <ArrowRight size={16} />
      </div>
    </div>
  );
}
