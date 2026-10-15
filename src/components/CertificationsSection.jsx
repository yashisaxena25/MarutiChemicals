import React from 'react';
import { ShieldCheck, FileCheck, Award, CheckCircle2 } from 'lucide-react';

export function CertificationsSection() {
  const credentials = [
    {
      title: 'Drug License',
      description: 'Drug License for regulated distribution',
      badge: 'DL-COMPLIANT',
    },
    {
      title: 'GST',
      description: 'GST Registered Business Entity',
      badge: 'VERIFIED',
    },
    {
      title: 'ISO 9001',
      description: 'Quality Management aligned processes',
      badge: 'CERTIFIED',
    },
    {
      title: 'Compliance',
      description: 'Products meeting regulatory expectations',
      badge: 'AUDIT-READY',
    },
  ];

  return (
    <section
      id="certifications"
      style={{
        paddingTop: '4.5rem',
        paddingBottom: '4.5rem',
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-subtle)',
        transition: 'background-color 250ms ease',
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0 1.5rem',
        }}
      >
        {/* Header matching exact user reference screenshot */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
          {/* Eyebrow with warm amber rule */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              marginBottom: '0.85rem',
            }}
          >
            <span
              style={{
                width: '32px',
                height: '2px',
                backgroundColor: '#b45309',
                display: 'inline-block',
              }}
            />
            <span
              className="font-mono-tag"
              style={{
                color: 'var(--text-subtle)',
                fontWeight: 700,
                fontSize: '0.78rem',
                letterSpacing: '0.12em',
              }}
            >
              CERTIFICATIONS &amp; CREDENTIALS
            </span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 2.7rem)',
              fontWeight: 800,
              color: 'var(--text-main)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            Regulatory credentials you can rely on
          </h2>
        </div>

        {/* 4 Clean Credential Cards matching the screenshot */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {credentials.map((cred, index) => (
            <div
              key={index}
              className="maruti-credential-card"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '2.5rem 1.75rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)',
                transition: 'all 260ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Shield Icon Badge */}
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-blue-soft)',
                  border: '1px solid rgba(2, 132, 199, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  color: 'var(--accent-blue)',
                  transition: 'transform 260ms ease',
                }}
                className="credential-icon-box"
              >
                <ShieldCheck size={26} />
              </div>

              {/* Title */}
              <h3
                className="font-display"
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 800,
                  color: 'var(--text-main)',
                  marginBottom: '0.65rem',
                }}
              >
                {cred.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: '0.88rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {cred.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .maruti-credential-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px -8px rgba(2, 132, 199, 0.16);
          border-color: var(--accent-blue) !important;
        }
        .maruti-credential-card:hover .credential-icon-box {
          transform: scale(1.12);
        }
      `}</style>
    </section>
  );
}
