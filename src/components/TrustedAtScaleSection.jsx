import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';

function useCounter(targetValue, duration = 2000, trigger = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let startTime = null;
    let animationFrame;

    const step = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing out cubic for realistic, smooth acceleration and deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * targetValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setCount(targetValue);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [targetValue, duration, trigger]);

  return count;
}

export function TrustedAtScaleSection() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const countExperience = useCounter(10, 1600, hasAnimated);
  const countSectors = useCounter(5, 1400, hasAnimated);
  const countCustomers = useCounter(250, 2000, hasAnimated);
  const countCategories = useCounter(20, 1800, hasAnimated);

  const trustChecklist = [
    'Product Authenticity',
    'Reliable Supply',
    'Timely Deliveries',
    'Regulatory Compliance',
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        paddingTop: '5rem',
        paddingBottom: '5rem',
        backgroundColor: 'var(--bg-surface)',
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Heading and Story from the screenshot */}
          <div>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 800,
                color: 'var(--text-main)',
                lineHeight: 1.18,
                letterSpacing: '-0.025em',
                marginBottom: '1.5rem',
              }}
            >
              Your trusted partner for{' '}
              <span style={{ color: 'var(--accent-blue)', fontStyle: 'italic' }}>
                industrial &amp; healthcare
              </span>{' '}
              solutions
            </h2>

            <p
              style={{
                fontSize: '1rem',
                color: 'var(--text-muted)',
                lineHeight: 1.68,
                marginBottom: '1.25rem',
              }}
            >
              Maruti Chemicals is dedicated to supplying high-quality products that meet the stringent requirements of regulated industries. Our commitment to quality, timely deliveries, and customer satisfaction has helped us build lasting relationships with clients across India.
            </p>

            <p
              style={{
                fontSize: '0.96rem',
                color: 'var(--text-muted)',
                lineHeight: 1.68,
                marginBottom: '2rem',
              }}
            >
              We work closely with globally recognized manufacturers to provide reliable solutions for pharmaceutical production, food processing, hospitals, laboratories, and healthcare facilities. Our goal is simple — deliver products that help our customers operate safely, efficiently, and confidently.
            </p>

            {/* 4 Trust Checks */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '0.85rem 1.5rem',
              }}
            >
              {trustChecklist.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-blue-soft)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-blue)',
                      flexShrink: 0,
                    }}
                  >
                    <CheckCircle2 size={15} />
                  </div>
                  <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: "TRUSTED AT SCALE" Animated Figures Card */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                width: '100%',
                maxWidth: '520px',
                backgroundColor: '#0c1e33', // Deep rich navy matching user screenshot
                borderRadius: '16px',
                padding: '3rem 2.75rem',
                boxShadow: '0 20px 45px -10px rgba(12, 30, 51, 0.35)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Subtle top ambient glow */}
              <div
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-40px',
                  width: '140px',
                  height: '140px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Eyebrow */}
              <div
                className="font-mono-tag"
                style={{
                  color: '#38bdf8',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  marginBottom: '2.5rem',
                  display: 'block',
                }}
              >
                TRUSTED AT SCALE
              </div>

              {/* 2 x 2 Stat Metric Grid with Animated Counting Figures */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '2.5rem 2rem',
                }}
              >
                {/* Metric 1 */}
                <div>
                  <div
                    className="font-display"
                    style={{
                      fontSize: 'clamp(2.4rem, 4vw, 3.2rem)',
                      fontWeight: 800,
                      color: '#38bdf8',
                      lineHeight: 1,
                      marginBottom: '0.55rem',
                    }}
                  >
                    {countExperience}+
                  </div>
                  <div
                    style={{
                      fontSize: '0.88rem',
                      color: '#cbd5e1',
                      fontWeight: 500,
                      lineHeight: 1.4,
                    }}
                  >
                    Years of Industry Experience
                  </div>
                </div>

                {/* Metric 2 */}
                <div>
                  <div
                    className="font-display"
                    style={{
                      fontSize: 'clamp(2.4rem, 4vw, 3.2rem)',
                      fontWeight: 800,
                      color: '#38bdf8',
                      lineHeight: 1,
                      marginBottom: '0.55rem',
                    }}
                  >
                    {countSectors}
                  </div>
                  <div
                    style={{
                      fontSize: '0.88rem',
                      color: '#cbd5e1',
                      fontWeight: 500,
                      lineHeight: 1.4,
                    }}
                  >
                    Sectors Served
                  </div>
                </div>

                {/* Metric 3 */}
                <div>
                  <div
                    className="font-display"
                    style={{
                      fontSize: 'clamp(2.4rem, 4vw, 3.2rem)',
                      fontWeight: 800,
                      color: '#38bdf8',
                      lineHeight: 1,
                      marginBottom: '0.55rem',
                    }}
                  >
                    {countCustomers}+
                  </div>
                  <div
                    style={{
                      fontSize: '0.88rem',
                      color: '#cbd5e1',
                      fontWeight: 500,
                      lineHeight: 1.4,
                    }}
                  >
                    Customers Across India
                  </div>
                </div>

                {/* Metric 4 */}
                <div>
                  <div
                    className="font-display"
                    style={{
                      fontSize: 'clamp(2.4rem, 4vw, 3.2rem)',
                      fontWeight: 800,
                      color: '#38bdf8',
                      lineHeight: 1,
                      marginBottom: '0.55rem',
                    }}
                  >
                    {countCategories}+
                  </div>
                  <div
                    style={{
                      fontSize: '0.88rem',
                      color: '#cbd5e1',
                      fontWeight: 500,
                      lineHeight: 1.4,
                    }}
                  >
                    Product Categories
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
