<script setup lang="ts">
import { BOX_SELECTION, PRODUCTS_BY_ID } from '~/data/products'
import { BADGE_PATH } from '~/utils/shapes'

/** The hero: a box of real sweets from Salete's stories, each one sitting in its forminha. */
const assets = useAssets()
const scrollTo = useSectionScroll()
const { filter, highlighted } = useCatalog()

const turns = [-7, 4, -3, 6, -5, 3, -4, 7, -2]
const cells = BOX_SELECTION.flatMap((id, index) => {
  const product = PRODUCTS_BY_ID[id]
  const slug = product?.closeUp
  return product && slug ? [{ id, name: product.name, slug, turn: turns[index] ?? 0 }] : []
})

const hovered = ref<string | null>(null)
const caption = computed(() => cells.find((cell) => cell.id === hovered.value)?.name ?? null)

async function show(id: string) {
  filter.value = 'todos'
  highlighted.value = id
  await nextTick()
  scrollTo(`produto-${id}`, 'center')
  setTimeout(() => {
    if (highlighted.value === id) highlighted.value = null
  }, 1800)
}
</script>

<template>
  <figure class="relative mx-auto w-full max-w-[540px]">
    <svg
      viewBox="-4 -4 108 108"
      class="pointer-events-none absolute left-1/2 top-[47%] w-[126%] max-w-none -translate-x-1/2 -translate-y-1/2"
      aria-hidden="true"
      focusable="false"
    >
      <path :d="BADGE_PATH" fill="#F4C9CB" opacity="0.7" />
    </svg>

    <div class="bandeja relative rounded-[30px] p-[6%]">
      <ul class="grid grid-cols-3 gap-[4%]" aria-label="Alguns doces da Salete">
        <li v-for="(cell, index) in cells" :key="cell.id" class="cavidade relative rounded-full">
          <button
            type="button"
            class="relative block w-full rounded-full"
            :style="{ '--i': index, '--giro': `${cell.turn}deg` }"
            @click="show(cell.id)"
            @mouseenter="hovered = cell.id"
            @mouseleave="hovered = null"
            @focus="hovered = cell.id"
            @blur="hovered = null"
          >
            <span class="forminha-assentada block">
              <Forminha
                :src="assets.closeUp(cell.slug, 240)"
                :srcset="assets.closeUpSrcset(cell.slug)"
                sizes="(min-width: 1024px) 150px, 28vw"
                alt=""
                eager
              />
            </span>
            <span class="sr-only">Ver {{ cell.name }} na vitrine</span>
          </button>
        </li>
      </ul>
    </div>

    <div class="absolute -right-1 -top-8 z-10 rotate-[8deg] sm:-right-6 sm:-top-9" aria-hidden="true">
      <div class="relative rounded-[12px] bg-papel px-4 pb-3 pt-5 text-center shadow-[0_10px_22px_-10px_rgb(58_33_30/0.55)]">
        <span class="absolute left-1/2 top-2 size-2 -translate-x-1/2 rounded-full bg-creme-2 ring-1 ring-cacau/25" />
        <span class="block font-script text-[23px] leading-[0.95] text-framb">feito à mão</span>
        <span class="block font-script text-[23px] leading-[0.95] text-cacau">pela Salete</span>
      </div>
    </div>

    <figcaption class="relative mt-6 min-h-[1.6em] text-center text-[15px] text-caramelo">
      <span v-if="caption" class="font-semibold text-cacau">{{ caption }}</span>
      <span v-else>Toque num doce para ver na vitrine.</span>
    </figcaption>
  </figure>
</template>
