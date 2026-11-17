import { defineStore } from 'pinia'
import { PRODUCTS_BY_ID } from '~/data/products'
import { SITE } from '~/data/site'
import type { OrderDetails, OrderLine, PartyEstimate } from '~/types'

const emptyDetails = (): OrderDetails => ({
  name: '',
  eventType: '',
  date: '',
  guests: null,
  delivery: '',
  notes: '',
})

export interface OrderSnapshot {
  items: Record<string, number>
  details: OrderDetails
  estimate: PartyEstimate | null
}

export const useOrderStore = defineStore('order', () => {
  /** product id -> quantity */
  const items = ref<Record<string, number>>({})
  const details = ref<OrderDetails>(emptyDetails())
  const estimate = ref<PartyEstimate | null>(null)
  const isOpen = ref(false)
  /** Bumps on every add, so the UI can play a small confirmation. */
  const addedPulse = ref(0)

  const lines = computed<OrderLine[]>(() =>
    Object.entries(items.value).flatMap(([id, quantity]) => {
      const product = PRODUCTS_BY_ID[id]
      return product && quantity > 0 ? [{ product, quantity }] : []
    }),
  )

  const count = computed(() => lines.value.length)

  const chosenSweets = computed(() =>
    lines.value.reduce((sum, l) => (l.product.kind === 'sweet' && l.product.unit === 'un' ? sum + l.quantity : sum), 0),
  )
  const chosenSavories = computed(() =>
    lines.value.reduce((sum, l) => (l.product.kind === 'savory' && l.product.unit === 'un' ? sum + l.quantity : sum), 0),
  )

  const message = computed(() => buildOrderMessage(lines.value, details.value, estimate.value))
  const link = computed(() => whatsappLink(SITE.whatsapp, message.value))

  function quantityOf(id: string) {
    return items.value[id] ?? 0
  }

  function add(id: string) {
    const product = PRODUCTS_BY_ID[id]
    if (!product) return
    items.value = { ...items.value, [id]: quantityOf(id) + product.step }
    addedPulse.value++
  }

  function setQuantity(id: string, quantity: number) {
    if (!PRODUCTS_BY_ID[id]) return
    if (!Number.isFinite(quantity) || quantity <= 0) return remove(id)
    items.value = { ...items.value, [id]: Math.round(quantity) }
  }

  function remove(id: string) {
    const { [id]: _removed, ...rest } = items.value
    items.value = rest
  }

  function applyEstimate(value: PartyEstimate) {
    estimate.value = value
    details.value = { ...details.value, guests: value.guests }
  }

  function clear() {
    items.value = {}
    details.value = emptyDetails()
    estimate.value = null
  }

  function open() {
    isOpen.value = true
  }
  function close() {
    isOpen.value = false
  }

  function snapshot(): OrderSnapshot {
    return { items: items.value, details: details.value, estimate: estimate.value }
  }

  function restore(data: Partial<OrderSnapshot>) {
    if (data.items && typeof data.items === 'object') {
      items.value = Object.fromEntries(
        Object.entries(data.items).filter(([id, q]) => PRODUCTS_BY_ID[id] && typeof q === 'number' && q > 0),
      )
    }
    if (data.details && typeof data.details === 'object') details.value = { ...emptyDetails(), ...data.details }
    if (data.estimate && typeof data.estimate === 'object') estimate.value = data.estimate
  }

  return {
    items,
    details,
    estimate,
    isOpen,
    addedPulse,
    lines,
    count,
    chosenSweets,
    chosenSavories,
    message,
    link,
    quantityOf,
    add,
    setQuantity,
    remove,
    applyEstimate,
    clear,
    open,
    close,
    snapshot,
    restore,
  }
})
