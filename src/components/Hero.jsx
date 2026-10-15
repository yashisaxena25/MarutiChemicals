import React, { lazy, Suspense } from 'react';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { ProductSearchBar } from './ProductSearchBar';

const MoleculeBackground = lazy(() => import('./MoleculeBackground'));

export function Hero({ onExploreCategories, onOpenContact, allProducts = [], onSelectProduct }) {
  return (
    <section
      id="hero"
      className="tech-grid-bg"
      style={{
        position: 'relative',
        paddingTop: '6.5rem',
        paddingBottom: '4.5rem',
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-subtle)',
        transition: 'background-color 300ms ease',
        overflow: 'hidden',
      }}
    >
      {/* 3D Rotating Ball-and-Stick Molecule Canvas restored behind heading */}
      <Suspense fallback={null}>
        <MoleculeBackground />
      </Suspense>

      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0 1.5rem',
          width: '100%',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div style={{ maxWidth: '980px' }}>
          {/* Eyebrow Label matching user reference screenshot */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              marginBottom: '1.25rem',
            }}
          >
            <span
              style={{
                width: '32px',
                height: '2px',
                backgroundColor: '#b45309', // Warm amber accent rule
                display: 'inline-block',
              }}
            />
            <span
              className="font-mono-tag"
              style={{
                color: 'var(--text-subtle)',
                fontWeight: 700,
                fontSize: '0.78rem',
                letterSpacing: '0.12em',
              }}
            >
              HEALTHCARE · PHARMACEUTICAL · FOOD INDUSTRIES
            </span>
          </div>

          {/* Main Heading matching user reference screenshot */}
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.4rem)',
              lineHeight: 1.14,
              fontWeight: 800,
              color: 'var(--text-main)',
              letterSpacing: '-0.025em',
              marginBottom: '1.5rem',
            }}
          >
            Delivering Trusted Solutions for{' '}
            <span
              style={{
                color: 'var(--accent-blue)', // Royal/Sky Blue brand highlight
                fontStyle: 'italic',
                fontWeight: 700,
              }}
            >
              Healthcare, Pharma &amp; Food
            </span>{' '}
            Industries
          </h1>

          {/* Description matching user reference screenshot */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              lineHeight: 1.65,
              color: 'var(--text-muted)',
              maxWidth: '820px',
              marginBottom: '2.25rem',
            }}
          >
            Maruti Chemicals is a leading supplier of specialized industrial and healthcare products — helping pharmaceutical manufacturers, food processors, hospitals, and laboratories maintain safety, sterility, compliance, and operational efficiency.
          </p>

          {/* Direct Product Search Bar */}
          <div style={{ marginBottom: '2rem' }}>
            <ProductSearchBar
              products={allProducts}
              onSelectProduct={onSelectProduct}
            />
          </div>

          {/* Action Buttons: Primary & Secondary */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
              marginBottom: '2.5rem',
            }}
          >
            <button
              type="button"
              onClick={onExploreCategories}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.9rem 2.1rem',
                backgroundColor: 'var(--accent-blue)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.96rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(2, 132, 199, 0.35)',
                transition: 'transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.backgroundColor = 'var(--accent-blue-hover)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(2, 132, 199, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.backgroundColor = 'var(--accent-blue)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(2, 132, 199, 0.35)';
              }}
            >
              <span>Explore Categories</span>
              <ArrowRight size={17} />
            </button>

            <button
              type="button"
              onClick={onOpenContact}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                padding: '0.9rem 1.85rem',
                backgroundColor: 'transparent',
                color: 'var(--text-main)',
                border: '1px solid var(--border-strong)',
                borderRadius: '4px',
                fontSize: '0.96rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background-color 180ms ease, border-color 180ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
                e.currentTarget.style.borderColor = 'var(--text-main)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'var(--border-strong)';
              }}
            >
              <PhoneCall size={16} />
              <span>Contact Us</span>
            </button>
          </div>

          {/* Trust bullets matching reference screenshot */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.75rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-subtle)',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#b45309', fontSize: '1.2rem', lineHeight: 1 }}>•</span>
              <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-main)' }}>
                Reliable Distribution
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#b45309', fontSize: '1.2rem', lineHeight: 1 }}>•</span>
              <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-main)' }}>
                Quality Products
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#b45309', fontSize: '1.2rem', lineHeight: 1 }}>•</span>
              <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-main)' }}>
                Trusted Partnerships
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
