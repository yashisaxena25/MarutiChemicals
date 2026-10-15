import React from 'react';
import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';

export function Footer({ onNavigate, onSelectCategory, categories }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-footer)',
        color: 'var(--text-footer)',
        padding: '4rem 0 2.5rem',
        borderTop: '1px solid var(--border-footer)',
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Brand Info */}
          <div style={{ maxWidth: '320px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  backgroundColor: 'var(--accent-blue)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  borderRadius: '6px',
                }}
              >
                M
              </div>
              <span
                className="font-display"
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  color: 'var(--text-footer)',
                }}
              >
                MARUTI
              </span>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-footer-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Your trusted partner for pharmaceutical, medical, cleanroom, and industrial supplies in India. Simple, verified wholesale supply.
            </p>

            <span
              className="font-mono-tag"
              style={{
                color: 'var(--accent-lime)',
                fontSize: '0.7rem',
                fontWeight: 700,
              }}
            >
              PHARMA & INDUSTRIAL SUPPLIES
            </span>
          </div>

          {/* Product Categories */}
          <div>
            <h4
              style={{
                fontSize: '0.9rem',
                fontWeight: 700,
                color: 'var(--text-footer)',
                marginBottom: '1.2rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Shop by Category
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => onSelectCategory(cat.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      color: 'var(--text-footer-muted)',
                      fontSize: '0.85rem',
                      textAlign: 'left',
                      transition: 'color 180ms ease',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
                    onMouseLeave={(e) => (e.target.style.color = 'var(--text-footer-muted)')}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontSize: '0.9rem',
                fontWeight: 700,
                color: 'var(--text-footer)',
                marginBottom: '1.2rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Essential Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { label: 'Home', id: 'home' },
                { label: 'Categories', id: 'categories' },
                { label: 'Popular Products', id: 'products' },
                { label: 'Why Choose Us', id: 'about' },
                { label: 'Get a Quote', id: 'contact' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      color: 'var(--text-footer-muted)',
                      fontSize: '0.85rem',
                      textAlign: 'left',
                      transition: 'color 180ms ease',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
                    onMouseLeave={(e) => (e.target.style.color = 'var(--text-footer-muted)')}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4
              style={{
                fontSize: '0.9rem',
                fontWeight: 700,
                color: 'var(--text-footer)',
                marginBottom: '1.2rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Contact Information
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem', color: 'var(--text-footer-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <Phone size={16} color="var(--accent-lime)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <a href="tel:+917926584200" style={{ color: 'var(--text-footer)', textDecoration: 'none', fontWeight: 600 }}>
                  +91 (079) 2658-4200
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <Mail size={16} color="var(--accent-lime)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <a href="mailto:contact@marutichemicals.com" style={{ color: 'var(--text-footer)', textDecoration: 'none' }}>
                  contact@marutichemicals.com
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <MapPin size={16} color="var(--accent-lime)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>Phase II, GIDC Industrial Estate, Vatva, Ahmedabad, Gujarat 382445</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rule & Copyright */}
        <div
          style={{
            borderTop: '1px solid var(--border-footer)',
            paddingTop: '1.75rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <span style={{ fontSize: '0.8rem', color: 'var(--text-footer-muted)' }}>
            © {new Date().getFullYear()} Maruti Pharma & Industrial Supplies. All rights reserved.
          </span>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to Top"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'none',
              border: '1px solid var(--border-footer)',
              color: 'var(--text-footer-muted)',
              padding: '0.4rem 0.85rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.78rem',
              transition: 'all 180ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-lime)';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-footer)';
              e.currentTarget.style.color = 'var(--text-footer-muted)';
            }}
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
