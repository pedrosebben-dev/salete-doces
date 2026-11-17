<script setup lang="ts">
import { CHRISTMAS_PRODUCTS } from '~/data/products'
import { SITE } from '~/data/site'

const assets = useAssets()

// Computed at build time for the static HTML, then refreshed in the visitor's browser,
// so the section hides itself after Christmas Eve even without a new deploy.
const active = useState('natal-ativo', () => isChristmasSeason(new Date(), SITE.christmas))
const days = useState('natal-dias', () => daysUntilChristmas(new Date()))
const year = useState('natal-ano', () => dateInTimeZone(new Date()).year)

onMounted(() => {
  const now = new Date()
  active.value = isChristmasSeason(now, SITE.christmas)
  days.value = daysUntilChristmas(now)
  year.value = dateInTimeZone(now).year
})
</script>

<template>
  <section v-if="active" id="natal" class="relative mt-4 bg-verde text-creme" aria-labelledby="natal-titulo">
    <ScallopEdge color="#2F5A4C" side="top" />

    <div
      class="wrap grid gap-12 py-16 md:py-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14"
    >
      <div>
        <p class="flex items-center gap-3 text-[16px] font-semibold text-ouro">
          <img :src="assets.illustration('azevinho-claro.svg')" alt="" class="h-7 w-auto" width="140" height="70" />
          Natal {{ year }}
        </p>
        <h2 id="natal-titulo" class="titulo-secao mt-4">Encomendas de Natal abertas</h2>
        <p class="mt-5 max-w-[30rem] text-[18px] leading-relaxed text-creme/85">
          Panetones, chocotones e bombons para presentear, feitos à mão pela Salete. As vagas de Natal são
          limitadas, então garanta o seu com antecedência.
        </p>

        <p class="mt-10 flex items-end gap-4">
          <template v-if="days > 0">
            <span
              class="font-display text-[clamp(4.6rem,3rem+5vw,6.6rem)] font-[600] leading-[0.78] tracking-[-0.03em] text-ouro tabular-nums"
            >
              {{ days }}
            </span>
            <span class="text-[18px] font-medium leading-tight">
              {{ days === 1 ? 'dia para o Natal' : 'dias para o Natal' }}
            </span>
          </template>
          <span v-else class="font-display text-[56px] font-[600] leading-none text-ouro">É Natal!</span>
        </p>
      </div>

      <ul class="grid gap-3 sm:grid-cols-3 sm:gap-4">
        <li
          v-for="product in CHRISTMAS_PRODUCTS"
          :key="product.id"
          class="grid grid-cols-[84px_minmax(0,1fr)] gap-x-4 rounded-[22px] bg-creme p-4 text-cacau sm:flex sm:flex-col sm:rounded-[24px] sm:p-5"
        >
          <div class="row-span-3 flex items-center justify-center sm:h-36">
            <img
              v-if="product.illustration"
              :src="assets.illustration(product.illustration)"
              :alt="`Ilustração de ${product.name.toLowerCase()}`"
              class="h-auto w-full sm:h-full sm:w-auto"
              width="400"
              height="420"
              loading="lazy"
            />
            <span v-else-if="product.closeUp" class="block w-full sm:w-32">
              <Forminha
                :src="assets.closeUp(product.closeUp, 240)"
                :srcset="assets.closeUpSrcset(product.closeUp)"
                sizes="128px"
                :alt="product.name"
              />
            </span>
          </div>
          <h3 class="text-[20px] font-[620] leading-tight sm:mt-4 sm:text-[21px]">{{ product.name }}</h3>
          <p class="mt-1 text-[15px] leading-snug text-caramelo sm:mt-1.5">{{ product.description }}</p>
          <AddToOrder :product="product" class="mt-3 sm:mt-auto sm:pt-5" />
        </li>
      </ul>
    </div>

    <ScallopEdge color="#2F5A4C" side="bottom" />
  </section>
</template>
