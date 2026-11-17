<script setup lang="ts">
import { PRODUCTS_BY_ID } from '~/data/products'

const preview = useProductPreview()
const assets = useAssets()
const dialog = ref<HTMLDialogElement>()
const product = computed(() => (preview.value ? PRODUCTS_BY_ID[preview.value] : undefined))

watch(preview, (id) => {
  const el = dialog.value
  if (!el) return
  if (id && !el.open) el.showModal()
  else if (!id && el.open) el.close()
})

function close() {
  preview.value = null
}

function onClick(event: MouseEvent) {
  if (event.target === dialog.value) close()
}
</script>

<template>
  <dialog ref="dialog" class="foto-produto" aria-labelledby="foto-produto-nome" @close="close" @click="onClick">
    <div v-if="product" class="relative grid md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
      <button
        type="button"
        class="absolute right-3 top-3 z-10 grid size-11 place-items-center rounded-full bg-papel/95 shadow-sm transition-colors hover:bg-rosa md:right-5 md:top-5"
        aria-label="Fechar foto"
        @click="close"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
          <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
      <img
        v-if="product.photo"
        :src="assets.product(product.photo, 960)"
        :alt="product.name"
        width="960"
        height="1200"
        class="aspect-[4/5] max-h-[48dvh] w-full object-cover md:h-full md:max-h-none"
      />
      <div class="flex flex-col p-6 md:p-9 md:pt-20">
        <h2 id="foto-produto-nome" class="text-[28px] font-[640] leading-[1.08] tracking-[-0.015em] md:text-[32px]">
          {{ product.name }}
        </h2>
        <p class="mt-3 text-[17px] leading-relaxed text-caramelo">{{ product.description }}</p>
        <AddToOrder :product="product" class="mt-auto pt-8" />
      </div>
    </div>
  </dialog>
</template>
