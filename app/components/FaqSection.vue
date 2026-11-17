<script setup lang="ts">
import { FAQ } from '~/data/faq'
import { SITE } from '~/data/site'

const track = useTrack()
const contactLink = whatsappLink(SITE.whatsapp, SITE.defaultMessage)
</script>

<template>
  <section id="duvidas" class="py-20 md:py-28" aria-labelledby="duvidas-titulo">
    <div class="wrap grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
      <div>
        <h2 id="duvidas-titulo" class="titulo-secao">Dúvidas</h2>
        <p class="texto-apoio mt-4">Não achou o que procurava? Pergunte direto para a Salete.</p>
        <a
          :href="contactLink"
          target="_blank"
          rel="noopener"
          class="btn btn-contorno mt-7"
          @click="track('whatsapp_click', { local: 'duvidas' })"
        >
          <IconWhatsapp />
          Chamar no WhatsApp
        </a>
      </div>

      <div class="border-t border-cacau/15">
        <details v-for="item in FAQ" :key="item.question" class="group border-b border-cacau/15">
          <summary
            class="flex min-h-16 cursor-pointer items-center justify-between gap-6 py-4 text-[18px] font-semibold leading-snug md:text-[19px]"
          >
            {{ item.question }}
            <span
              class="grid size-9 shrink-0 place-items-center rounded-full bg-rosa transition-transform duration-300 group-open:rotate-45"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" focusable="false">
                <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
              </svg>
            </span>
          </summary>
          <p class="max-w-[40rem] pb-6 pr-12 text-[17px] leading-relaxed text-caramelo">{{ item.answer }}</p>
        </details>
      </div>
    </div>
  </section>
</template>
