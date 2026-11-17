import type { MonthDay } from '~/types'

export const SITE = {
  name: 'Salete Togni',
  fullName: 'Salete Togni Doces & Salgados',
  tagline: 'Doces finos e salgados sob encomenda',
  city: 'Encantado',
  state: 'RS',
  /** Only digits, with country and area code (wa.me format). */
  whatsapp: '5551982544320',
  whatsappDisplay: '(51) 98254-4320',
  instagram: 'salete_togni',
  defaultMessage: 'Oi, Salete! Vim pelo site e quero fazer uma encomenda.',
  credit: 'Site feito com carinho pelo filho, Pedro Sebben.',
  /** The Christmas section shows up between these dates (Brasília time). */
  christmas: {
    start: { month: 10, day: 1 } satisfies MonthDay,
    end: { month: 12, day: 24 } satisfies MonthDay,
  },
} as const

export const INSTAGRAM_URL = `https://www.instagram.com/${SITE.instagram}/`
