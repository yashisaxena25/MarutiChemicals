import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, ArrowUpDown, ChevronRight, HelpCircle, Send } from 'lucide-react';
import { ProductCard } from './ProductCard';

export function CategoryPage({
  category,
  allProducts,
  onBackToHome,
  onSelectCategory,
  allCategories,
  onViewDetails,
  onEnquire,
  onRequestCustomProduct,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default'); // 'default' | 'name-asc' | 'name-desc'

  // Filter products for this category (All pricing removed from sorting)
  const categoryProducts = useMemo(() => {
    let list = allProducts.filter((p) => p.categoryId === category.id);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'name-asc') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      list = [...list].sort((a, b) => b.name.localeCompare(a.name));
    }

    return list;
  }, [allProducts, category.id, searchQuery, sortBy]);

  return (
    <div
      style={{
        paddingTop: '2rem',
        paddingBottom: '5rem',
        backgroundColor: 'var(--bg-primary)',
        minHeight: '80vh',
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0 1.5rem',
        }}
      >
        {/* Simple Breadcrumb: Home > Category Name */}
        <nav
          aria-label="Breadcrumb"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            fontSize: '0.86rem',
            color: 'var(--text-muted)',
            marginBottom: '1.5rem',
          }}
        >
          <button
            type="button"
            onClick={onBackToHome}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontWeight: 500,
              padding: 0,
            }}
            onMouseEnter={(e) => (e.target.style.color = 'var(--text-main)')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}
          >
            Home
          </button>
          <ChevronRight size={14} color="var(--text-subtle)" />
          <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>
            {category.name}
          </span>
        </nav>

        {/* Category Header Area */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '1.5rem',
            marginBottom: '2rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ maxWidth: '820px' }}>
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                fontWeight: 800,
                color: 'var(--text-main)',
                lineHeight: 1.2,
                marginBottom: '0.5rem',
              }}
            >
              {category.name}
            </h1>
            <p
              style={{
                fontSize: '1rem',
                color: 'var(--text-muted)',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {category.shortDesc}
            </p>
          </div>

          <button
            type="button"
            onClick={onBackToHome}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.55rem 1rem',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-main)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'border-color 150ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-blue)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
          >
            <ArrowLeft size={15} />
            <span>All Categories</span>
          </button>
        </div>

        {/* Quick Category Switcher Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.85rem',
            marginBottom: '1.75rem',
            scrollbarWidth: 'thin',
          }}
        >
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--text-subtle)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap',
              marginRight: '0.3rem',
            }}
          >
            Categories:
          </span>
          {allCategories.map((cat) => {
            const isSelected = cat.id === category.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                style={{
                  whiteSpace: 'nowrap',
                  padding: '0.4rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.82rem',
                  fontWeight: isSelected ? 700 : 500,
                  backgroundColor: isSelected ? 'var(--accent-blue)' : 'var(--bg-surface)',
                  color: isSelected ? '#ffffff' : 'var(--text-main)',
                  border: isSelected ? '1px solid var(--accent-blue)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Search & Sort Toolbar (IndiaMART style) */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            padding: '1rem 1.25rem',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '6px',
            marginBottom: '2rem',
          }}
        >
          {/* Search bar inside category */}
          <div
            style={{
              position: 'relative',
              flex: '1 1 320px',
              maxWidth: '480px',
            }}
          >
            <Search
              size={17}
              color="var(--text-subtle)"
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder={`Search within ${category.name}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem 0.65rem 2.4rem',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-strong)',
                borderRadius: '6px',
                fontSize: '0.88rem',
                color: 'var(--text-main)',
                fontFamily: 'inherit',
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  color: 'var(--text-subtle)',
                }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Product count & Sorting (Alphabetical) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              Showing <strong>{categoryProducts.length}</strong> products
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <ArrowUpDown size={15} color="var(--text-subtle)" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '0.55rem 0.85rem',
                  backgroundColor: 'var(--bg-surface)',
                  color: 'var(--text-main)',
                  border: '1px solid var(--border-strong)',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                }}
              >
                <option value="default">Sort: Default Catalog Order</option>
                <option value="name-asc">Product Name: A to Z</option>
                <option value="name-desc">Product Name: Z to A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid: 4 columns desktop, 2 columns tablet, 1-2 mobile */}
        {categoryProducts.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem',
            }}
          >
            {categoryProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onViewDetails={onViewDetails}
                onEnquire={onEnquire}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 1rem',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              marginBottom: '3rem',
            }}
          >
            <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: 600, marginBottom: '0.5rem' }}>
              No products found matching "{searchQuery}"
            </p>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Looking for a specific item or custom specification in {category.name}? Request it directly below.
            </p>
            <button
              type="button"
              onClick={() => onRequestCustomProduct(category, searchQuery)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.75rem',
                backgroundColor: 'var(--accent-blue)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.9rem',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              <Send size={15} />
              <span>Request "{searchQuery || 'Custom Product'}" Now</span>
            </button>
          </div>
        )}

        {/* -------------------------------------------------------------
            REQUIREMENT 2: Option under every category if user's demanded
            product isn't available -> Request a similar product / custom RFQ
            ------------------------------------------------------------- */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-strong)',
            borderRadius: '10px',
            padding: '2rem 2.25rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            boxShadow: '0 4px 16px rgba(2, 132, 199, 0.08)',
          }}
        >
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <HelpCircle size={18} color="var(--accent-blue)" />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                Can't find the exact product you need in {category.name}?
              </h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: 0 }}>
              We source hundreds of custom dimensions, alternative grades, and specialized formulations across India. Tell us what you require and our procurement desk will prepare a quotation for a matching or similar product.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onRequestCustomProduct(category)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 1.75rem',
              backgroundColor: 'var(--accent-blue)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.92rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 3px 12px rgba(2, 132, 199, 0.3)',
              transition: 'background-color 180ms ease, transform 180ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-blue-hover)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-blue)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <Send size={15} />
            <span>Request a Similar Product</span>
          </button>
        </div>
      </div>
    </div>
  );
}
