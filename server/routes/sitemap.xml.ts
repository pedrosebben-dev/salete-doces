export default defineEventHandler((event) => {
  const siteUrl = useRuntimeConfig(event).public.siteUrl.replace(/\/$/, '')
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  const loc = `${siteUrl}/`
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${loc}</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
</urlset>
`
})
