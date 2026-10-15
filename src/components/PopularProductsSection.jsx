import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCard } from './ProductCard';

export function PopularProductsSection({ products, onViewDetails, onEnquire, onExploreCategories }) {
  return (
    <section
      id="products"
      style={{
        paddingTop: '4.5rem',
        paddingBottom: '4.5rem',
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-subtle)',
        transition: 'background-color 300ms ease',
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0 1.5rem',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '2.25rem',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.74rem',
                fontWeight: 700,
                color: 'var(--accent-forest)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.4rem',
              }}
            >
              <Sparkles size={14} />
              <span>Recommended For You</span>
            </div>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)',
                fontWeight: 800,
                color: 'var(--text-main)',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              Popular Products
            </h2>
          </div>

          <button
            type="button"
            onClick={onExploreCategories}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'none',
              border: 'none',
              color: 'var(--text-main)',
              fontSize: '0.92rem',
              fontWeight: 700,
              cursor: 'pointer',
              padding: '0.4rem 0',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-forest)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-main)')}
          >
            <span>View All Categories</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* 8 Featured / Popular Products */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {products.slice(0, 8).map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onViewDetails={onViewDetails}
              onEnquire={onEnquire}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
