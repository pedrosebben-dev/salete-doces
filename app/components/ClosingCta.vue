<script setup lang="ts">
import { SITE } from '~/data/site'

const order = useOrderStore()
const toast = useToast()
const track = useTrack()
const contactLink = whatsappLink(SITE.whatsapp, SITE.defaultMessage)

async function copyNumber() {
  try {
    await navigator.clipboard.writeText(SITE.whatsappDisplay)
    toast.show('Número copiado')
  } catch {
    toast.show('Selecione o número para copiar')
  }
}
</script>

<template>
  <section class="relative mt-8 bg-cacau text-creme" aria-labelledby="final-titulo">
    <ScallopEdge color="#4A2A26" side="top" />
    <div class="wrap grid gap-10 py-20 md:py-24 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center">
      <div>
        <h2 id="final-titulo" class="titulo-secao">Vamos adoçar a sua festa?</h2>
        <p class="mt-5 max-w-[32rem] text-[18px] leading-relaxed text-creme/80">
          Mande o pedido pelo WhatsApp ou tire suas dúvidas direto com a Salete.
        </p>
      </div>

      <div class="flex flex-col items-start gap-5 lg:items-end">
        <button v-if="order.count" type="button" class="btn btn-primario" @click="order.open()">
          Revisar e enviar meu pedido
        </button>
        <a
          v-else
          :href="contactLink"
          target="_blank"
          rel="noopener"
          class="btn btn-primario"
          @click="track('whatsapp_click', { local: 'final' })"
        >
          <IconWhatsapp />
          Chamar no WhatsApp
        </a>
        <p class="flex flex-wrap items-center gap-x-3 gap-y-1 text-[16px] text-creme/80">
          WhatsApp
          <span class="select-all font-semibold text-creme tabular-nums">{{ SITE.whatsappDisplay }}</span>
          <button
            type="button"
            class="rounded-full px-2.5 py-1 text-[14px] font-semibold text-rosa underline underline-offset-4 hover:text-creme"
            @click="copyNumber"
          >
            Copiar
          </button>
        </p>
      </div>
    </div>
  </section>
</template>
