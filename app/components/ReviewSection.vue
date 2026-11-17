<script setup lang="ts">
import { INSTAGRAM_URL, SITE } from '~/data/site'

const assets = useAssets()
const track = useTrack()
const strip = ['barquinha-morango', 'docinho-rosa', 'tortinha-frutas', 'bombons-casamento', 'mini-hamburguer', 'morango-do-amor']
</script>

<template>
  <section id="recados" class="py-20 md:py-28" aria-labelledby="recado-titulo">
    <div class="wrap grid items-center gap-14 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
      <figure class="mx-auto w-full max-w-[290px] -rotate-2">
        <div class="rounded-[32px] bg-cacau p-2 shadow-[0_34px_60px_-30px_rgb(58_33_30/0.65)]">
          <img
            :src="assets.file('fotos/recado-bombom-morango-540.webp')"
            :srcset="`${assets.file('fotos/recado-bombom-morango-540.webp')} 540w, ${assets.file('fotos/recado-bombom-morango-1080.webp')} 1080w`"
            sizes="290px"
            alt="Story com o bombom de morango cortado ao meio e o recado de uma cliente: Delicioso!"
            width="540"
            height="959"
            loading="lazy"
            decoding="async"
            class="aspect-[9/16] w-full rounded-[25px] object-cover"
          />
        </div>
        <figcaption class="mt-4 text-center text-[14px] text-caramelo">Story publicado no @{{ SITE.instagram }}</figcaption>
      </figure>

      <div>
        <h2 id="recado-titulo" class="titulo-secao">Recado de quem provou</h2>
        <blockquote class="mt-8">
          <p class="font-display text-[clamp(3.2rem,2rem+4.4vw,5.4rem)] font-[600] leading-none tracking-[-0.03em] text-framb">
            “Delicioso!”
          </p>
        </blockquote>
        <p class="mt-5 max-w-[30rem] text-[18px] leading-relaxed text-caramelo">
          Foi o que uma cliente mandou depois de provar o bombom de morango.
        </p>

        <div class="mt-12">
          <p class="font-semibold">Veja mais fotos e os bastidores no Instagram.</p>
          <ul class="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6">
            <li v-for="slug in strip" :key="slug">
              <a
                :href="INSTAGRAM_URL"
                target="_blank"
                rel="noopener"
                class="group block overflow-hidden rounded-[14px]"
                :aria-label="`Abrir o Instagram @${SITE.instagram}`"
              >
                <img
                  :src="assets.closeUp(slug, 240)"
                  :srcset="assets.closeUpSrcset(slug)"
                  sizes="(min-width: 640px) 110px, 30vw"
                  alt=""
                  width="240"
                  height="240"
                  loading="lazy"
                  decoding="async"
                  class="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </a>
            </li>
          </ul>
          <a
            :href="INSTAGRAM_URL"
            target="_blank"
            rel="noopener"
            class="btn btn-contorno mt-6"
            @click="track('instagram_click', { local: 'recados' })"
          >
            <IconInstagram />
            Seguir @{{ SITE.instagram }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
