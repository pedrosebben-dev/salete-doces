import tailwindcss from '@tailwindcss/vite'

// PREVIEW_BUILD=1 gera uma versão SPA que roda a partir de qualquer pasta.
// Ela só existe para prévias (ex.: abrir o site dentro de outro link);
// para publicar de verdade use `npm run generate`, que gera HTML estático com SEO.
const isPreview = process.env.PREVIEW_BUILD === '1'

// Endereço público do site (Open Graph, sitemap, canonical).
// Na Vercel ele vem sozinho do domínio de produção; em outro lugar, use NUXT_PUBLIC_SITE_URL.
const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || (vercelDomain ? `https://${vercelDomain}` : '')

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  devtools: { enabled: true },
  ssr: !isPreview,

  modules: ['@pinia/nuxt', '@vueuse/nuxt'],
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
    define: { __PREVIEW__: JSON.stringify(isPreview) },
  },

  app: {
    // Some preview hosts reserve names that start with "_", so the preview uses /nuxt/.
    buildAssetsDir: isPreview ? '/nuxt/' : '/_nuxt/',
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      meta: [
        { name: 'theme-color', content: '#4A2A26' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
    },
  },

  runtimeConfig: {
    public: {
      siteUrl,
    },
  },

  nitro: {
    prerender: {
      routes: ['/', '/sitemap.xml', '/robots.txt'],
      crawlLinks: false,
    },
  },

  // The preview build avoids the entry import map so it also runs where inline import maps are restricted.
  experimental: isPreview ? { entryImportMap: false } : {},

  typescript: { strict: true },
})
