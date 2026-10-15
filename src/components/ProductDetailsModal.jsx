import React, { useState } from 'react';
import { X, Send, ShieldCheck, Tag, Download, CheckCircle2 } from 'lucide-react';

export function ProductDetailsModal({ isOpen, onClose, product, onEnquire }) {
  const [downloading, setDownloading] = useState(false);
  const [downloadDone, setDownloadDone] = useState(false);

  if (!isOpen || !product) return null;

  // Clean printable PDF generator
  const handleDownloadPDF = () => {
    setDownloading(true);

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to download/print the Product Data Sheet PDF.');
      setDownloading(false);
      return;
    }

    const specsHtml = product.specifications
      ? Object.entries(product.specifications)
          .map(
            ([k, v]) => `
            <tr>
              <td style="padding: 10px 14px; border: 1px solid #cbd5e1; font-weight: 600; width: 40%; background: #f8fafc; color: #1e293b;">${k}</td>
              <td style="padding: 10px 14px; border: 1px solid #cbd5e1; color: #334155;">${v}</td>
            </tr>`
          )
          .join('')
      : '';

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${product.name} — Technical Specification Sheet (Maruti)</title>
          <style>
            @page { size: A4; margin: 20mm; }
            body {
              font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
              color: #0f172a;
              margin: 0;
              padding: 24px;
              line-height: 1.5;
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 2px solid #0284c7;
              padding-bottom: 16px;
              margin-bottom: 24px;
            }
            .brand-title {
              font-size: 24px;
              font-weight: 800;
              letter-spacing: 0.04em;
              color: #0284c7;
            }
            .brand-sub {
              font-size: 11px;
              color: #64748b;
              letter-spacing: 0.1em;
              text-transform: uppercase;
            }
            .product-title {
              font-size: 22px;
              font-weight: 700;
              color: #0f172a;
              margin-bottom: 8px;
            }
            .category-tag {
              display: inline-block;
              background-color: #e0f2fe;
              color: #0369a1;
              padding: 4px 10px;
              border-radius: 4px;
              font-size: 12px;
              font-weight: 600;
              margin-bottom: 16px;
            }
            .product-desc {
              font-size: 14px;
              color: #475569;
              margin-bottom: 24px;
              line-height: 1.6;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 24px;
              font-size: 13px;
            }
            .footer-notes {
              border-top: 1px solid #e2e8f0;
              padding-top: 16px;
              font-size: 11px;
              color: #64748b;
              display: flex;
              justify-content: space-between;
            }
            .contact-box {
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              padding: 16px;
              border-radius: 6px;
              margin-bottom: 24px;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="brand-title">MARUTI</div>
              <div class="brand-sub">Pharma &amp; Industrial Supplies</div>
            </div>
            <div style="text-align: right; font-size: 12px; color: #64748b;">
              <strong>Official Technical Data Sheet</strong><br>
              Ref ID: ${product.id || 'N/A'}<br>
              Date: ${new Date().toLocaleDateString()}
            </div>
          </div>

          <span class="category-tag">${product.categoryName}</span>
          <h1 class="product-title">${product.name}</h1>
          <p class="product-desc">${product.description}</p>

          <h3 style="font-size: 15px; margin-bottom: 10px; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">
            Technical Specifications
          </h3>
          <table>
            <tbody>
              <tr>
                <td style="padding: 10px 14px; border: 1px solid #cbd5e1; font-weight: 600; width: 40%; background: #f8fafc; color: #1e293b;">Minimum Order Quantity</td>
                <td style="padding: 10px 14px; border: 1px solid #cbd5e1; color: #334155;">${product.minOrder || 'Custom Lots Available'}</td>
              </tr>
              ${specsHtml}
            </tbody>
          </table>

          <div class="contact-box">
            <strong>Procurement Desk &amp; Formal Quotations:</strong><br>
            Telephone: +91 (079) 2658-4200 &nbsp;|&nbsp; Email: contact@marutichemicals.com<br>
            Distribution Facility: Phase II, GIDC Industrial Estate, Vatva, Ahmedabad, Gujarat 382445, India
          </div>

          <div class="footer-notes">
            <span>Certificate of Analysis (CoA) &amp; Material Test Reports (MTR) provided on order dispatch.</span>
            <span>&copy; ${new Date().getFullYear()} Maruti Pharma &amp; Industrial Supplies</span>
          </div>

          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();

    setDownloading(false);
    setDownloadDone(true);
    setTimeout(() => setDownloadDone(false), 3000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
        backdropFilter: 'blur(6px)',
        padding: '1rem',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          backgroundColor: 'var(--bg-card)',
          borderRadius: '10px',
          border: '1px solid var(--border-strong)',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '92vh',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.1rem 1.5rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Tag size={16} color="var(--accent-blue)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              {product.categoryName}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '1.75rem', overflowY: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.75rem', marginBottom: '1.5rem' }}>
            {/* Image Box (Grayscale by default, color on hover) */}
            <div
              className="modal-image-container"
              style={{
                width: '100%',
                height: '240px',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                border: '1px solid var(--border-subtle)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
                cursor: 'pointer',
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  transition: 'filter 350ms ease, transform 350ms ease',
                }}
                className="modal-product-img"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80';
                }}
              />
            </div>

            {/* Product Meta (No Pricing) */}
            <div>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.65rem', lineHeight: 1.25 }}>
                {product.name}
              </h2>

              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {product.description}
              </p>

              <div
                style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: '6px',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: '1rem',
                  fontSize: '0.85rem',
                }}
              >
                <div style={{ color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                  <strong>Minimum Order:</strong> {product.minOrder || 'Custom Lots Available'}
                </div>
                <div style={{ color: 'var(--text-subtle)', fontSize: '0.78rem' }}>
                  Institutional &amp; bulk supply with certified lot inspection.
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={16} color="var(--accent-blue)" />
                <span>GST Tax Invoicing, CoA &amp; Batch Traceability dossiers.</span>
              </div>
            </div>
          </div>

          {/* Specifications Table */}
          {product.specifications && (
            <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.85rem' }}>
                Technical Specifications
              </h4>
              <div
                style={{
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  backgroundColor: 'var(--bg-surface)',
                }}
              >
                {Object.entries(product.specifications).map(([key, val], idx) => (
                  <div
                    key={key}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '170px 1fr',
                      padding: '0.65rem 1rem',
                      borderBottom: idx === Object.keys(product.specifications).length - 1 ? 'none' : '1px solid var(--border-subtle)',
                      fontSize: '0.86rem',
                    }}
                  >
                    <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{key}</span>
                    <span style={{ color: 'var(--text-main)' }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions: Download PDF + Request Quote */}
        <div
          style={{
            padding: '1.1rem 1.5rem',
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-surface)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          {/* Download as PDF Button */}
          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={downloading}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.25rem',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-main)',
              border: '1px solid var(--border-strong)',
              borderRadius: '6px',
              fontSize: '0.86rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              transition: 'all 180ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-blue)';
              e.currentTarget.style.color = 'var(--accent-blue)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-strong)';
              e.currentTarget.style.color = 'var(--text-main)';
            }}
          >
            {downloadDone ? (
              <>
                <CheckCircle2 size={16} color="var(--accent-blue)" />
                <span>PDF Printed / Ready</span>
              </>
            ) : (
              <>
                <Download size={16} />
                <span>Download as PDF</span>
              </>
            )}
          </button>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.65rem 1.25rem',
                backgroundColor: 'transparent',
                color: 'var(--text-main)',
                border: '1px solid var(--border-strong)',
                borderRadius: '6px',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onEnquire(product);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.5rem',
                backgroundColor: 'var(--accent-blue)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 3px 12px rgba(2, 132, 199, 0.35)',
                transition: 'background-color 180ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-blue-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-blue)';
              }}
            >
              <Send size={15} />
              <span>Request Quote</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .modal-image-container .modal-product-img {
          filter: grayscale(100%);
        }
        .modal-image-container:hover .modal-product-img {
          filter: grayscale(0%);
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
