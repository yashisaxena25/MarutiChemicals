import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, ArrowRight, X, Layers, Pause, Play } from 'lucide-react';
import { PRODUCTS_DATA, ORBIT_PRODUCTS } from '../data/products';

export function ProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProduct, setActiveProduct] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  // Combine products for a clean, comprehensive catalog list:
  const catalogList = [
    ...PRODUCTS_DATA,
    ...ORBIT_PRODUCTS.slice(0, 15).map((item) => ({
      id: item.id,
      name: item.name,
      category: item.sector || item.category,
      spec: item.category,
      description: `Certified consumable for ${item.sector.toLowerCase()} applications, packaged for immediate facility deployment.`,
    })),
  ];

  const categories = [
    'All',
    'Pharmaceutical Industry',
    'Food Industry',
    'Hospitals & Healthcare',
    'Medical Equipment & Supplies',
    'Clean Room Products',
  ];

  const filtered = selectedCategory === 'All'
    ? catalogList
    : catalogList.filter((p) => p.category === selectedCategory || (selectedCategory === 'Clean Room Products' && p.category.includes('Clean Room')));

  // Duplicate items to ensure seamless infinite loop
  const marqueeItems = [...filtered, ...filtered];

  return (
    <section
      id="products"
      style={{
        padding: '7rem 0',
        backgroundColor: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        transition: 'background-color 300ms ease',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0 2rem',
        }}
      >
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '2.5rem',
            gap: '2rem',
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <Layers size={16} color="var(--accent-teal)" />
              <span className="font-mono-tag" style={{ color: 'var(--accent-teal)', fontWeight: 600 }}>
                CONTINUOUS PRODUCT STRIP
              </span>
            </div>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)',
                color: 'var(--text-main)',
                lineHeight: 1.15,
                fontWeight: 600,
                letterSpacing: '-0.02em',
              }}
            >
              Essential supplies catalog.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: '440px' }}
          >
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              A continuous, moving strip of certified supplies. Hover over any card to pause movement and inspect technical specifications.
            </p>
          </motion.div>
        </div>

        {/* Clean Filter Bar & Play/Pause Control */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '3rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              alignItems: 'center',
            }}
          >
            <span className="font-mono-tag" style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', marginRight: '0.5rem' }}>
              FILTER SECTOR:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.35rem 0.85rem',
                  fontSize: '0.78rem',
                  borderRadius: '3px',
                  border: selectedCategory === cat ? '1px solid var(--text-main)' : '1px solid var(--border-subtle)',
                  backgroundColor: selectedCategory === cat ? 'var(--text-main)' : 'var(--bg-card)',
                  color: selectedCategory === cat ? 'var(--bg-primary)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontWeight: selectedCategory === cat ? 600 : 500,
                  transition: 'all 200ms ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.75rem',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '3px',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all 200ms ease',
            }}
            aria-label={isPaused ? 'Resume moving strip' : 'Pause moving strip'}
          >
            {isPaused ? <Play size={12} color="var(--accent-teal)" /> : <Pause size={12} color="var(--accent-teal)" />}
            <span className="font-mono-tag">{isPaused ? 'RESUME STRIP' : 'PAUSE STRIP'}</span>
          </button>
        </div>
      </div>

      {/* Edge Vignette Gradients for Smooth Seamless Strip Effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '90px',
          background: 'linear-gradient(to right, var(--bg-primary), transparent)',
          zIndex: 5,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '90px',
          background: 'linear-gradient(to left, var(--bg-primary), transparent)',
          zIndex: 5,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* SINGLE CONTINUOUS STRIP MOVING FROM LEFT TO RIGHT */}
      <div
        className="product-strip-wrapper"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          padding: '1rem 0 2rem 0',
        }}
      >
        <div
          className={`product-strip-track ${isPaused ? 'paused' : ''}`}
          style={{
            display: 'flex',
            gap: '2rem',
            width: 'max-content',
          }}
        >
          {marqueeItems.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="product-catalog-card"
              style={{
                width: '360px',
                minWidth: '360px',
                flexShrink: 0,
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '4px',
                padding: '2.25rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 320ms cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
              }}
              onClick={() => setActiveProduct(product)}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <span className="font-mono-tag product-cat-tag" style={{ color: 'var(--accent-teal)', fontWeight: 600, transition: 'color 200ms ease' }}>
                    {product.category}
                  </span>
                  <div
                    className="product-pkg-icon"
                    style={{
                      padding: '6px',
                      borderRadius: '3px',
                      backgroundColor: 'transparent',
                      color: 'var(--text-subtle)',
                      transition: 'all 250ms ease',
                    }}
                  >
                    <Package size={18} />
                  </div>
                </div>

                <h3
                  className="font-display product-title"
                  style={{
                    fontSize: '1.32rem',
                    color: 'var(--text-main)',
                    lineHeight: 1.25,
                    marginBottom: '0.65rem',
                    transition: 'color 200ms ease',
                    minHeight: '3.3rem',
                  }}
                >
                  {product.name}
                </h3>

                {/* Technical specification pill */}
                <div
                  className="product-spec-badge"
                  style={{
                    display: 'inline-block',
                    padding: '0.22rem 0.6rem',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '2px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    color: 'var(--text-main)',
                    marginBottom: '1rem',
                    transition: 'border-color 250ms ease, background-color 250ms ease',
                  }}
                >
                  {product.spec}
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {product.description}
                </p>
              </div>

              <div
                style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div
                  className="product-inquire-action"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--text-main)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    transition: 'color 200ms ease',
                  }}
                >
                  <span>Inquire Specifications</span>
                  <div className="product-arrow-icon" style={{ display: 'inline-flex', transition: 'transform 250ms cubic-bezier(0.16, 1, 0.3, 1)' }}>
                    <ArrowRight size={14} />
                  </div>
                </div>

                <span className="font-mono-tag" style={{ fontSize: '0.68rem', color: 'var(--text-subtle)' }}>
                  CERTIFIED
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accessible Detail Modal when clicking any card */}
      {activeProduct && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(6px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={() => setActiveProduct(null)}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-surface-elevated)',
              color: 'var(--text-main)',
              maxWidth: '560px',
              width: '100%',
              padding: '2.5rem',
              borderRadius: '4px',
              border: '1px solid var(--border-subtle)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span className="font-mono-tag" style={{ color: 'var(--accent-teal)', fontWeight: 600 }}>
                PRODUCT SPECIFICATION SHEET
              </span>
              <button
                type="button"
                onClick={() => setActiveProduct(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  padding: '4px',
                }}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            <h3 className="font-display" style={{ fontSize: '1.6rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
              {activeProduct.name}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              Category: <strong>{activeProduct.category}</strong> • Parameter: <strong>{activeProduct.spec}</strong>
            </p>

            <div
              style={{
                padding: '1.25rem',
                backgroundColor: 'var(--accent-teal-bg)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '3px',
                marginBottom: '2rem',
              }}
            >
              <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', margin: 0, lineHeight: 1.6 }}>
                To request full material test reports (MTR), dimensional drawings, or bulk order pricing for this component, submit an inquiry through our contact desk below.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <a
                href="#contact"
                onClick={() => setActiveProduct(null)}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'var(--text-main)',
                  color: 'var(--bg-primary)',
                  textDecoration: 'none',
                  borderRadius: '3px',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                }}
              >
                Go to Contact Desk
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* Continuous Moving Strip Animation: Moves from Left to Right */
        @keyframes stripMoveLeftToRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        .product-strip-track {
          animation: stripMoveLeftToRight 45s linear infinite;
          will-change: transform;
        }

        .product-strip-track.paused {
          animation-play-state: paused;
        }

        /* Layered Hover State for Product Cards: Noticeable Size Increase */
        .product-catalog-card {
          transform-origin: center center;
          will-change: transform;
        }

        .product-catalog-card:hover {
          transform: translateY(-8px) scale(1.06) !important;
          border-color: var(--accent-teal) !important;
          box-shadow: 0 24px 48px -12px rgba(15, 118, 110, 0.22), 0 8px 16px -2px rgba(0, 0, 0, 0.08) !important;
          z-index: 10;
        }
        .product-catalog-card:hover .product-title {
          color: var(--accent-teal) !important;
        }
        .product-catalog-card:hover .product-pkg-icon {
          color: var(--accent-teal) !important;
          background-color: var(--accent-teal-bg) !important;
          transform: scale(1.1);
        }
        .product-catalog-card:hover .product-spec-badge {
          border-color: var(--accent-teal) !important;
        }
        .product-catalog-card:hover .product-inquire-action {
          color: var(--accent-teal) !important;
        }
        .product-catalog-card:hover .product-arrow-icon {
          transform: translateX(5px);
        }

        @media (prefers-reduced-motion: reduce) {
          .product-strip-track {
            animation: none !important;
            overflow-x: auto;
          }
        }
      `}</style>
    </section>
  );
}
