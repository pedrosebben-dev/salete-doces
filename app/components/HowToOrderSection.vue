<script setup lang="ts">
import { FORMINHA_EDGE } from '~/utils/shapes'

const steps = [
  {
    title: 'Monte o pedido',
    text: 'Escolha os doces e salgados aqui na vitrine, ou chame direto no WhatsApp.',
  },
  {
    title: 'Mande pelo WhatsApp',
    text: 'A mensagem já vai pronta, com sabores, quantidades e a data da festa.',
  },
  {
    title: 'Combine os detalhes',
    text: 'Retirada ou entrega e a forma de pagamento, direto com a Salete.',
  },
  {
    title: 'É só aproveitar',
    text: 'Tudo feito à mão, fresquinho, do jeitinho que você pediu.',
  },
]
</script>

<template>
  <section id="como-encomendar" class="py-20 md:py-28" aria-labelledby="como-titulo">
    <div class="wrap">
      <h2 id="como-titulo" class="titulo-secao">Como encomendar</h2>

      <ol class="mt-12 grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-8">
        <li
          v-for="(step, index) in steps"
          :key="step.title"
          class="grid grid-cols-[56px_minmax(0,1fr)] gap-x-4 sm:block"
        >
          <span class="relative row-span-2 grid size-14 place-items-center sm:size-[68px]">
            <svg viewBox="-2 -2 104 104" class="absolute inset-0 size-full" aria-hidden="true" focusable="false">
              <path :d="FORMINHA_EDGE" fill="#F4C9CB" />
            </svg>
            <span class="relative font-display text-[24px] font-[650] leading-none sm:text-[28px]">{{ index + 1 }}</span>
          </span>
          <h3 class="self-end text-[21px] font-[620] leading-tight sm:mt-5 sm:text-[22px]">{{ step.title }}</h3>
          <p class="mt-1.5 max-w-[22rem] text-[16px] leading-relaxed text-caramelo sm:mt-2">{{ step.text }}</p>
        </li>
      </ol>

      <p class="mt-14 flex max-w-[44rem] items-start gap-3 rounded-[18px] bg-creme-2 px-5 py-4 text-[16px] leading-snug">
        <svg viewBox="0 0 24 24" width="22" height="22" class="mt-px shrink-0 text-framb" aria-hidden="true" focusable="false">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="currentColor"
          />
        </svg>
        Encomende com antecedência: a agenda é limitada, principalmente em dezembro.
      </p>
    </div>
  </section>
</template>
