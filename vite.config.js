import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      {
        name: 'local-api-product-image',
        configureServer(server) {
          server.middlewares.use('/api/product-image', async (req, res) => {
            const url = new URL(req.url, `http://${req.headers.host}`)
            const q = url.searchParams.get('q')

            if (!q) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Missing query parameter "q"' }))
              return
            }

            const apiKey = env.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY
            const cseId = env.GOOGLE_CSE_ID || process.env.GOOGLE_CSE_ID

            if (!apiKey || !cseId) {
              // Curated realistic product images for local dev preview when Google API keys are not yet configured
              const cleanQ = q.toLowerCase()
              let previewUrl = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80' // default medical

              if (cleanQ.includes('gasket') || cleanQ.includes('sanitary gasket')) {
                previewUrl = 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop&q=80' // silicone gasket / industrial seal
              } else if (cleanQ.includes('glove')) {
                previewUrl = 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&auto=format&fit=crop&q=80' // sterile nitrile gloves
              } else if (cleanQ.includes('mask') || cleanQ.includes('face')) {
                previewUrl = 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=800&auto=format&fit=crop&q=80' // surgical cleanroom mask
              } else if (cleanQ.includes('vial') || cleanQ.includes('bottle')) {
                previewUrl = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&auto=format&fit=crop&q=80' // glass vials / lab bottles
              } else if (cleanQ.includes('beaker') || cleanQ.includes('cylinder') || cleanQ.includes('funnel')) {
                previewUrl = 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80' // lab glassware
              } else if (cleanQ.includes('petri')) {
                previewUrl = 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80' // petri dishes
              } else if (cleanQ.includes('pipette') || cleanQ.includes('tip')) {
                previewUrl = 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=800&auto=format&fit=crop&q=80' // pipettes
              } else if (cleanQ.includes('apron') || cleanQ.includes('coat') || cleanQ.includes('coverall')) {
                previewUrl = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80' // protective apparel
              } else if (cleanQ.includes('tubing')) {
                previewUrl = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80' // sanitary silicone tubing
              } else if (cleanQ.includes('container') || cleanQ.includes('tube')) {
                previewUrl = 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&auto=format&fit=crop&q=80' // sterile sample containers
              }

              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              res.setHeader('Cache-Control', 's-maxage=2592000, stale-while-revalidate')
              res.end(JSON.stringify({
                url: previewUrl,
                thumbnail: previewUrl,
                source: 'dev-preview',
                title: `${q} Product Demo`
              }))
              return
            }

            const searchQuery = `${q.trim()} product white background`
            const searchUrl = new URL('https://www.googleapis.com/customsearch/v1')
            searchUrl.searchParams.set('key', apiKey)
            searchUrl.searchParams.set('cx', cseId)
            searchUrl.searchParams.set('q', searchQuery)
            searchUrl.searchParams.set('searchType', 'image')
            searchUrl.searchParams.set('num', '5')
            searchUrl.searchParams.set('imgSize', 'large')
            searchUrl.searchParams.set('imgType', 'photo')
            searchUrl.searchParams.set('safe', 'active')
            searchUrl.searchParams.set('rights', 'cc_publicdomain,cc_attribute,cc_sharealike')

            try {
              const fetchRes = await fetch(searchUrl.toString())
              const data = await fetchRes.json()

              if (!fetchRes.ok) {
                res.statusCode = fetchRes.status
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: data.error?.message || 'Google API error' }))
                return
              }

              if (!data.items || data.items.length === 0) {
                res.statusCode = 404
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: 'No matching images found' }))
                return
              }

              let selectedItem = null
              for (const item of data.items) {
                const width = item.image?.width || 0
                const height = item.image?.height || 0
                if (width >= 600 && height > 0) {
                  const ratio = width / height
                  if (ratio >= 0.75 && ratio <= 1.6) {
                    selectedItem = item
                    break
                  }
                }
              }

              if (!selectedItem) selectedItem = data.items[0]

              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              res.setHeader('Cache-Control', 's-maxage=2592000, stale-while-revalidate')
              res.end(JSON.stringify({
                url: selectedItem.link,
                thumbnail: selectedItem.image?.thumbnailLink || selectedItem.link,
                source: selectedItem.displayLink || '',
                title: selectedItem.title || q
              }))
            } catch (err) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: err.message || 'Internal server error' }))
            }
          })
        }
      }
    ]
  }
})

