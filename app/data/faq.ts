import { DEFAULT_RULES } from '~/utils/estimate'

export interface FaqItem {
  question: string
  answer: string
}

export const FAQ: FaqItem[] = [
  {
    question: 'Como faço uma encomenda?',
    answer:
      'Monte seu pedido aqui no site e toque em "Enviar pelo WhatsApp": a mensagem já vai pronta para a Salete. Se preferir, chame direto no (51) 98254-4320.',
  },
  {
    question: 'Com quanto tempo de antecedência devo pedir?',
    answer:
      'Quanto antes, melhor. A agenda é limitada, principalmente em dezembro. Mande a data da festa que a Salete confirma se tem vaga.',
  },
  {
    question: 'Quanto custa?',
    answer:
      'O valor depende dos doces escolhidos e das quantidades. Envie seu pedido pelo WhatsApp que a Salete passa o orçamento.',
  },
  {
    question: 'Tem entrega?',
    answer: 'Retirada ou entrega são combinadas direto com a Salete, junto com a forma de pagamento.',
  },
  {
    question: 'Tem salgados também?',
    answer: 'Tem. Mini hambúrguer, mini quiche e outros salgados para festa. Pergunte pelo que você precisa.',
  },
  {
    question: 'Dá para personalizar os doces?',
    answer:
      'Conte o tema da festa e o que você imagina. Os bombons com plaquinha desenhada, por exemplo, são feitos especialmente para cada evento.',
  },
  {
    question: 'A calculadora de quantidades é exata?',
    answer: `Ela dá uma estimativa para começar: ${DEFAULT_RULES.sweetsPerGuest} doces por convidado e ${DEFAULT_RULES.savoriesPerGuest} salgados (ou ${DEFAULT_RULES.savoriesPerGuestWithMeal}, se tiver almoço ou jantar). A Salete ajusta tudo com você.`,
  },
]
