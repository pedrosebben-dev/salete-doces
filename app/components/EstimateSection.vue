<script setup lang="ts">
import { TransitionPresets, usePreferredReducedMotion, useTransition } from '@vueuse/core'

const order = useOrderStore()
const toast = useToast()
const track = useTrack()
const scrollTo = useSectionScroll()

const guests = ref<number | ''>(80)
const withMeal = ref(false)

const people = computed(() => {
  const value = Number(guests.value)
  return Number.isFinite(value) ? Math.min(2000, Math.max(0, Math.round(value))) : 0
})
const result = computed(() => estimateParty(people.value, withMeal.value))

const motion = usePreferredReducedMotion()
const options = {
  duration: 450,
  transition: TransitionPresets.easeOutCubic,
  disabled: computed(() => motion.value === 'reduce'),
}
const sweets = useTransition(() => result.value.sweets, options)
const savories = useTransition(() => result.value.savories, options)

function useInOrder() {
  if (!people.value) return
  order.applyEstimate({ guests: people.value, withMeal: withMeal.value, ...result.value })
  track('use_estimate', { convidados: people.value })
  toast.show('Estimativa salva no pedido. Agora escolha os sabores.')
  scrollTo('vitrine')
}
</script>

<template>
  <section id="calculadora" class="bg-rosa py-20 md:py-28" aria-labelledby="calculadora-titulo">
    <div class="wrap grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16">
      <div>
        <h2 id="calculadora-titulo" class="titulo-secao">Quantos doces e salgados eu preciso?</h2>
        <p class="texto-apoio mt-4 text-cacau/80">
          Coloque o número de convidados e veja uma estimativa para começar o pedido.
        </p>

        <div class="mt-10 grid gap-8">
          <div>
            <label for="calculadora-convidados" class="rotulo">Convidados</label>
            <div class="flex items-center gap-4">
              <input
                id="calculadora-faixa"
                v-model.number="guests"
                type="range"
                min="10"
                max="300"
                step="5"
                class="h-2 min-w-0 flex-1 cursor-pointer"
                aria-label="Convidados, controle deslizante"
              />
              <input
                id="calculadora-convidados"
                v-model.number="guests"
                type="number"
                min="1"
                max="2000"
                inputmode="numeric"
                class="campo w-24 text-center tabular-nums"
              />
            </div>
          </div>

          <fieldset>
            <legend class="rotulo">Vai ter almoço ou jantar?</legend>
            <div class="flex flex-wrap gap-2">
              <label class="pilula cursor-pointer">
                <input id="calculadora-refeicao-nao" v-model="withMeal" type="radio" :value="false" name="calculadora-refeicao" class="sr-only" />
                Não
              </label>
              <label class="pilula cursor-pointer">
                <input id="calculadora-refeicao-sim" v-model="withMeal" type="radio" :value="true" name="calculadora-refeicao" class="sr-only" />
                Sim
              </label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="papel-pautado relative overflow-hidden rounded-[26px] px-6 pb-8 shadow-[0_34px_60px_-36px_rgb(74_42_38/0.65)] sm:px-9">
        <div class="picote -mx-6 mb-5 sm:-mx-9" aria-hidden="true" />
        <p class="font-script text-[clamp(2rem,1.6rem+1.4vw,2.6rem)] leading-none text-framb">
          Para {{ formatNumber(people) }} {{ people === 1 ? 'convidado' : 'convidados' }}
        </p>

        <dl class="mt-7 grid grid-cols-2 gap-6" aria-live="polite">
          <div>
            <dt class="text-[15px] font-semibold">Doces</dt>
            <dd class="mt-1.5 font-display text-[clamp(2.6rem,2rem+2.2vw,3.6rem)] font-[600] leading-none tabular-nums">
              {{ formatNumber(Math.round(sweets)) }}
            </dd>
            <dd class="mt-1.5 text-[14px] text-caramelo">{{ centosLabel(result.sweets) ?? 'Escolha os convidados' }}</dd>
          </div>
          <div>
            <dt class="text-[15px] font-semibold">Salgados</dt>
            <dd class="mt-1.5 font-display text-[clamp(2.6rem,2rem+2.2vw,3.6rem)] font-[600] leading-none tabular-nums">
              {{ formatNumber(Math.round(savories)) }}
            </dd>
            <dd class="mt-1.5 text-[14px] text-caramelo">{{ centosLabel(result.savories) ?? 'Escolha os convidados' }}</dd>
          </div>
        </dl>

        <p class="mt-7 text-[14px] leading-snug text-caramelo">
          Conta usada em festas: {{ DEFAULT_RULES.sweetsPerGuest }} doces por convidado e
          {{ withMeal ? DEFAULT_RULES.savoriesPerGuestWithMeal : DEFAULT_RULES.savoriesPerGuest }} salgados
          {{ withMeal ? 'quando tem refeição' : 'quando não tem refeição' }}. A Salete ajusta tudo com você.
        </p>
        <button type="button" class="btn btn-primario mt-6 w-full sm:w-auto" :disabled="!people" @click="useInOrder">
          Usar no meu pedido
        </button>
      </div>
    </div>
  </section>
</template>
