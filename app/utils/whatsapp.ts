import type { OrderDetails, OrderLine, PartyEstimate } from '~/types'
import { centosLabel, formatNumber, formatQuantity } from './quantity'

/** "2026-12-12" -> "sábado, 12/12/2026" */
export function formatDateBR(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number)
  if (!year || !month || !day) return iso
  const date = new Date(Date.UTC(year, month - 1, day, 12))
  const weekday = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', timeZone: 'UTC' }).format(date)
  return `${weekday}, ${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`
}

const DELIVERY_LABEL = { retirada: 'Retirada', entrega: 'Entrega (a combinar)' } as const

/** The message that lands in Salete's WhatsApp. Uses WhatsApp *bold* markup. */
export function buildOrderMessage(lines: OrderLine[], details: OrderDetails, estimate?: PartyEstimate | null): string {
  const out: string[] = ['Oi, Salete! Vim pelo site e quero fazer uma encomenda 😊']

  if (lines.length) {
    out.push('', '*Pedido*')
    for (const { product, quantity } of lines) {
      const centos = product.unit === 'un' ? centosLabel(quantity) : null
      out.push(`• ${product.name}: ${formatQuantity(quantity, product.unit)}${centos ? ` (${centos})` : ''}`)
    }
  }

  const info: string[] = []
  if (details.eventType) info.push(`*Festa:* ${details.eventType}`)
  if (details.date) info.push(`*Data:* ${formatDateBR(details.date)}`)
  if (details.guests) info.push(`*Convidados:* ${formatNumber(details.guests)}`)
  if (details.delivery) info.push(`*Entrega ou retirada:* ${DELIVERY_LABEL[details.delivery]}`)
  if (details.name.trim()) info.push(`*Nome:* ${details.name.trim()}`)
  if (details.notes.trim()) info.push(`*Observações:* ${details.notes.trim()}`)
  if (estimate) {
    info.push(
      `*Estimativa do site:* ${formatNumber(estimate.sweets)} doces e ${formatNumber(estimate.savories)} salgados para ${formatNumber(estimate.guests)} convidados${estimate.withMeal ? ' (com refeição)' : ''}`,
    )
  }
  if (info.length) out.push('', ...info)

  out.push('', lines.length ? 'Pode me passar o orçamento?' : 'Pode me ajudar a montar o pedido?')
  return out.join('\n')
}

export function whatsappLink(phone: string, text: string): string {
  return `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`
}
