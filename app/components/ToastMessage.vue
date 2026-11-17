<script setup lang="ts">
const { message, id } = useToast()
</script>

<template>
  <div
    class="pointer-events-none fixed inset-x-0 z-50 flex justify-center px-4"
    style="bottom: calc(env(safe-area-inset-bottom, 0px) + 92px)"
    role="status"
    aria-live="polite"
  >
    <Transition name="aviso">
      <p
        v-if="message"
        :key="id"
        class="max-w-[24rem] rounded-full bg-cacau px-5 py-3 text-center text-[15px] font-medium text-creme shadow-[0_14px_30px_-12px_rgb(58_33_30/0.7)]"
      >
        {{ message }}
      </p>
    </Transition>
  </div>
</template>

<style scoped>
.aviso-enter-active,
.aviso-leave-active {
  transition:
    opacity 0.25s,
    transform 0.3s var(--ease-saida);
}
.aviso-enter-from,
.aviso-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
