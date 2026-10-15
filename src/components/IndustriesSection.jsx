import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { INDUSTRIES_DATA } from '../data/content';
import { IndustryCard } from './IndustryCard';
import { Layers, X } from 'lucide-react';

export function IndustriesSection() {
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const pharma = INDUSTRIES_DATA[0];
  const food = INDUSTRIES_DATA[1];
  const remainingThree = INDUSTRIES_DATA.slice(2);

  return (
    <section
      id="industries"
      style={{
        padding: '6.5rem 0',
        backgroundColor: 'var(--bg-primary)',
        position: 'relative',
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
        {/* Editorial Section Header with scroll reveal */}
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
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <Layers size={16} color="var(--accent-teal)" />
              <span className="font-mono-tag" style={{ color: 'var(--accent-teal)', fontWeight: 600 }}>
                SECTOR ARCHITECTURE
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
              Solutions across industries.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: '460px' }}
          >
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Each environment demands strict material compatibility, certified hygiene, and verified documentation. Hover over any sector below to inspect active mechanisms.
            </p>
          </motion.div>
        </div>

        {/* Clean 5-Card Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Top Row: 1 Featured Pharma card + 1 Food card */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <IndustryCard
                industry={pharma}
                isFeatured={true}
                onSelect={(ind) => setSelectedIndustry(ind)}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <IndustryCard
                industry={food}
                isFeatured={false}
                onSelect={(ind) => setSelectedIndustry(ind)}
              />
            </motion.div>
          </div>

          {/* Bottom Row: 3 Balanced Cards (Healthcare, Medical Equipment, Clean Room) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {remainingThree.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <IndustryCard
                  industry={item}
                  isFeatured={false}
                  onSelect={(ind) => setSelectedIndustry(ind)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Accessible Detail Modal when clicking any industry */}
        {selectedIndustry && (
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
            onClick={() => setSelectedIndustry(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                color: 'var(--text-main)',
                maxWidth: '600px',
                width: '100%',
                padding: '2.5rem',
                borderRadius: '3px',
                border: '1px solid var(--border-subtle)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <span className="font-mono-tag" style={{ color: selectedIndustry.accent, fontWeight: 600 }}>
                  CATEGORY [{selectedIndustry.number}] SCOPE
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedIndustry(null)}
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

              <h3 className="font-display" style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                {selectedIndustry.title}
              </h3>
              <p style={{ color: 'var(--accent-teal)', fontWeight: 500, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                {selectedIndustry.tagline}
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '2rem', fontSize: '0.95rem' }}>
                {selectedIndustry.description}
              </p>

              <h4 className="font-mono-tag" style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>
                CORE SUPPLY FOCUS
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.25rem' }}>
                {selectedIndustry.details.map((detail, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.92rem', color: 'var(--text-main)' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: selectedIndustry.accent, borderRadius: '50%' }} />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setSelectedIndustry(null)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: 'var(--text-main)',
                    color: 'var(--bg-primary)',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                  }}
                >
                  Close Scope
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
