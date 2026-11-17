<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const notFound = computed(() => props.error.statusCode === 404)

useSeoMeta({ title: notFound.value ? 'Página não encontrada | Salete Togni' : 'Erro | Salete Togni' })
</script>

<template>
  <main class="grid min-h-dvh place-items-center bg-creme px-6 text-center text-cacau">
    <div>
      <p class="font-script text-[56px] leading-none text-framb">Ops!</p>
      <h1 class="mt-4 text-[clamp(2rem,1.5rem+2vw,2.8rem)] font-[640] leading-tight">
        {{ notFound ? 'Essa página não existe' : 'Algo deu errado por aqui' }}
      </h1>
      <p class="mt-3 text-[18px] text-caramelo">Volte para o início para ver os doces da Salete.</p>
      <button type="button" class="btn btn-primario mt-8" @click="clearError({ redirect: '/' })">Voltar ao início</button>
    </div>
  </main>
</template>
