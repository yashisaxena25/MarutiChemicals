import React from 'react';
import { motion } from 'framer-motion';
import { COMPANY_CONTENT } from '../data/companyContent';
import { ScrollReveal } from './ScrollReveal';
import { GitCommit, CheckCircle2 } from 'lucide-react';

export function ProcessSection() {
  const { process } = COMPANY_CONTENT;

  return (
    <section
      id="process"
      style={{
        padding: '7rem 0',
        backgroundColor: 'var(--bg-primary)',
        position: 'relative',
        borderTop: '1px solid var(--border-subtle)',
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
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '4rem',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '2rem',
            gap: '2rem',
          }}
        >
          <ScrollReveal direction="left">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <GitCommit size={16} color="var(--accent-teal)" />
              <span className="font-mono-tag" style={{ color: 'var(--accent-teal)', fontWeight: 600 }}>
                {process.eyebrow}
              </span>
            </div>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                color: 'var(--text-main)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
              }}
            >
              {process.heading}
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="right" style={{ maxWidth: '460px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {process.description}
            </p>
          </ScrollReveal>
        </div>

        {/* Process Timeline Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {process.stages.map((stage, index) => (
            <motion.div
              key={stage.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.65,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '3px',
                padding: '2.5rem 2rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 280ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-teal)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 28px -8px rgba(0, 0, 0, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.75rem',
                  }}
                >
                  <span
                    className="font-mono-tag"
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: 'var(--accent-teal)',
                    }}
                  >
                    {stage.number}
                  </span>
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-teal)',
                    }}
                  />
                </div>

                <h3
                  className="font-display"
                  style={{
                    fontSize: '1.3rem',
                    color: 'var(--text-main)',
                    fontWeight: 600,
                    marginBottom: '0.85rem',
                    lineHeight: 1.3,
                  }}
                >
                  {stage.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.65,
                    marginBottom: '2rem',
                  }}
                >
                  {stage.description}
                </p>
              </div>

              <div
                style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <CheckCircle2 size={14} color="var(--accent-teal)" />
                <span className="font-mono-tag" style={{ fontSize: '0.68rem', color: 'var(--text-subtle)' }}>
                  VERIFIED STAGE COMPLIANCE
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
