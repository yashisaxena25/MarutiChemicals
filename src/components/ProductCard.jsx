import React, { useState } from 'react';
import { Send, Eye, PackageCheck } from 'lucide-react';

export function ProductCard({ product, onViewDetails, onEnquire }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="maruti-product-card"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 280ms cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
      }}
    >
      {/* Product Image Area: Grayscale by default, Turns full color on hover */}
      <div
        style={{
          width: '100%',
          height: '190px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <img
          src={imageError ? 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80' : product.image}
          alt={product.name}
          loading="lazy"
          onError={() => setImageError(true)}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            transition: 'filter 350ms ease, transform 350ms ease',
          }}
          className="product-card-img"
        />

        {/* Category tag watermark */}
        <span
          style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            fontSize: '0.68rem',
            fontWeight: 600,
            padding: '2px 8px',
            borderRadius: '4px',
            backgroundColor: 'rgba(241, 245, 249, 0.9)',
            color: 'var(--accent-blue)',
            border: '1px solid var(--border-subtle)',
            backdropFilter: 'blur(4px)',
          }}
        >
          {product.categoryName}
        </span>
      </div>

      {/* Content Area */}
      <div
        style={{
          padding: '1.1rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h3
            title={product.name}
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--text-main)',
              lineHeight: 1.35,
              marginBottom: '0.45rem',
              minHeight: '2.7em',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.name}
          </h3>

          <p
            style={{
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              lineHeight: 1.5,
              marginBottom: '0.85rem',
              minHeight: '2.9em',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.description}
          </p>

          {/* MOQ / Availability Badge (No price shown) */}
          <div
            style={{
              padding: '0.45rem 0.75rem',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: '4px',
              border: '1px solid var(--border-subtle)',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <PackageCheck size={14} color="var(--accent-blue)" />
              <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                Min. Order:
              </span>
            </div>
            <span style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {product.minOrder || 'Custom Lots Available'}
            </span>
          </div>
        </div>

        {/* Dual Actions: View Details (includes PDF download) + Request Quote */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: '0.55rem' }}>
          <button
            type="button"
            onClick={() => onViewDetails && onViewDetails(product)}
            style={{
              padding: '0.6rem 0.5rem',
              backgroundColor: 'transparent',
              color: 'var(--text-main)',
              border: '1px solid var(--border-strong)',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              transition: 'background-color 180ms ease, border-color 180ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
              e.currentTarget.style.borderColor = 'var(--accent-blue)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'var(--border-strong)';
            }}
          >
            <Eye size={14} />
            <span>Details</span>
          </button>

          <button
            type="button"
            onClick={() => onEnquire && onEnquire(product)}
            style={{
              padding: '0.6rem 0.65rem',
              backgroundColor: 'var(--accent-blue)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              boxShadow: '0 2px 8px rgba(2, 132, 199, 0.25)',
              transition: 'transform 150ms ease, background-color 150ms ease, box-shadow 150ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-blue-hover)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(2, 132, 199, 0.4)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-blue)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(2, 132, 199, 0.25)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <Send size={13} />
            <span>Request Quote</span>
          </button>
        </div>
      </div>

      {/* Grayscale -> Colorful on hover effect & attractive card elevation */}
      <style>{`
        .maruti-product-card .product-card-img {
          filter: grayscale(100%);
          opacity: 0.92;
        }
        .maruti-product-card:hover .product-card-img {
          filter: grayscale(0%);
          opacity: 1;
          transform: scale(1.06);
        }
        .maruti-product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 32px -8px rgba(2, 132, 199, 0.18), 0 4px 12px rgba(0, 0, 0, 0.04);
          border-color: var(--accent-blue) !important;
        }
      `}</style>
    </div>
  );
}
