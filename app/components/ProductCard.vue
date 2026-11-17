<script setup lang="ts">
import type { Product } from '~/types'

withDefaults(defineProps<{ product: Product; featured?: boolean }>(), { featured: false })

const assets = useAssets()
const preview = useProductPreview()
const { highlighted } = useCatalog()
</script>

<template>
  <article :id="`produto-${product.id}`" class="flex h-full flex-col">
    <button
      type="button"
      class="group relative block overflow-hidden rounded-[20px] bg-creme-2"
      :class="[{ destacado: highlighted === product.id }, featured ? 'md:min-h-0 md:flex-1' : '']"
      @click="preview = product.id"
    >
      <img
        v-if="product.photo"
        :src="assets.product(product.photo, featured ? 960 : 480)"
        :srcset="assets.productSrcset(product.photo)"
        :sizes="featured ? '(min-width: 1024px) 560px, (min-width: 768px) 64vw, 92vw' : '(min-width: 1024px) 270px, (min-width: 768px) 30vw, 46vw'"
        :alt="product.name"
        width="480"
        height="600"
        loading="lazy"
        decoding="async"
        class="aspect-[4/5] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        :class="{ 'md:absolute md:inset-0 md:aspect-auto md:h-full': featured }"
      />
      <span
        v-if="featured && product.highlight"
        class="absolute left-3 top-3 rounded-full bg-papel/95 px-3.5 py-1.5 text-[14px] font-semibold text-framb shadow-sm md:left-4 md:top-4"
      >
        {{ product.highlight }}
      </span>
      <span class="sr-only">, ver foto maior</span>
    </button>
    <h3
      class="mt-4 font-[620] leading-[1.15]"
      :class="featured ? 'text-[22px] md:text-[26px]' : 'text-[18px] md:text-[20px]'"
    >
      {{ product.name }}
    </h3>
    <p class="mt-1.5 text-[15px] leading-snug text-caramelo">{{ product.description }}</p>
    <AddToOrder :product="product" class="mt-auto pt-4" :class="{ 'md:max-w-[18rem]': featured }" />
  </article>
</template>
