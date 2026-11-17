<script setup lang="ts">
import { INSTAGRAM_URL, SITE } from '~/data/site'

const year = useState('ano-rodape', () => new Date().getFullYear())
const contactLink = whatsappLink(SITE.whatsapp, SITE.defaultMessage)
</script>

<template>
  <footer class="rodape bg-cacau-2 pt-12 text-creme/80">
    <div class="wrap flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
      <div>
        <BrandLogo tone="light" />
        <p class="mt-4 max-w-[26rem] text-[15px]">{{ SITE.tagline }} em {{ SITE.city }}/{{ SITE.state }}.</p>
      </div>
      <ul class="flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
        <li>
          <a :href="INSTAGRAM_URL" target="_blank" rel="noopener" class="inline-flex min-h-11 items-center gap-2 hover:text-creme">
            <IconInstagram />
            @{{ SITE.instagram }}
          </a>
        </li>
        <li>
          <a :href="contactLink" target="_blank" rel="noopener" class="inline-flex min-h-11 items-center gap-2 hover:text-creme">
            <IconWhatsapp />
            {{ SITE.whatsappDisplay }}
          </a>
        </li>
      </ul>
    </div>
    <div class="wrap mt-10">
      <div class="flex flex-col gap-2 border-t border-creme/10 pt-6 text-[13px] text-creme/55 md:flex-row md:justify-between">
        <p>© {{ year }} {{ SITE.fullName }}</p>
        <p>{{ SITE.credit }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Room for the floating order button, which spans the width on phones. */
.rodape {
  padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 6.5rem);
}
@media (min-width: 640px) {
  .rodape {
    padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 2.5rem);
  }
}
</style>
