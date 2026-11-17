<script setup lang="ts">
import { SITE } from '~/data/site'

/** Floating action: WhatsApp while the order is empty, "Ver pedido" once something is in it. */
const order = useOrderStore()
const track = useTrack()
const contactLink = whatsappLink(SITE.whatsapp, SITE.defaultMessage)
const bump = ref(false)

// The hero already has a WhatsApp button, so the floating one waits until the visitor scrolls.
const { y } = useWindowScroll()
const showContact = computed(() => y.value > 560)

watch(
  () => order.addedPulse,
  () => {
    bump.value = false
    requestAnimationFrame(() => (bump.value = true))
  },
)
</script>

<template>
  <div
    class="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-end"
    style="
      padding-left: max(16px, env(safe-area-inset-left, 0px));
      padding-right: max(16px, env(safe-area-inset-right, 0px));
      padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 16px);
    "
  >
    <Transition name="flutuante" mode="out-in">
      <button
        v-if="order.count"
        key="pedido"
        type="button"
        class="btn btn-primario pointer-events-auto w-full gap-3 shadow-[0_18px_36px_-14px_rgb(150_47_76/0.85)] sm:w-auto"
        @click="order.open()"
      >
        Ver pedido
        <span
          class="grid min-w-7 place-items-center rounded-full bg-white px-2 text-[14px] font-bold leading-7 text-framb"
          :class="{ pulo: bump }"
          @animationend="bump = false"
        >
          {{ order.count }}
        </span>
      </button>
      <a
        v-else-if="showContact"
        key="whatsapp"
        :href="contactLink"
        target="_blank"
        rel="noopener"
        class="pointer-events-auto grid size-15 place-items-center rounded-full bg-framb text-white shadow-[0_16px_32px_-12px_rgb(150_47_76/0.9)] transition-colors hover:bg-framb-2"
        aria-label="Chamar a Salete no WhatsApp"
        @click="track('whatsapp_click', { local: 'botao-flutuante' })"
      >
        <IconWhatsapp class="size-7" />
      </a>
    </Transition>
  </div>
</template>

<style scoped>
.flutuante-enter-active,
.flutuante-leave-active {
  transition:
    opacity 0.2s,
    transform 0.25s var(--ease-saida);
}
.flutuante-enter-from,
.flutuante-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.96);
}
</style>
