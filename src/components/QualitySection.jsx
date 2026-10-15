import React from 'react';
import { motion } from 'framer-motion';
import { COMPANY_CONTENT } from '../data/companyContent';
import { FileCheck, BadgeCheck, ShieldAlert } from 'lucide-react';

export function QualitySection() {
  const { quality } = COMPANY_CONTENT;
  const icons = [FileCheck, BadgeCheck, ShieldAlert];

  return (
    <section
      id="quality"
      style={{
        padding: '7rem 0',
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        transition: 'background-color 300ms ease',
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
        <div style={{ maxWidth: '720px', marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono-tag" style={{ color: 'var(--accent-teal)', fontWeight: 600, display: 'block', marginBottom: '0.85rem' }}>
              QUALITY FRAMEWORK & TRACEABILITY
            </span>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)',
                color: 'var(--text-main)',
                lineHeight: 1.15,
                fontWeight: 600,
                letterSpacing: '-0.02em',
                marginBottom: '1.25rem',
              }}
            >
              Zero compromise on validation and material provenance.
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
              In critical applications, trust is anchored in documented proof. We bridge component manufacturers and end-user facilities through systematic verification protocols.
            </p>
          </motion.div>
        </div>

        {/* 3 Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {quality.pillars.map((pillar, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '3px',
                  padding: '2.5rem',
                  backgroundColor: 'var(--bg-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                  transition: 'all 280ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-teal)';
                  e.currentTarget.style.boxShadow = '0 12px 28px -8px rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.02)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '3px',
                      backgroundColor: 'var(--accent-teal-bg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-teal)',
                      marginBottom: '1.75rem',
                    }}
                  >
                    <Icon size={22} />
                  </div>

                  <span className="font-mono-tag" style={{ color: 'var(--text-subtle)', display: 'block', marginBottom: '0.4rem' }}>
                    {pillar.protocol}
                  </span>

                  <h3
                    className="font-display"
                    style={{
                      fontSize: '1.35rem',
                      color: 'var(--text-main)',
                      marginBottom: '0.5rem',
                      lineHeight: 1.25,
                    }}
                  >
                    {pillar.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.86rem',
                      color: 'var(--accent-teal)',
                      fontWeight: 600,
                      marginBottom: '1.25rem',
                    }}
                  >
                    {pillar.subtitle}
                  </p>

                  <p
                    style={{
                      fontSize: '0.92rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.65,
                    }}
                  >
                    {pillar.description}
                  </p>
                </div>

                <div
                  style={{
                    borderTop: '1px solid var(--border-subtle)',
                    marginTop: '2rem',
                    paddingTop: '1rem',
                  }}
                >
                  <span className="font-mono-tag" style={{ fontSize: '0.7rem', color: 'var(--text-subtle)' }}>
                    STATUS: {pillar.status}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
