<script setup lang="ts">
import { BADGE_PATH, HEART_PATH } from '~/utils/shapes'

withDefaults(defineProps<{ tone?: 'dark' | 'light' }>(), { tone: 'dark' })
</script>

<template>
  <span class="inline-flex items-center gap-2.5">
    <svg viewBox="-4 -4 108 108" class="size-10 shrink-0 md:size-11" aria-hidden="true" focusable="false">
      <path :d="BADGE_PATH" fill="#F4C9CB" stroke="#4A2A26" stroke-width="4.5" stroke-linejoin="round" />
      <path :d="HEART_PATH" fill="#B23A5B" transform="translate(26 25.6) scale(2)" />
    </svg>
    <span class="flex flex-col leading-none">
      <span class="font-script text-[27px] md:text-[30px]" :class="tone === 'light' ? 'text-creme' : 'text-cacau'">
        Salete Togni
      </span>
      <span
        class="mt-0.5 text-[10.5px] font-bold tracking-[0.18em]"
        :class="tone === 'light' ? 'text-rosa' : 'text-framb'"
      >
        DOCES &amp; SALGADOS
      </span>
    </span>
  </span>
</template>
