<script setup lang="ts">
import { CATALOG, CATEGORIES } from '~/data/products'

const { filter } = useCatalog()
const visible = computed(() =>
  filter.value === 'todos' ? CATALOG : CATALOG.filter((product) => product.category === filter.value),
)
// The first sweet gets a bigger card in the full catalog (it also keeps the grid rows complete).
const featuredId = computed(() => (filter.value === 'todos' ? CATALOG[0]?.id : undefined))
</script>

<template>
  <section id="vitrine" class="py-20 md:py-28" aria-labelledby="vitrine-titulo">
    <div class="wrap">
      <div class="grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <h2 id="vitrine-titulo" class="titulo-secao">Vitrine da Salete</h2>
          <p class="texto-apoio mt-4">
            Toque em “Adicionar” nos doces e salgados que você quer. As quantidades sobem de 50 em 50 (meio
            cento) e a Salete confirma tudo com você.
          </p>
        </div>
        <div class="filtros min-w-0 overflow-x-auto pb-1">
          <div role="group" aria-label="Filtrar a vitrine" class="flex w-max gap-2 pr-6 lg:pr-0">
            <button
              v-for="category in CATEGORIES"
              :key="category.id"
              type="button"
              class="pilula"
              :aria-pressed="filter === category.id"
              @click="filter = category.id"
            >
              {{ category.label }}
            </button>
          </div>
        </div>
      </div>

      <TransitionGroup
        tag="ul"
        name="grade"
        class="relative mt-10 grid grid-cols-2 gap-x-4 gap-y-11 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4"
      >
        <li
          v-for="product in visible"
          :key="product.id"
          :class="{ 'col-span-2 md:row-span-2': product.id === featuredId }"
        >
          <ProductCard :product="product" :featured="product.id === featuredId" />
        </li>
      </TransitionGroup>
    </div>
  </section>
</template>

<style scoped>
@media (max-width: 1023px) {
  .filtros {
    mask-image: linear-gradient(to right, #000 82%, transparent);
    scrollbar-width: none;
  }
  .filtros::-webkit-scrollbar {
    display: none;
  }
}
</style>
