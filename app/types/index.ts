export type CategoryId = 'bombons' | 'docinhos' | 'tortinhas' | 'salgados' | 'natal'

/** Used by the party calculator to compare what was chosen with the estimate. */
export type ItemKind = 'sweet' | 'savory' | 'other'

/** `un` = sold by units (shown in centos); `bolo` and `caixa` are counted one by one. */
export type Unit = 'un' | 'bolo' | 'caixa'

export interface Product {
  id: string
  name: string
  category: CategoryId
  description: string
  /** File name in /public/fotos/produtos (without the -480.webp suffix). */
  photo?: string
  /** Close-up in /public/fotos/close, used in the hero box and the Instagram strip. */
  closeUp?: string
  /** SVG in /public/ilustracoes, used when there is no photo yet. */
  illustration?: string
  kind: ItemKind
  unit: Unit
  /** How much each tap on "+" adds. */
  step: number
  /** Short real-world note shown on the featured card (e.g. a client's message). */
  highlight?: string
}

export type Delivery = '' | 'retirada' | 'entrega'

export interface OrderDetails {
  name: string
  eventType: string
  /** ISO date (YYYY-MM-DD) from the date input. */
  date: string
  guests: number | null
  delivery: Delivery
  notes: string
}

export interface PartyEstimate {
  guests: number
  withMeal: boolean
  sweets: number
  savories: number
}

export interface OrderLine {
  product: Product
  quantity: number
}

export interface MonthDay {
  month: number
  day: number
}
