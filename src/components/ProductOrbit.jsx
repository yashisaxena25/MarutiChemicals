import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ORBIT_PRODUCTS } from '../data/products';
import { ScrollReveal } from './ScrollReveal';
import { fetchProductImage, prefetchProductImage, getCachedProductImage, getProductSlug } from '../utils/productImageService';
import {
  Compass,
  RotateCw,
  Sparkles,
  ArrowRight,
  Layers,
  FlaskConical,
  Utensils,
  Building2,
  Stethoscope,
  Wind,
  PackageCheck
} from 'lucide-react';

/**
 * ProductOrbit
 * Premium circular product showcase:
 * - 5 strictly defined industry sectors:
 *     1. Pharmaceutical Industry
 *     2. Food Industry
 *     3. Hospitals & Healthcare
 *     4. Medical Equipment & Supplies
 *     5. Clean Room Products
 * - Products mathematically spaced around clean circular orbit with cursor rotation
 * - Center circle showcases the ACTIVE PRODUCT IMAGE with smooth crossfade
 * - Black & white by default (filter: grayscale(100%) contrast(1.05)), color on hover/focus (filter: grayscale(0%) contrast(1))
 * - Soft shimmering skeleton while image loads
 * - Line-icon fallback with product name if API fails, quota exceeded, or image error
 * - Overlapping "Inquire Spec" pill button at the bottom edge of the circle
 * - Active selection label on/above ring, accessible caption below
 */
export function ProductOrbit() {
  const [selectedProduct, setSelectedProduct] = useState(ORBIT_PRODUCTS[0]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [isPointerInteracting, setIsPointerInteracting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Center circle image states
  const [currentImageData, setCurrentImageData] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isCenterHovered, setIsCenterHovered] = useState(false);
  const [isTouchColorActive, setIsTouchColorActive] = useState(false);

  const containerRef = useRef(null);
  const ringRef = useRef(null);
  const currentRotationRef = useRef(0);
  const targetRotationRef = useRef(0);
  const lastAngleRef = useRef(null);
  const isDraggingRef = useRef(false);
  const isTouchingRef = useRef(false);
  const animationFrameRef = useRef(null);

  // 5 STRICT INDUSTRY CATEGORIES
  const categories = [
    'All',
    'Pharmaceutical Industry',
    'Food Industry',
    'Hospitals & Healthcare',
    'Medical Equipment & Supplies',
    'Clean Room Products'
  ];

  // Select balanced products for clean circumference spacing
  const orbitItems = useMemo(() => {
    if (selectedCategory === 'All') {
      return ORBIT_PRODUCTS.slice(0, 20);
    }
    const filtered = ORBIT_PRODUCTS.filter((p) => p.sector === selectedCategory);
    return filtered.length > 0 ? filtered : ORBIT_PRODUCTS.slice(0, 20);
  }, [selectedCategory]);

  const activeDisplayProduct = hoveredProduct || selectedProduct;

  // Prefetch orbit product images lazily on idle
  useEffect(() => {
    orbitItems.forEach((product) => {
      prefetchProductImage(product);
    });
  }, [orbitItems]);

  // Load image for currently active product with localStorage check + 300ms crossfade
  useEffect(() => {
    if (!activeDisplayProduct) return;

    let isCancelled = false;
    const slug = getProductSlug(activeDisplayProduct);
    const cached = getCachedProductImage(slug);

    if (cached) {
      setCurrentImageData(cached);
      setImageLoading(false);
      setImageError(false);
      return;
    }

    setImageLoading(true);
    setImageError(false);

    fetchProductImage(activeDisplayProduct)
      .then((data) => {
        if (isCancelled) return;
        if (data && data.url) {
          setCurrentImageData(data);
          setImageError(false);
        } else {
          setImageError(true);
        }
      })
      .catch(() => {
        if (!isCancelled) setImageError(true);
      })
      .finally(() => {
        if (!isCancelled) setImageLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [activeDisplayProduct]);

  // Smooth LERP animation loop via requestAnimationFrame
  useEffect(() => {
    let running = true;

    const updatePhysics = () => {
      if (!running) return;

      const diff = targetRotationRef.current - currentRotationRef.current;
      currentRotationRef.current += diff * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform = `rotate(${currentRotationRef.current}deg)`;
        const labels = ringRef.current.querySelectorAll('.orbit-product-node');
        labels.forEach((node) => {
          node.style.transform = `translate(-50%, -50%) rotate(${-currentRotationRef.current}deg)`;
        });
      }

      animationFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animationFrameRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      running = false;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Calculate pointer angle relative to orbit center
  const getAngle = useCallback((clientX, clientY) => {
    if (!containerRef.current) return null;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.atan2(clientY - centerY, clientX - centerX);
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (!containerRef.current) return;
    const currentAngle = getAngle(e.clientX, e.clientY);
    if (currentAngle === null) return;

    if (lastAngleRef.current !== null) {
      let delta = currentAngle - lastAngleRef.current;
      if (delta > Math.PI) delta -= 2 * Math.PI;
      else if (delta < -Math.PI) delta += 2 * Math.PI;

      const deltaDeg = (delta * 180) / Math.PI;
      const clampedDelta = Math.max(-18, Math.min(18, deltaDeg * 1.15));
      targetRotationRef.current += clampedDelta;
    }
    lastAngleRef.current = currentAngle;
  }, [getAngle]);

  const handlePointerEnter = useCallback((e) => {
    setIsPointerInteracting(true);
    lastAngleRef.current = getAngle(e.clientX, e.clientY);
  }, [getAngle]);

  const handlePointerLeave = useCallback(() => {
    setIsPointerInteracting(false);
    lastAngleRef.current = null;
    isDraggingRef.current = false;
  }, []);

  const handleTouchStart = useCallback((e) => {
    if (e.touches.length === 1) {
      isTouchingRef.current = true;
      setIsPointerInteracting(true);
      lastAngleRef.current = getAngle(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [getAngle]);

  const handleTouchMove = useCallback((e) => {
    if (!isTouchingRef.current || e.touches.length !== 1) return;
    const currentAngle = getAngle(e.touches[0].clientX, e.touches[0].clientY);
    if (currentAngle === null) return;

    if (lastAngleRef.current !== null) {
      let delta = currentAngle - lastAngleRef.current;
      if (delta > Math.PI) delta -= 2 * Math.PI;
      else if (delta < -Math.PI) delta += 2 * Math.PI;

      const deltaDeg = (delta * 180) / Math.PI;
      targetRotationRef.current += Math.max(-16, Math.min(16, deltaDeg * 1.1));
    }
    lastAngleRef.current = currentAngle;
  }, [getAngle]);

  const handleTouchEnd = useCallback(() => {
    isTouchingRef.current = false;
    setIsPointerInteracting(false);
    lastAngleRef.current = null;
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      targetRotationRef.current += 18;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      targetRotationRef.current -= 18;
    }
  };

  // Helper for category-specific fallback icon
  const getCategoryFallbackIcon = (sector) => {
    switch (sector) {
      case 'Pharmaceutical Industry':
        return <FlaskConical size={36} color="var(--accent-teal)" strokeWidth={1.75} />;
      case 'Food Industry':
        return <Utensils size={36} color="var(--accent-teal)" strokeWidth={1.75} />;
      case 'Hospitals & Healthcare':
        return <Building2 size={36} color="var(--accent-teal)" strokeWidth={1.75} />;
      case 'Medical Equipment & Supplies':
        return <Stethoscope size={36} color="var(--accent-teal)" strokeWidth={1.75} />;
      case 'Clean Room Products':
        return <Wind size={36} color="var(--accent-teal)" strokeWidth={1.75} />;
      default:
        return <PackageCheck size={36} color="var(--accent-teal)" strokeWidth={1.75} />;
    }
  };

  const isColorActive = isCenterHovered || isTouchColorActive;

  return (
    <section
      id="product-orbit"
      style={{
        padding: '7rem 0',
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background-color 300ms ease',
      }}
      aria-label="Circular Product Orbit"
      tabIndex={0}
      onKeyDown={handleKeyDown}
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
            marginBottom: '3rem',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '2rem',
            gap: '2rem',
          }}
        >
          <ScrollReveal direction="left">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <Compass size={16} color="var(--accent-teal)" />
              <span className="font-mono-tag" style={{ color: 'var(--accent-teal)', fontWeight: 600 }}>
                CIRCULAR PRODUCT ORBIT
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
              Explore our core supply universe.
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="right" style={{ maxWidth: '460px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Move your pointer around the circumference to rotate the orbit. Active item is displayed in the focal circle with live product imagery.
            </p>
          </ScrollReveal>
        </div>

        {/* 5 Strictly Defined Industry Category Filter Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '2.5rem',
            alignItems: 'center',
          }}
        >
          <span className="font-mono-tag" style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', marginRight: '0.5rem' }}>
            SECTOR FILTER:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.4rem 0.95rem',
                fontSize: '0.8rem',
                borderRadius: '3px',
                border: selectedCategory === cat ? '1px solid var(--text-main)' : '1px solid var(--border-subtle)',
                backgroundColor: selectedCategory === cat ? 'var(--text-main)' : 'var(--bg-card)',
                color: selectedCategory === cat ? 'var(--bg-primary)' : 'var(--text-muted)',
                cursor: 'pointer',
                fontWeight: selectedCategory === cat ? 600 : 500,
                transition: 'all 200ms ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Orbit Interaction Container */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '660px',
            userSelect: 'none',
          }}
        >
          {/* Directional Interaction Hint */}
          <div
            style={{
              position: 'absolute',
              top: '0.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.4rem 1rem',
              backgroundColor: isPointerInteracting ? 'var(--accent-teal-bg)' : 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '999px',
              fontSize: '0.78rem',
              color: isPointerInteracting ? 'var(--accent-teal)' : 'var(--text-muted)',
              transition: 'all 250ms ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
            }}
          >
            <RotateCw
              size={13}
              style={{
                animation: isPointerInteracting ? 'spinSlow 4s linear infinite' : 'none',
                color: 'var(--accent-teal)',
              }}
            />
            <span className="font-mono-tag" style={{ letterSpacing: '0.06em' }}>
              {isPointerInteracting ? 'POINTER ROTATION ACTIVE' : 'MOVE CURSOR AROUND CIRCLE TO ROTATE'}
            </span>
          </div>

          {/* Interactive Rotational Touch/Mouse Stage */}
          <div
            ref={containerRef}
            onPointerMove={handlePointerMove}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              width: '100%',
              maxWidth: '660px',
              height: '660px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isPointerInteracting ? 'grabbing' : 'grab',
              touchAction: 'none',
            }}
          >
            {/* Background SVG Grid and Circumference Guidelines */}
            <svg
              viewBox="0 0 660 660"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
              }}
            >
              {/* Outer Circumference Ring (Radius: 270px) */}
              <circle
                cx="330"
                cy="330"
                r="270"
                stroke="var(--border-subtle)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                fill="none"
              />
              {/* Inner Concentric Support Ring (Radius: 185px) */}
              <circle
                cx="330"
                cy="330"
                r="185"
                stroke="var(--border-subtle)"
                strokeWidth="1"
                fill="none"
                opacity="0.6"
              />
              {/* Center Console Dashed Outer Ring (Radius: 112px) */}
              <circle
                cx="330"
                cy="330"
                r="114"
                stroke="var(--accent-teal)"
                strokeWidth="1.5"
                strokeDasharray="3 5"
                fill="none"
                opacity="0.5"
              />
            </svg>

            {/* Rotating Ring Container */}
            <div
              ref={ringRef}
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                transformOrigin: 'center center',
                willChange: 'transform',
              }}
            >
              {orbitItems.map((product, idx) => {
                const total = orbitItems.length;
                const angleRad = (2 * Math.PI * idx) / total;
                const radius = 270;
                const xPercent = ((330 + radius * Math.cos(angleRad)) / 660) * 100;
                const yPercent = ((330 + radius * Math.sin(angleRad)) / 660) * 100;

                const isSelected = selectedProduct?.id === product.id;
                const isHovered = hoveredProduct?.id === product.id;

                return (
                  <div
                    key={product.id}
                    className="orbit-product-node"
                    role="button"
                    tabIndex={0}
                    aria-label={`Select ${product.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                    }}
                    onMouseEnter={() => setHoveredProduct(product)}
                    onMouseLeave={() => setHoveredProduct(null)}
                    onFocus={() => {
                      setHoveredProduct(product);
                      setSelectedProduct(product);
                    }}
                    onBlur={() => setHoveredProduct(null)}
                    style={{
                      position: 'absolute',
                      left: `${xPercent}%`,
                      top: `${yPercent}%`,
                      transform: 'translate(-50%, -50%)',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '3px',
                      backgroundColor: isSelected
                        ? 'var(--accent-teal)'
                        : isHovered
                        ? 'var(--bg-card-hover)'
                        : 'var(--bg-card)',
                      border: isSelected
                        ? '1px solid var(--accent-teal)'
                        : isHovered
                        ? '1px solid var(--accent-teal)'
                        : '1px solid var(--border-subtle)',
                      color: isSelected
                        ? '#ffffff'
                        : isHovered
                        ? 'var(--accent-teal)'
                        : 'var(--text-main)',
                      fontSize: '0.76rem',
                      fontWeight: isSelected || isHovered ? 600 : 500,
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      boxShadow: isHovered || isSelected
                        ? '0 8px 18px -4px rgba(15, 118, 110, 0.2)'
                        : '0 2px 4px rgba(0,0,0,0.03)',
                      transition: 'background-color 200ms ease, border-color 200ms ease, color 200ms ease, transform 150ms ease',
                      zIndex: isSelected ? 6 : 2,
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        backgroundColor: isSelected ? '#ffffff' : 'var(--accent-teal)',
                        marginRight: '0.45rem',
                        verticalAlign: 'middle',
                      }}
                    />
                    {product.name}
                  </div>
                );
              })}
            </div>

            {/* Central Focal Console: PRODUCT IMAGE FILL */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 10,
                pointerEvents: 'auto',
              }}
            >
              {/* Active Selection Tag on / above the ring */}
              <div
                style={{
                  position: 'absolute',
                  top: '-24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.2rem 0.65rem',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '999px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                  zIndex: 12,
                }}
              >
                <Sparkles size={11} color="var(--accent-teal)" />
                <span
                  className="font-mono-tag"
                  style={{
                    fontSize: '0.62rem',
                    color: 'var(--accent-teal)',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                  }}
                >
                  ACTIVE SELECTION
                </span>
              </div>

              {/* The Circular Image Display */}
              <div
                tabIndex={0}
                role="region"
                aria-label={`Active Product: ${activeDisplayProduct?.name}`}
                onMouseEnter={() => setIsCenterHovered(true)}
                onMouseLeave={() => setIsCenterHovered(false)}
                onFocus={() => setIsCenterHovered(true)}
                onBlur={() => setIsCenterHovered(false)}
                onClick={() => setIsTouchColorActive((prev) => !prev)}
                className="orbit-center-circle"
                style={{
                  width: '210px',
                  height: '210px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundColor: 'var(--bg-card)',
                  border: isColorActive ? '2px solid var(--accent-teal)' : '2px solid var(--border-subtle)',
                  boxShadow: isColorActive
                    ? 'inset 0 0 25px rgba(0, 0, 0, 0.4), 0 28px 56px -12px rgba(15, 118, 110, 0.35)'
                    : 'inset 0 0 25px rgba(0, 0, 0, 0.35), 0 20px 40px -10px rgba(0, 0, 0, 0.15)',
                  cursor: 'pointer',
                  outline: 'none',
                  transform: isColorActive ? 'scale(1.18)' : 'scale(1)',
                  transformOrigin: 'center center',
                  transition: 'transform 0.45s cubic-bezier(0.2, 0.8, 0.25, 1), border-color 300ms ease, box-shadow 300ms ease',
                }}
              >
                {/* Crossfade Image Container with AnimatePresence */}
                <AnimatePresence mode="wait">
                  {imageLoading && !currentImageData ? (
                    /* Soft shimmering skeleton circle */
                    <motion.div
                      key="skeleton"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="skeleton-shimmer"
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                      }}
                    />
                  ) : imageError || !currentImageData?.url ? (
                    /* Fallback: Dark circle with category line icon in teal + product name */
                    <motion.div
                      key={`fallback-${activeDisplayProduct?.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        backgroundColor: 'var(--bg-surface-elevated)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1.25rem',
                        textAlign: 'center',
                        boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.25)',
                      }}
                    >
                      <div style={{ marginBottom: '0.65rem' }}>
                        {getCategoryFallbackIcon(activeDisplayProduct?.sector)}
                      </div>
                      <span
                        className="font-display"
                        style={{
                          fontSize: '0.86rem',
                          fontWeight: 600,
                          color: 'var(--text-main)',
                          lineHeight: 1.25,
                        }}
                      >
                        {activeDisplayProduct?.name}
                      </span>
                    </motion.div>
                  ) : (
                    /* Product Image: B&W by default, Color & slight scale on hover/focus */
                    <motion.div
                      key={currentImageData.url}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                      }}
                    >
                      <img
                        src={currentImageData.url}
                        alt={activeDisplayProduct?.name || 'Product Image'}
                        loading="eager"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={() => setImageError(true)}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '50%',
                          filter: isColorActive
                            ? 'grayscale(0%) contrast(1)'
                            : 'grayscale(100%) contrast(1.05)',
                          transform: isColorActive ? 'scale(1.15)' : 'scale(1)',
                          transformOrigin: 'center center',
                          transition: 'filter 0.45s ease, transform 0.5s cubic-bezier(0.2, 0.8, 0.25, 1)',
                          display: 'block',
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Subtle Inner Vignette Shadow Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    boxShadow: 'inset 0 0 24px rgba(0, 0, 0, 0.32)',
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* Overlapping "Inquire Spec" pill button at bottom edge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-14px',
                  zIndex: 12,
                }}
              >
                <a
                  href="#contact"
                  style={{
                    fontSize: '0.72rem',
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.35rem 0.95rem',
                    backgroundColor: 'var(--accent-teal)',
                    borderRadius: '999px',
                    boxShadow: '0 4px 14px rgba(15, 118, 110, 0.35)',
                    transition: 'all 200ms ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(15, 118, 110, 0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(15, 118, 110, 0.35)';
                  }}
                >
                  <span>Inquire Spec</span>
                  <ArrowRight size={11} />
                </a>
              </div>

              {/* Product name caption below circle (accessible & muted) */}
              <div
                style={{
                  marginTop: '1.75rem',
                  textAlign: 'center',
                  maxWidth: '220px',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    lineHeight: 1.25,
                    marginBottom: '0.15rem',
                  }}
                >
                  {activeDisplayProduct?.name}
                </span>
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  {activeDisplayProduct?.sector}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Accessible Mobile/Fallback Product Grid */}
        <div
          style={{
            marginTop: '2.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-subtle)', fontSize: '0.8rem' }}>
            <Layers size={14} color="var(--accent-teal)" />
            <span>20 SUPPLIES POSITIONED ALONG 360° ORBIT WITH PERMANENT UPRIGHT ORIENTATION</span>
          </div>

          <a
            href="#products"
            style={{
              textDecoration: 'none',
              fontSize: '0.85rem',
              color: 'var(--text-main)',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span>Browse Full Catalog Grid</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>

      <style>{`
        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .skeleton-shimmer {
          background: linear-gradient(
            90deg,
            var(--bg-card) 0%,
            var(--bg-surface-elevated) 50%,
            var(--bg-card) 100%
          );
          background-size: 200% 100%;
          animation: skeletonGlow 1.5s infinite;
        }

        @keyframes skeletonGlow {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .orbit-center-circle:hover,
        .orbit-center-circle:focus-visible {
          border-color: var(--accent-teal) !important;
        }

        @media (hover: none) {
          .orbit-center-circle img {
            filter: grayscale(0%) contrast(1) !important;
          }
        }
      `}</style>
    </section>
  );
}
