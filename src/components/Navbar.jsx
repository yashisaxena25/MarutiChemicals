import React, { useState } from 'react';
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function Navbar({ onNavigate, onOpenQuote }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(sectionId);
    }
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'var(--bg-header)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)',
        transition: 'background-color 300ms ease',
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0.85rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand identity & Logo */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textAlign: 'left',
          }}
          aria-label="Maruti Pharma & Industrial Supplies Home"
        >
          {/* Brand Icon Box */}
          <div
            style={{
              width: '38px',
              height: '38px',
              backgroundColor: 'var(--accent-blue)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px',
              fontWeight: 800,
              fontSize: '1.2rem',
              boxShadow: '0 3px 12px rgba(2, 132, 199, 0.35)',
              flexShrink: 0,
            }}
          >
            M
          </div>
          <div>
            <span
              className="font-display"
              style={{
                fontSize: '1.3rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                lineHeight: 1,
                display: 'block',
                color: 'var(--text-main)',
              }}
            >
              MARUTI
            </span>
            <span
              className="font-mono-tag"
              style={{
                fontSize: '0.64rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
                display: 'block',
                marginTop: '3px',
              }}
            >
              PHARMA & INDUSTRIAL SUPPLIES
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav
          className="desktop-nav-menu"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '2rem',
          }}
        >
          {[
            { label: 'Home', id: 'home' },
            { label: 'Categories', id: 'categories' },
            { label: 'Products', id: 'products' },
            { label: 'About Us', id: 'about' },
            { label: 'Contact Us', id: 'contact' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                fontSize: '0.92rem',
                fontWeight: 600,
                padding: '0.35rem 0',
                transition: 'color 180ms ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-main)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Actions: Dark Mode + Prominent 'Get a Quote' button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Light/Dark Mode Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '4px',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-main)',
              cursor: 'pointer',
              transition: 'border-color 180ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-lime)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
            }}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Prominent Get a Quote Button */}
          <button
            type="button"
            onClick={onOpenQuote}
            className="quote-cta-desktop"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.35rem',
              backgroundColor: 'var(--accent-blue)',
              color: '#ffffff',
              borderRadius: '6px',
              fontSize: '0.88rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 3px 12px rgba(2, 132, 199, 0.3)',
              transition: 'transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.backgroundColor = 'var(--accent-blue-hover)';
              e.currentTarget.style.boxShadow = '0 5px 16px rgba(2, 132, 199, 0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.backgroundColor = 'var(--accent-blue)';
              e.currentTarget.style.boxShadow = '0 3px 12px rgba(2, 132, 199, 0.3)';
            }}
          >
            <span>Get a Quote</span>
            <ArrowRight size={15} />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            aria-label="Toggle Navigation Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-nav-toggle"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: '1px solid var(--border-subtle)',
              borderRadius: '4px',
              cursor: 'pointer',
              padding: '7px',
              color: 'var(--text-main)',
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '1.25rem 1.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {[
            { label: 'Home', id: 'home' },
            { label: 'Categories', id: 'categories' },
            { label: 'Products', id: 'products' },
            { label: 'About Us', id: 'about' },
            { label: 'Contact Us', id: 'contact' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: '1px solid var(--border-subtle)',
                textAlign: 'left',
                color: 'var(--text-main)',
                fontSize: '1rem',
                fontWeight: 600,
                padding: '0.6rem 0',
                cursor: 'pointer',
              }}
            >
              {item.label}
            </button>
          ))}

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenQuote();
            }}
            style={{
              marginTop: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.85rem',
              backgroundColor: 'var(--accent-blue)',
              color: '#ffffff',
              borderRadius: '6px',
              fontSize: '0.92rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <span>Get a Quote</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 860px) {
          .desktop-nav-menu { display: flex !important; }
          .mobile-nav-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}
