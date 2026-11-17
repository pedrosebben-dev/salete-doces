<script setup lang="ts">
import { FORMINHA_EDGE, FORMINHA_PLEATS } from '~/utils/shapes'

/** A photo sitting in a scalloped paper candy cup, the brand's signature shape. */
withDefaults(
  defineProps<{
    src: string
    alt: string
    srcset?: string
    sizes?: string
    paper?: string
    pleat?: string
    eager?: boolean
  }>(),
  {
    srcset: undefined,
    sizes: '160px',
    paper: '#F4C9CB',
    pleat: 'rgb(74 42 38 / 0.2)',
    eager: false,
  },
)
</script>

<template>
  <span class="relative block aspect-square w-full">
    <svg
      viewBox="-2 -2 104 104"
      class="absolute inset-0 size-full drop-shadow-[0_3px_4px_rgb(0_0_0/0.25)]"
      aria-hidden="true"
      focusable="false"
    >
      <path :d="FORMINHA_EDGE" :fill="paper" />
      <path :d="FORMINHA_PLEATS" fill="none" :stroke="pleat" stroke-width="0.9" stroke-linecap="round" />
    </svg>
    <img
      :src
      :srcset
      :sizes
      :alt
      :loading="eager ? 'eager' : 'lazy'"
      decoding="async"
      width="240"
      height="240"
      class="absolute left-[14.4%] top-[14.4%] size-[71.2%] rounded-full object-cover shadow-[0_2px_6px_rgb(58_33_30/0.35)]"
    />
  </span>
</template>
