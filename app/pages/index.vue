<script setup lang="ts">
import { INSTAGRAM_URL, SITE } from '~/data/site'

const siteUrl = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')
const title = `${SITE.fullName} | Doces finos sob encomenda em ${SITE.city}/${SITE.state}`
const description =
  'Bombons, docinhos, tortinhas e salgados feitos à mão pela Salete, sob encomenda em Encantado/RS. Monte seu pedido e envie pelo WhatsApp.'
const image = siteUrl ? `${siteUrl}/og-image.jpg` : undefined

useSeoMeta({
  title,
  description,
  ogTitle: SITE.fullName,
  ogDescription: description,
  ogType: 'website',
  ogLocale: 'pt_BR',
  ogSiteName: SITE.fullName,
  ogUrl: siteUrl ? `${siteUrl}/` : undefined,
  ogImage: image,
  ogImageWidth: image ? 1200 : undefined,
  ogImageHeight: image ? 630 : undefined,
  ogImageAlt: image ? 'Doces da Salete Togni em forminhas cor-de-rosa' : undefined,
  twitterCard: 'summary_large_image',
})

const business = {
  '@context': 'https://schema.org',
  '@type': 'Bakery',
  name: SITE.fullName,
  description,
  telephone: '+55 51 98254-4320',
  address: {
    '@type': 'PostalAddress',
    addressLocality: SITE.city,
    addressRegion: SITE.state,
    addressCountry: 'BR',
  },
  areaServed: `${SITE.city}, ${SITE.state}`,
  servesCuisine: 'Doces finos e salgados para festas',
  sameAs: [INSTAGRAM_URL],
  ...(siteUrl ? { url: `${siteUrl}/`, image } : {}),
}

useHead({
  link: siteUrl ? [{ rel: 'canonical', href: `${siteUrl}/` }] : [],
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(business) }],
})
</script>

<template>
  <div>
    <a
      href="#vitrine"
      class="sr-only z-50 rounded-full bg-cacau px-5 py-3 font-semibold text-creme focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      Pular para a vitrine
    </a>
    <SiteHeader />
    <main>
      <HeroSection />
      <ChristmasSection />
      <CatalogSection />
      <EstimateSection />
      <HowToOrderSection />
      <EventsSection />
      <ReviewSection />
      <FaqSection />
      <ClosingCta />
    </main>
    <SiteFooter />
    <OrderButton />
    <OrderDrawer />
    <ProductDialog />
    <ToastMessage />
  </div>
</template>
