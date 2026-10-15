/**
 * Safe client utility to fetch and cache product images
 * - Uses localStorage with 30-day expiry
 * - Key format: "productImage:<product slug>"
 * - Fetches from /api/product-image?q=<query>
 * - Prefetches lazily on idle
 */

const CACHE_PREFIX = 'productImage:';
const CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export function getProductSlug(product) {
  if (!product) return 'unknown';
  return (product.id || product.name || 'item')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Read cached image from localStorage
 */
export function getCachedProductImage(slug) {
  try {
    const raw = localStorage.getItem(`${CACHE_PREFIX}${slug}`);
    if (!raw) return null;

    const data = JSON.parse(raw);
    const now = Date.now();
    if (data.expiry && now > data.expiry) {
      localStorage.removeItem(`${CACHE_PREFIX}${slug}`);
      return null;
    }
    return data.url ? data : null;
  } catch (err) {
    return null;
  }
}

/**
 * Save image to localStorage with 30-day expiry
 */
export function setCachedProductImage(slug, imageData) {
  try {
    const payload = {
      ...imageData,
      cachedAt: Date.now(),
      expiry: Date.now() + CACHE_TTL_MS,
    };
    localStorage.setItem(`${CACHE_PREFIX}${slug}`, JSON.stringify(payload));
  } catch (err) {
    // localStorage quota exceeded or storage blocked
  }
}

/**
 * Fetch product image from serverless API /api/product-image
 */
export async function fetchProductImage(product) {
  if (!product) return null;
  const slug = getProductSlug(product);

  // 1. Check client cache first
  const cached = getCachedProductImage(slug);
  if (cached) {
    return cached;
  }

  // 2. Fetch from API
  const query = product.imageQuery || product.name;
  const url = `/api/product-image?q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    if (data && data.url) {
      setCachedProductImage(slug, data);
      return data;
    }
    return null;
  } catch (err) {
    return null;
  }
}

/**
 * Idle-time prefetch queue for orbit products
 */
const inFlightPrefetches = new Set();

export function prefetchProductImage(product) {
  if (!product) return;
  const slug = getProductSlug(product);
  if (getCachedProductImage(slug) || inFlightPrefetches.has(slug)) {
    return;
  }

  inFlightPrefetches.add(slug);

  const executePrefetch = () => {
    fetchProductImage(product).finally(() => {
      inFlightPrefetches.delete(slug);
    });
  };

  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    window.requestIdleCallback(executePrefetch, { timeout: 3500 });
  } else {
    setTimeout(executePrefetch, 600);
  }
}
