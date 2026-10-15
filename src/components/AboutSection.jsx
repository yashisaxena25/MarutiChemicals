import React from 'react';
import { motion } from 'framer-motion';
import { Factory, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { COMPANY_CONTENT } from '../data/companyContent';

export function AboutSection() {
  const { about } = COMPANY_CONTENT;

  return (
    <section
      id="about"
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4.5rem',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Business Overview */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono-tag" style={{ color: 'var(--accent-teal)', fontWeight: 600, display: 'block', marginBottom: '1rem' }}>
              ABOUT OUR DISTRIBUTION OPERATIONS
            </span>

            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)',
                lineHeight: 1.2,
                color: 'var(--text-main)',
                marginBottom: '1.75rem',
                letterSpacing: '-0.02em',
                fontWeight: 600,
              }}
            >
              Supporting critical manufacturing and clinical facilities.
            </h2>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              In regulated pharmaceutical manufacturing and healthcare operations, consistent material standards are essential. We source, stock, and distribute certified consumables, sanitary fluid-transfer components, and cleanroom supplies.
            </p>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Every product batch is coordinated with verifiable material test reports (MTR), certificate of analysis (CoA), and protective clean packaging ready for airlock transfer.
            </p>

            {/* Core Capability Badges */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <Factory size={20} color="var(--accent-teal)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)', display: 'block', marginBottom: '0.2rem' }}>
                    Regulated Facilities
                  </strong>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Supplying pharma, food-grade, & hospital cleanrooms
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <FileText size={20} color="var(--accent-teal)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)', display: 'block', marginBottom: '0.2rem' }}>
                    Documented Lots
                  </strong>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Complete heat numbers & compliance dossiers
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean Architectural Inspection Frame */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              style={{
                border: '1px solid var(--border-subtle)',
                borderRadius: '3px',
                padding: '2.5rem',
                backgroundColor: 'var(--bg-card)',
                boxShadow: '0 16px 32px -10px rgba(0, 0, 0, 0.05)',
                transition: 'background-color 300ms ease, border-color 300ms ease',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '2rem',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '1rem',
                }}
              >
                <span className="font-mono-tag" style={{ color: 'var(--text-subtle)' }}>
                  OPERATIONAL PROTOCOL
                </span>
                <span className="font-mono-tag" style={{ color: 'var(--accent-teal)' }}>
                  SANITARY DISCIPLINE
                </span>
              </div>

              {/* Technical Schematic Illustration */}
              <div
                style={{
                  width: '100%',
                  height: '210px',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '2rem',
                  padding: '1rem',
                }}
              >
                <svg viewBox="0 0 360 160" style={{ width: '90%', height: '90%' }}>
                  {/* Cleanroom Process Header Pipeline */}
                  <rect x="20" y="65" width="320" height="28" rx="3" fill="var(--bg-card)" stroke="var(--border-strong)" strokeWidth="1.5" />
                  
                  {/* Tri-Clamp Couplings */}
                  <rect x="80" y="58" width="12" height="42" rx="2" fill="var(--text-muted)" opacity="0.6" />
                  <rect x="180" y="58" width="12" height="42" rx="2" fill="var(--text-muted)" opacity="0.6" />
                  <rect x="270" y="58" width="12" height="42" rx="2" fill="var(--text-muted)" opacity="0.6" />

                  {/* Branch lines */}
                  <rect x="82" y="20" width="8" height="40" fill="var(--bg-card)" stroke="var(--border-strong)" strokeWidth="1.2" />
                  <circle cx="86" cy="20" r="10" fill="var(--accent-teal)" />
                  <text x="86" y="23" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">V1</text>

                  <rect x="182" y="93" width="8" height="40" fill="var(--bg-card)" stroke="var(--border-strong)" strokeWidth="1.2" />
                  <circle cx="186" cy="133" r="10" fill="var(--accent-teal)" />
                  <text x="186" y="136" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">V2</text>
                </svg>
              </div>

              {/* Technical Specifications checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle2 size={16} color="var(--accent-teal)" />
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>
                    Continuous sanitary inventory inspection
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle2 size={16} color="var(--accent-teal)" />
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>
                    Material composition verified through spectroscopy
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle2 size={16} color="var(--accent-teal)" />
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>
                    Compliant packaging for cleanroom airlock entry
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
