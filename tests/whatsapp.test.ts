import { describe, expect, it } from 'vitest'
import type { OrderDetails, Product } from '../app/types'
import { buildOrderMessage, formatDateBR, whatsappLink } from '../app/utils/whatsapp'

const bombom: Product = {
  id: 'bombom-morango',
  name: 'Bombom de morango',
  category: 'bombons',
  description: '',
  kind: 'sweet',
  unit: 'un',
  step: 50,
}
const bolo: Product = { ...bombom, id: 'bolo', name: 'Bolo recheado', kind: 'other', unit: 'bolo', step: 1 }

const empty: OrderDetails = { name: '', eventType: '', date: '', guests: null, delivery: '', notes: '' }

describe('buildOrderMessage', () => {
  it('monta a mensagem com itens, centos e detalhes da festa', () => {
    const message = buildOrderMessage(
      [
        { product: bombom, quantity: 150 },
        { product: bolo, quantity: 1 },
      ],
      { name: ' Ana ', eventType: 'Aniversário', date: '2026-12-12', guests: 80, delivery: 'retirada', notes: 'Tema rosa' },
    )

    expect(message).toBe(
      [
        'Oi, Salete! Vim pelo site e quero fazer uma encomenda 😊',
        '',
        '*Pedido*',
        '• Bombom de morango: 150 un. (1 cento e meio)',
        '• Bolo recheado: 1 bolo',
        '',
        '*Festa:* Aniversário',
        '*Data:* sábado, 12/12/2026',
        '*Convidados:* 80',
        '*Entrega ou retirada:* Retirada',
        '*Nome:* Ana',
        '*Observações:* Tema rosa',
        '',
        'Pode me passar o orçamento?',
      ].join('\n'),
    )
  })

  it('pede ajuda para montar quando o pedido está vazio', () => {
    const message = buildOrderMessage([], empty)
    expect(message).toContain('Pode me ajudar a montar o pedido?')
    expect(message).not.toContain('*Pedido*')
  })

  it('inclui a estimativa da calculadora', () => {
    const message = buildOrderMessage([], empty, { guests: 80, withMeal: true, sweets: 350, savories: 500 })
    expect(message).toContain('*Estimativa do site:* 350 doces e 500 salgados para 80 convidados (com refeição)')
  })
})

describe('formatDateBR', () => {
  it('escreve o dia da semana e a data no formato brasileiro', () => {
    expect(formatDateBR('2026-12-24')).toBe('quinta-feira, 24/12/2026')
    expect(formatDateBR('texto')).toBe('texto')
  })
})

describe('whatsappLink', () => {
  it('gera o link wa.me com o texto codificado', () => {
    expect(whatsappLink('+55 (51) 98254-4320', 'Oi, Salete!')).toBe('https://wa.me/5551982544320?text=Oi%2C%20Salete!')
  })
})
