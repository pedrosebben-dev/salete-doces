<script setup lang="ts">
const order = useOrderStore()
const scrollTo = useSectionScroll()
const { y } = useWindowScroll()
const scrolled = computed(() => y.value > 8)
const menuOpen = ref(false)
const bump = ref(false)

const links = [
  { id: 'vitrine', label: 'Vitrine' },
  { id: 'calculadora', label: 'Calculadora' },
  { id: 'como-encomendar', label: 'Como encomendar' },
  { id: 'festas', label: 'Festas' },
  { id: 'duvidas', label: 'Dúvidas' },
]

function go(id: string) {
  menuOpen.value = false
  scrollTo(id)
}

watch(
  () => order.addedPulse,
  () => {
    bump.value = false
    requestAnimationFrame(() => (bump.value = true))
  },
)
</script>

<template>
  <header
    class="sticky z-40 transition-[background-color,box-shadow] duration-300"
    :class="
      scrolled || menuOpen
        ? 'bg-creme/92 shadow-[0_1px_0_rgb(74_42_38/0.12)] backdrop-blur-md'
        : 'bg-creme/0'
    "
    style="top: env(safe-area-inset-top, 0px)"
  >
    <div class="wrap flex h-[var(--header-h)] items-center justify-between gap-4">
      <a href="#inicio" class="rounded-lg" aria-label="Salete Togni, voltar ao início" @click.prevent="go('inicio')">
        <BrandLogo />
      </a>

      <nav class="hidden lg:block" aria-label="Seções do site">
        <ul class="flex items-center gap-7 text-[15px] font-semibold">
          <li v-for="link in links" :key="link.id">
            <a :href="`#${link.id}`" class="transition-colors hover:text-framb" @click.prevent="go(link.id)">
              {{ link.label }}
            </a>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-1.5">
        <button
          type="button"
          class="btn btn-contorno min-h-11 gap-2 px-4 text-[15px]"
          :aria-label="order.count ? `Meu pedido, ${order.count} ${order.count === 1 ? 'item' : 'itens'}` : 'Meu pedido'"
          @click="order.open()"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
            <path
              d="M6 8h12l-1 12H7L6 8Zm3 0V7a3 3 0 0 1 6 0v1"
              fill="none"
              stroke="currentColor"
              stroke-width="1.9"
              stroke-linejoin="round"
            />
          </svg>
          <span class="hidden sm:inline">Meu pedido</span>
          <span
            v-if="order.count"
            class="grid min-w-6 place-items-center rounded-full bg-framb px-1.5 text-[13px] font-bold leading-6 text-white"
            :class="{ pulo: bump }"
            @animationend="bump = false"
          >
            {{ order.count }}
          </span>
        </button>

        <button
          type="button"
          class="grid size-11 place-items-center rounded-full transition-colors hover:bg-cacau/8 lg:hidden"
          :aria-expanded="menuOpen"
          aria-controls="menu-celular"
          :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'"
          @click="menuOpen = !menuOpen"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
            <path
              v-if="!menuOpen"
              d="M4 7h16M4 12h16M4 17h10"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path v-else d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </div>

    <nav v-show="menuOpen" id="menu-celular" class="border-t border-cacau/10 lg:hidden" aria-label="Seções do site">
      <ul class="wrap grid py-3">
        <li v-for="link in links" :key="link.id">
          <a
            :href="`#${link.id}`"
            class="flex min-h-12 items-center text-[18px] font-semibold"
            @click.prevent="go(link.id)"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>
