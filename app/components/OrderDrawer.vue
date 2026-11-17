<script setup lang="ts">
import { EVENT_TYPES } from '~/data/events'
import { SITE } from '~/data/site'
import type { Product } from '~/types'

const order = useOrderStore()
const assets = useAssets()
const track = useTrack()
const scrollTo = useSectionScroll()

const dialog = ref<HTMLDialogElement>()
const messageBox = ref<HTMLTextAreaElement>()
const minDate = ref<string>()
const sent = ref(false)
const copyStatus = ref('')

onMounted(() => {
  minDate.value = todayISO(new Date())
})

watch(
  () => order.isOpen,
  (open) => {
    const el = dialog.value
    if (!el) return
    if (open && !el.open) {
      sent.value = false
      copyStatus.value = ''
      el.showModal()
    } else if (!open && el.open) {
      el.close()
    }
  },
)

function close() {
  order.close()
}

function onClick(event: MouseEvent) {
  if (event.target === dialog.value) close()
}

function goToCatalog() {
  close()
  nextTick(() => scrollTo('vitrine'))
}

function onSend() {
  sent.value = true
  track('send_order', { itens: order.count })
}

async function copyMessage() {
  try {
    await navigator.clipboard.writeText(order.message)
    copyStatus.value = 'Mensagem copiada. É só colar no WhatsApp da Salete.'
    track('copy_message')
  } catch {
    const box = messageBox.value
    box?.closest('details')?.setAttribute('open', '')
    box?.focus()
    box?.select()
    copyStatus.value = 'Não deu para copiar sozinho. A mensagem está selecionada: copie e cole no WhatsApp.'
  }
}

function thumb(product: Product) {
  if (product.photo) return assets.product(product.photo, 480)
  if (product.closeUp) return assets.closeUp(product.closeUp, 240)
  return product.illustration ? assets.illustration(product.illustration) : ''
}

const progress = computed(() => {
  const estimate = order.estimate
  if (!estimate) return []
  return [
    { label: 'Doces', chosen: order.chosenSweets, target: estimate.sweets },
    { label: 'Salgados', chosen: order.chosenSavories, target: estimate.savories },
  ].map((row) => ({ ...row, ratio: row.target ? Math.min(1, row.chosen / row.target) : 0 }))
})
</script>

<template>
  <dialog ref="dialog" class="gaveta" aria-labelledby="pedido-titulo" @close="close" @click="onClick">
    <div
      class="painel flex h-full max-h-[94dvh] flex-col overflow-hidden rounded-t-[28px] bg-papel shadow-2xl sm:max-h-none sm:rounded-l-[28px] sm:rounded-tr-none"
    >
      <header class="papel-pautado relative shrink-0 px-6 pb-4 pt-6 sm:pt-[max(1.5rem,env(safe-area-inset-top))]">
        <p id="pedido-titulo" class="font-script text-[46px] leading-none text-framb">Encomenda</p>
        <p class="mt-2 max-w-[20rem] text-[15px] leading-snug text-caramelo">
          Revise e envie pelo WhatsApp. A Salete responde com o orçamento.
        </p>
        <button
          type="button"
          class="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-creme-2 transition-colors hover:bg-rosa sm:top-[max(1rem,env(safe-area-inset-top))]"
          aria-label="Fechar o pedido"
          @click="close"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
            <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </header>
      <div class="picote shrink-0" aria-hidden="true" />

      <div class="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-6 pt-3">
        <section aria-label="Itens do pedido">
          <ul v-if="order.lines.length" class="divide-y divide-cacau/10">
            <li v-for="line in order.lines" :key="line.product.id" class="flex gap-4 py-4">
              <img
                :src="thumb(line.product)"
                alt=""
                width="64"
                height="80"
                class="h-20 w-16 shrink-0 rounded-[12px] bg-creme-2 object-cover"
                :class="{ 'object-contain p-1': !line.product.photo && line.product.illustration }"
              />
              <div class="min-w-0 flex-1">
                <p class="font-semibold leading-tight">{{ line.product.name }}</p>
                <QuantityStepper
                  class="mt-2.5"
                  :quantity="line.quantity"
                  :step="line.product.step"
                  :unit="line.product.unit"
                  :label="line.product.name"
                  @change="(value) => order.setQuantity(line.product.id, value)"
                />
              </div>
            </li>
          </ul>
          <div v-else class="mt-2 rounded-[20px] bg-creme-2 p-5">
            <p class="font-semibold">Seu pedido ainda está vazio.</p>
            <p class="mt-1.5 text-[15px] leading-snug text-caramelo">
              Escolha os doces na vitrine, ou mande só os detalhes da festa que a Salete ajuda a montar.
            </p>
            <button type="button" class="btn btn-contorno mt-4 min-h-11" @click="goToCatalog">Ver a vitrine</button>
          </div>
        </section>

        <section v-if="order.estimate" class="mt-5 rounded-[20px] bg-rosa/70 p-4" aria-labelledby="pedido-estimativa">
          <h3 id="pedido-estimativa" class="font-sans text-[15px] font-semibold">
            Estimativa para {{ formatNumber(order.estimate.guests) }} convidados
          </h3>
          <div class="mt-3 grid gap-3">
            <div v-for="row in progress" :key="row.label">
              <div class="flex justify-between text-[14px]">
                <span>{{ row.label }}</span>
                <span class="tabular-nums">{{ formatNumber(row.chosen) }} de {{ formatNumber(row.target) }}</span>
              </div>
              <div
                class="mt-1 h-2 overflow-hidden rounded-full bg-papel"
                role="progressbar"
                :aria-label="`${row.label} escolhidos`"
                :aria-valuenow="row.chosen"
                aria-valuemin="0"
                :aria-valuemax="row.target"
              >
                <div class="h-full rounded-full bg-framb transition-[width] duration-500" :style="{ width: `${row.ratio * 100}%` }" />
              </div>
            </div>
          </div>
          <button type="button" class="mt-3 text-[14px] font-semibold underline underline-offset-4" @click="order.estimate = null">
            Tirar a estimativa
          </button>
        </section>

        <form class="mt-7 grid gap-4" aria-labelledby="pedido-festa-titulo" @submit.prevent>
          <h3 id="pedido-festa-titulo" class="text-[22px] font-[620]">Sobre a festa</h3>
          <div class="grid gap-4 min-[420px]:grid-cols-2">
            <div>
              <label for="pedido-festa" class="rotulo">Tipo de festa</label>
              <select id="pedido-festa" v-model="order.details.eventType" class="campo">
                <option value="">Escolha</option>
                <option v-for="type in EVENT_TYPES" :key="type" :value="type">{{ type }}</option>
              </select>
            </div>
            <div>
              <label for="pedido-data" class="rotulo">Data</label>
              <input id="pedido-data" v-model="order.details.date" type="date" :min="minDate" class="campo" />
            </div>
            <div>
              <label for="pedido-convidados" class="rotulo">Convidados</label>
              <input
                id="pedido-convidados"
                v-model.number="order.details.guests"
                type="number"
                min="1"
                inputmode="numeric"
                placeholder="Ex.: 80"
                class="campo"
              />
            </div>
            <div>
              <label for="pedido-nome" class="rotulo">Seu nome</label>
              <input id="pedido-nome" v-model="order.details.name" type="text" autocomplete="name" class="campo" />
            </div>
          </div>
          <fieldset>
            <legend class="rotulo">Entrega ou retirada</legend>
            <div class="flex flex-wrap gap-2">
              <label class="pilula cursor-pointer">
                <input id="pedido-retirada" v-model="order.details.delivery" type="radio" value="retirada" name="pedido-entrega" class="sr-only" />
                Retirada
              </label>
              <label class="pilula cursor-pointer">
                <input id="pedido-entrega" v-model="order.details.delivery" type="radio" value="entrega" name="pedido-entrega" class="sr-only" />
                Entrega (a combinar)
              </label>
            </div>
          </fieldset>
          <div>
            <label for="pedido-obs" class="rotulo">Observações</label>
            <textarea
              id="pedido-obs"
              v-model="order.details.notes"
              rows="3"
              class="campo resize-y"
              placeholder="Tema, cores, sabor do bolo, horário..."
            />
          </div>
        </form>

        <details class="mt-6 rounded-[20px] bg-creme-2 p-4">
          <summary class="cursor-pointer text-[15px] font-semibold">Ver a mensagem que vai para a Salete</summary>
          <textarea
            id="pedido-mensagem"
            ref="messageBox"
            readonly
            :value="order.message"
            rows="11"
            aria-label="Mensagem do pedido"
            class="mt-3 w-full resize-none rounded-xl bg-papel p-3 text-[14px] leading-relaxed"
          />
        </details>

        <button
          v-if="order.lines.length || order.estimate"
          type="button"
          class="mt-5 text-[14px] font-semibold text-caramelo underline underline-offset-4"
          @click="order.clear()"
        >
          Limpar pedido
        </button>
      </div>

      <footer
        class="shrink-0 border-t border-cacau/10 bg-papel px-6 pt-4"
        style="padding-bottom: max(1rem, env(safe-area-inset-bottom, 0px))"
      >
        <p v-if="copyStatus || sent" class="mb-3 text-[14px] leading-snug text-caramelo" role="status">
          {{ copyStatus || `Se o WhatsApp não abriu, copie a mensagem e mande para ${SITE.whatsappDisplay}.` }}
        </p>
        <div class="flex gap-2">
          <a :href="order.link" target="_blank" rel="noopener" class="btn btn-primario flex-1 px-4" @click="onSend">
            <IconWhatsapp />
            Enviar pelo WhatsApp
          </a>
          <button type="button" class="btn btn-contorno px-4" @click="copyMessage">Copiar</button>
        </div>
      </footer>
    </div>
  </dialog>
</template>
