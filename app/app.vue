<script setup lang="ts">
const base = useRuntimeConfig().app.baseURL

useHead({
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` },
    { rel: 'apple-touch-icon', href: `${base}apple-touch-icon.png` },
    { rel: 'manifest', href: `${base}site.webmanifest` },
  ],
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtPage />
</template>
