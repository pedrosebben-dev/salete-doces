<script setup lang="ts">
/** Scalloped band edge, like the rim of a paper doily. Sits outside its (relative) parent. */
const props = withDefaults(defineProps<{ color: string; side?: 'top' | 'bottom'; size?: number }>(), {
  side: 'top',
  size: 28,
})

const patternId = `recorte-${useId().replace(/[^\w-]/g, '')}`
const half = computed(() => props.size / 2)
const path = computed(() => `M0 ${half.value} Q${half.value} ${-half.value + 2} ${props.size} ${half.value} Z`)
</script>

<template>
  <svg
    class="pointer-events-none absolute left-0 block w-full"
    :class="side === 'top' ? 'bottom-[calc(100%-1px)]' : 'top-[calc(100%-1px)] rotate-180'"
    :height="half"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <pattern :id="patternId" :width="size" :height="half" patternUnits="userSpaceOnUse">
        <path :d="path" :fill="color" />
      </pattern>
    </defs>
    <rect width="100%" :height="half" :fill="`url(#${patternId})`" />
  </svg>
</template>
