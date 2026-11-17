<script setup lang="ts">
import type { Product } from '~/types'

const props = defineProps<{ product: Product }>()

const order = useOrderStore()
const toast = useToast()
const track = useTrack()
const quantity = computed(() => order.quantityOf(props.product.id))

function add() {
  order.add(props.product.id)
  track('add_to_order', { produto: props.product.id })
  toast.show(`${props.product.name} no pedido`)
}
</script>

<template>
  <div>
    <button
      v-if="quantity === 0"
      type="button"
      class="btn btn-contorno min-h-12 w-full gap-2 px-4 text-[15px]"
      :aria-label="`Adicionar ${product.name} ao pedido`"
      @click="add"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
        <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
      </svg>
      Adicionar
    </button>
    <QuantityStepper
      v-else
      :quantity="quantity"
      :step="product.step"
      :unit="product.unit"
      :label="product.name"
      @change="(value) => order.setQuantity(product.id, value)"
    />
  </div>
</template>
