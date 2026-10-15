import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS_DATA } from '../data/faqs';
import { ScrollReveal } from './ScrollReveal';
import { HelpCircle, Plus } from 'lucide-react';

export function FAQSection() {
  const [openId, setOpenId] = useState(FAQS_DATA[0].id);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faqs"
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
          maxWidth: '960px',
          margin: '0 auto',
          padding: '0 2rem',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <ScrollReveal direction="up">
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: '0.75rem',
              }}
            >
              <HelpCircle size={16} color="var(--accent-teal)" />
              <span className="font-mono-tag" style={{ color: 'var(--accent-teal)', fontWeight: 600 }}>
                PROCUREMENT & PROTOCOL INQUIRIES
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
                marginBottom: '1rem',
              }}
            >
              Frequently asked questions.
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '580px', margin: '0 auto' }}>
              Common technical inquiries regarding material certification, batch traceability, and supply protocols for regulated environments.
            </p>
          </ScrollReveal>
        </div>

        {/* FAQ Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {FAQS_DATA.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: isOpen ? '1px solid var(--accent-teal)' : '1px solid var(--border-subtle)',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  transition: 'border-color 250ms ease, box-shadow 250ms ease',
                  boxShadow: isOpen ? '0 10px 25px -5px rgba(0, 0, 0, 0.08)' : 'none',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    padding: '1.4rem 1.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    gap: '1.5rem',
                  }}
                >
                  <span
                    className="font-display"
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      color: isOpen ? 'var(--accent-teal)' : 'var(--text-main)',
                      transition: 'color 200ms ease',
                    }}
                  >
                    {faq.question}
                  </span>
                  
                  {/* Plus to cross icon */}
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: isOpen ? 'var(--accent-teal-bg)' : 'var(--bg-surface)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isOpen ? 'var(--accent-teal)' : 'var(--text-main)',
                      flexShrink: 0,
                      transform: isOpen ? 'rotate(45deg)' : 'none',
                      transition: 'all 250ms cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <Plus size={16} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div
                        style={{
                          padding: '0 1.75rem 1.5rem',
                          borderTop: '1px solid var(--border-subtle)',
                          marginTop: '0.25rem',
                          paddingTop: '1.25rem',
                        }}
                      >
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.92rem' }}>
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
