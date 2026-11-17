<script setup lang="ts">
import type { Unit } from '~/types'

const props = defineProps<{ quantity: number; step: number; unit: Unit; label: string; compact?: boolean }>()
const emit = defineEmits<{ change: [quantity: number] }>()

const text = computed(() => formatQuantity(props.quantity, props.unit))
const centos = computed(() => (props.unit === 'un' ? centosLabel(props.quantity) : null))
const removes = computed(() => props.quantity - props.step <= 0)
</script>

<template>
  <div
    class="flex min-h-12 items-center justify-between gap-1 rounded-full bg-cacau p-1 text-creme"
    role="group"
    :aria-label="`Quantidade de ${label}`"
  >
    <button
      type="button"
      class="grid size-10 shrink-0 place-items-center rounded-full transition-colors hover:bg-white/12"
      :aria-label="removes ? `Tirar ${label} do pedido` : `Diminuir ${label}`"
      @click="emit('change', quantity - step)"
    >
      <svg v-if="removes" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
        <path
          d="M5 7h14M10 7V5h4v2m-7 0 1 12h8l1-12"
          fill="none"
          stroke="currentColor"
          stroke-width="1.9"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg v-else viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
        <path d="M5 12h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
      </svg>
    </button>

    <span class="min-w-0 flex-1 text-center leading-tight" aria-live="polite">
      <span class="block text-[15px] font-semibold tabular-nums">{{ text }}</span>
      <span v-if="centos && !compact" class="block text-[12px] text-rosa">{{ centos }}</span>
    </span>

    <button
      type="button"
      class="grid size-10 shrink-0 place-items-center rounded-full transition-colors hover:bg-white/12"
      :aria-label="`Aumentar ${label}`"
      @click="emit('change', quantity + step)"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
        <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
      </svg>
    </button>
  </div>
</template>
