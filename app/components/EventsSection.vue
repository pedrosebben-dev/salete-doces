<script setup lang="ts">
import { EVENTS } from '~/data/events'

const assets = useAssets()
const order = useOrderStore()

function orderFor(type: string) {
  order.details = { ...order.details, eventType: type }
  order.open()
}
</script>

<template>
  <section id="festas" class="bg-creme-2 py-20 md:py-28" aria-labelledby="festas-titulo">
    <div class="wrap grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-16">
      <div class="lg:sticky lg:top-28">
        <h2 id="festas-titulo" class="titulo-secao">Uma mesa para cada festa</h2>
        <p class="texto-apoio mt-4">
          Do bombom personalizado do casamento ao mini hambúrguer da confraternização da firma.
        </p>
        <img
          :src="assets.file('fotos/mesa-de-doces-1080.webp')"
          :srcset="`${assets.file('fotos/mesa-de-doces-640.webp')} 640w, ${assets.file('fotos/mesa-de-doces-1080.webp')} 1080w`"
          sizes="(min-width: 1024px) 440px, 100vw"
          alt="Mesa de festa com doces, salgados e arranjo de flores"
          width="1080"
          height="1440"
          loading="lazy"
          decoding="async"
          class="mt-9 aspect-[3/4] w-full max-w-[520px] rounded-[26px] object-cover"
        />
      </div>

      <ul class="border-t border-cacau/15">
        <li
          v-for="event in EVENTS"
          :key="event.type"
          class="grid grid-cols-[84px_minmax(0,1fr)] items-center gap-x-5 gap-y-4 border-b border-cacau/15 py-6 sm:grid-cols-[104px_minmax(0,1fr)_auto]"
        >
          <img
            :src="assets.product(event.photo, 480)"
            alt=""
            width="480"
            height="600"
            loading="lazy"
            decoding="async"
            class="aspect-[4/5] w-full rounded-[16px] object-cover"
          />
          <div class="min-w-0">
            <h3 class="text-[23px] font-[620] leading-tight">{{ event.title }}</h3>
            <p class="mt-1.5 text-[16px] leading-snug text-caramelo">{{ event.text }}</p>
          </div>
          <button
            type="button"
            class="btn btn-contorno col-span-2 min-h-12 sm:col-span-1"
            :aria-label="`Encomendar para ${event.title.toLowerCase()}`"
            @click="orderFor(event.type)"
          >
            Encomendar
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>
