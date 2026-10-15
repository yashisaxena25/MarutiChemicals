export default async function handler(req, res) {
  // Set CORS headers if accessed cross-origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 4. Cache-Control: s-maxage=2592000 (30 days), stale-while-revalidate for edge caching
  res.setHeader('Cache-Control', 's-maxage=2592000, stale-while-revalidate');

  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'Missing query parameter "q"' });
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  const cseId = process.env.GOOGLE_CSE_ID;

  if (!apiKey || !cseId) {
    return res.status(503).json({
      error: 'Google Search API is not configured',
      message: 'GOOGLE_API_KEY and GOOGLE_CSE_ID must be set in environment variables.'
    });
  }

  // 3. Build search query from product name + context
  // e.g. "<product name> product white background"
  const searchQuery = `${q.trim()} product white background`;

  const searchUrl = new URL('https://www.googleapis.com/customsearch/v1');
  searchUrl.searchParams.set('key', apiKey);
  searchUrl.searchParams.set('cx', cseId);
  searchUrl.searchParams.set('q', searchQuery);
  searchUrl.searchParams.set('searchType', 'image');
  searchUrl.searchParams.set('num', '5');
  searchUrl.searchParams.set('imgSize', 'large');
  searchUrl.searchParams.set('imgType', 'photo');
  searchUrl.searchParams.set('safe', 'active');
  searchUrl.searchParams.set('rights', 'cc_publicdomain,cc_attribute,cc_sharealike');

  try {
    const response = await fetch(searchUrl.toString());
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || 'Google API error',
        status: response.status
      });
    }

    if (!data.items || data.items.length === 0) {
      return res.status(404).json({ error: 'No matching images found' });
    }

    // Pick first result that is at least 600px wide and has landscape/square ratio close to 1:1
    let selectedItem = null;
    for (const item of data.items) {
      const width = item.image?.width || 0;
      const height = item.image?.height || 0;

      if (width >= 600 && height > 0) {
        const ratio = width / height;
        // Ratio roughly square or modest landscape (between 0.75 and 1.6)
        if (ratio >= 0.75 && ratio <= 1.6) {
          selectedItem = item;
          break;
        }
      }
    }

    // Fallback to first available result if none strictly met the ratio criteria
    if (!selectedItem) {
      selectedItem = data.items[0];
    }

    return res.status(200).json({
      url: selectedItem.link,
      thumbnail: selectedItem.image?.thumbnailLink || selectedItem.link,
      source: selectedItem.displayLink || '',
      title: selectedItem.title || q
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
