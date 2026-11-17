<script setup lang="ts">
import { SITE } from '~/data/site'

const scrollTo = useSectionScroll()
const track = useTrack()
const contactLink = whatsappLink(SITE.whatsapp, SITE.defaultMessage)
</script>

<template>
  <section id="inicio" class="relative overflow-hidden" aria-labelledby="hero-titulo">
    <div
      class="wrap grid items-center gap-14 pb-20 pt-6 md:pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-16 lg:pb-28 lg:pt-12"
    >
      <div class="max-w-[38rem]">
        <p class="flex items-center gap-2 text-[15px] font-semibold text-framb">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
            <path
              d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linejoin="round"
            />
            <circle cx="12" cy="10" r="2.3" fill="currentColor" />
          </svg>
          Sob encomenda em {{ SITE.city }}/{{ SITE.state }}
        </p>

        <h1
          id="hero-titulo"
          class="mt-5 text-[clamp(2.7rem,1.55rem+4.6vw,4.85rem)] font-[650] leading-[0.98] tracking-[-0.028em]"
        >
          Doces finos e salgados para a sua festa
        </h1>
        <p class="mt-3 font-script text-[clamp(2.15rem,1.5rem+2.5vw,3.3rem)] leading-none text-framb">
          feitos à mão pela Salete
        </p>

        <p class="texto-apoio mt-7">
          Bombons, docinhos, tortinhas e salgados. Escolha na vitrine, veja quanto precisa para os convidados e
          mande o pedido pronto pelo WhatsApp.
        </p>

        <div class="mt-9 flex flex-wrap gap-3">
          <a href="#vitrine" class="btn btn-primario" @click.prevent="scrollTo('vitrine')">Montar meu pedido</a>
          <a
            :href="contactLink"
            target="_blank"
            rel="noopener"
            class="btn btn-contorno"
            @click="track('whatsapp_click', { local: 'topo' })"
          >
            <IconWhatsapp />
            Chamar no WhatsApp
          </a>
        </div>

        <p class="mt-8 max-w-[30rem] text-[15px] leading-relaxed text-caramelo">
          Casamentos, batizados, formaturas, aniversários e confraternizações.
        </p>
      </div>

      <SweetsBox />
    </div>
  </section>
</template>
