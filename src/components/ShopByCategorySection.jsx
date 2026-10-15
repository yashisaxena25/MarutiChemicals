import React from 'react';
import { CategoryCard } from './CategoryCard';

export function ShopByCategorySection({ categories, onSelectCategory }) {
  return (
    <section
      id="categories"
      style={{
        paddingTop: '4rem',
        paddingBottom: '5rem',
        backgroundColor: 'var(--bg-surface)',
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
        {/* Section Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 2.8rem)',
              fontWeight: 800,
              color: 'var(--text-main)',
              letterSpacing: '-0.02em',
              marginBottom: '0.4rem',
            }}
          >
            Shop by Category
          </h2>
          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-muted)',
              margin: 0,
            }}
          >
            Select a sector below to view all related products and request fast quotations.
          </p>
        </div>

        {/* 5 Categories matching user reference screenshot */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* Top Row: 3 Categories (Pharmaceutical Industry, Food Industry, Hospitals & Healthcare) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.75rem',
            }}
          >
            {categories.slice(0, 3).map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                onSelectCategory={onSelectCategory}
              />
            ))}
          </div>

          {/* Bottom Row: 2 Categories (Medical Equipment & Supplies, Clean Room Products) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.75rem',
              maxWidth: '890px',
            }}
          >
            {categories.slice(3, 5).map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                onSelectCategory={onSelectCategory}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
