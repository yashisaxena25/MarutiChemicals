import React, { useState, useRef, useEffect } from 'react';
import { Search, ArrowRight, X } from 'lucide-react';

export function ProductSearchBar({ products, onSelectProduct, placeholder = "Search for any pharmaceutical, medical, or industrial product..." }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const filtered = query.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.categoryName.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 8)
    : [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (product) => {
    onSelectProduct(product);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', maxWidth: '640px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          border: isOpen ? '2px solid var(--accent-blue)' : '1px solid var(--border-strong)',
          boxShadow: isOpen
            ? '0 8px 24px -4px rgba(2, 132, 199, 0.25)'
            : '0 4px 14px rgba(0, 0, 0, 0.05)',
          padding: '0.4rem 0.6rem 0.4rem 1rem',
          transition: 'all 200ms ease',
        }}
      >
        <Search size={20} color="var(--accent-blue)" style={{ marginRight: '0.75rem', flexShrink: 0 }} />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          placeholder={placeholder}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '0.96rem',
            fontFamily: 'inherit',
            color: '#0f172a',
            backgroundColor: 'transparent',
          }}
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#94a3b8',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={16} />
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            if (filtered.length > 0) {
              handleSelect(filtered[0]);
            }
          }}
          style={{
            backgroundColor: 'var(--accent-blue)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            padding: '0.55rem 1.1rem',
            fontSize: '0.86rem',
            fontWeight: 700,
            cursor: 'pointer',
            marginLeft: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            flexShrink: 0,
            transition: 'background-color 150ms ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-blue-hover)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-blue)')}
        >
          <span>Find</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Instant Dropdown Autocomplete Results */}
      {isOpen && query.trim() && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            backgroundColor: 'var(--bg-card)',
            borderRadius: '8px',
            border: '1px solid var(--border-strong)',
            boxShadow: '0 16px 36px -6px rgba(15, 23, 42, 0.2)',
            zIndex: 100,
            overflow: 'hidden',
            maxHeight: '380px',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              padding: '0.65rem 1rem',
              backgroundColor: 'var(--bg-surface)',
              borderBottom: '1px solid var(--border-subtle)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--text-subtle)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Matching Products ({filtered.length})
          </div>

          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                style={{
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  cursor: 'pointer',
                  borderBottom: '1px solid var(--border-subtle)',
                  transition: 'background-color 150ms ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '42px',
                    height: '42px',
                    objectFit: 'contain',
                    backgroundColor: '#ffffff',
                    borderRadius: '4px',
                    border: '1px solid var(--border-subtle)',
                    padding: '2px',
                    flexShrink: 0,
                  }}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&auto=format&fit=crop&q=80';
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 600 }}>
                    {item.categoryName} • Min. Order: {item.minOrder || 'Custom'}
                  </div>
                </div>
                <ArrowRight size={15} color="var(--text-subtle)" />
              </div>
            ))
          ) : (
            <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              No product found matching "{query}". You can request a custom quotation below.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
