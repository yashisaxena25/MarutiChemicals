import React from 'react';
import { ShieldCheck, Truck, Clock } from 'lucide-react';

export function WhyChooseUsSection() {
  const benefits = [
    {
      icon: <ShieldCheck size={28} color="var(--accent-forest)" />,
      title: 'Certified Quality & Standards',
      desc: 'All pharmaceutical and industrial products are sourced from audited manufacturers with batch traceability and documentation.',
    },
    {
      icon: <Truck size={28} color="var(--accent-forest)" />,
      title: 'Reliable Wholesale Supply',
      desc: 'Consistent stock levels and fast dispatch for hospitals, testing laboratories, cleanrooms, and manufacturing facilities.',
    },
    {
      icon: <Clock size={28} color="var(--accent-forest)" />,
      title: 'Transparent Pricing & Fast Quotes',
      desc: 'Competitive B2B volume rates with prompt quotations and dedicated procurement desk support for your orders.',
    },
  ];

  return (
    <section
      id="about"
      style={{
        paddingTop: '4.5rem',
        paddingBottom: '4.5rem',
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
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem' }}>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)',
              fontWeight: 800,
              color: 'var(--text-main)',
              letterSpacing: '-0.02em',
              marginBottom: '0.4rem',
            }}
          >
            Why Choose Us?
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', margin: 0 }}>
            Dedicated supply chain partner for India's healthcare and industrial sector.
          </p>
        </div>

        {/* Exactly 3 simple benefits */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {benefits.map((b, i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '2rem 1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--accent-teal-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {b.icon}
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                {b.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
