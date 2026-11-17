import type { CategoryId, Product } from '~/types'

export const CATEGORIES: { id: CategoryId | 'todos'; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'bombons', label: 'Bombons' },
  { id: 'docinhos', label: 'Docinhos' },
  { id: 'tortinhas', label: 'Tortinhas e bolos' },
  { id: 'salgados', label: 'Salgados' },
]

/**
 * Everything here comes from photos in the @salete_togni stories.
 * To add a product: drop the photo in /public/fotos/produtos (480 and 960 wide, 4:5)
 * and add one entry below. No prices on purpose: the order goes to WhatsApp for a quote.
 */
export const PRODUCTS: Product[] = [
  // Bombons
  {
    id: 'bombom-morango',
    name: 'Bombom de morango',
    category: 'bombons',
    description: 'Morango inteiro envolvido em chocolate branco.',
    photo: 'bombom-morango',
    closeUp: 'bombom-morango',
    kind: 'sweet',
    unit: 'un',
    step: 50,
    highlight: '“Delicioso!”, recado de uma cliente',
  },
  {
    id: 'morango-do-amor',
    name: 'Morango do amor',
    category: 'bombons',
    description: 'Morango com brigadeiro branco e casquinha vermelha de açúcar.',
    photo: 'morango-do-amor',
    closeUp: 'morango-do-amor',
    kind: 'sweet',
    unit: 'un',
    step: 50,
  },
  {
    id: 'bombom-crocante',
    name: 'Bombom crocante',
    category: 'bombons',
    description: 'Coberto de amendoim crocante, com rosinha de chocolate por cima.',
    photo: 'bombom-crocante',
    closeUp: 'bombom-crocante',
    kind: 'sweet',
    unit: 'un',
    step: 50,
  },
  {
    id: 'bombom-florzinha',
    name: 'Bombom com florzinha',
    category: 'bombons',
    description: 'Chocolate ao leite com florzinha de açúcar e fios de chocolate branco.',
    photo: 'bombom-florzinha',
    closeUp: 'bombom-florzinha',
    kind: 'sweet',
    unit: 'un',
    step: 50,
  },
  {
    id: 'bombons-sortidos',
    name: 'Bombons sortidos',
    category: 'bombons',
    description: 'Ao leite, branco e com nozes, para montar uma bandeja variada.',
    photo: 'bombons-sortidos',
    kind: 'sweet',
    unit: 'un',
    step: 50,
  },
  {
    id: 'bombons-personalizados',
    name: 'Bombons personalizados',
    category: 'bombons',
    description: 'Com plaquinha de chocolate desenhada para o tema da festa.',
    photo: 'bombons-casamento',
    closeUp: 'bombons-casamento',
    kind: 'sweet',
    unit: 'un',
    step: 50,
  },

  // Docinhos
  {
    id: 'barquinha-morango',
    name: 'Barquinha de chocolate com morango',
    category: 'docinhos',
    description: 'Casquinha de chocolate, recheio cremoso e morango fresquinho por cima.',
    photo: 'barquinha-morango',
    closeUp: 'barquinha-morango',
    kind: 'sweet',
    unit: 'un',
    step: 50,
  },
  {
    id: 'docinho-rosa',
    name: 'Docinho em formato de rosa',
    category: 'docinhos',
    description: 'Modelado em forma de rosa e passado no açúcar cristal.',
    photo: 'docinho-rosa',
    closeUp: 'docinho-rosa',
    kind: 'sweet',
    unit: 'un',
    step: 50,
  },
  {
    id: 'docinhos-rosados',
    name: 'Docinhos rosados',
    category: 'docinhos',
    description: 'Docinhos rosados com detalhe de chocolate, prontos para a mesa da festa.',
    photo: 'docinhos-festa',
    kind: 'sweet',
    unit: 'un',
    step: 50,
  },
  {
    id: 'brigadeiros',
    name: 'Brigadeiros decorados',
    category: 'docinhos',
    description: 'Brigadeiro de chocolate decorado com florzinhas de açúcar.',
    photo: 'brigadeiros',
    kind: 'sweet',
    unit: 'un',
    step: 50,
  },
  {
    id: 'docinho-branco',
    name: 'Docinho branco com chocolate',
    category: 'docinhos',
    description: 'Docinho cremoso com rosinha de chocolate por cima.',
    photo: 'docinho-branco',
    kind: 'sweet',
    unit: 'un',
    step: 50,
  },
  {
    id: 'frutas-recheadas',
    name: 'Figo e damasco recheados',
    category: 'docinhos',
    description: 'Doces finos de frutas, recheados e banhados no chocolate.',
    photo: 'frutas-recheadas',
    closeUp: 'frutas-recheadas',
    kind: 'sweet',
    unit: 'un',
    step: 50,
  },

  // Tortinhas e bolos
  {
    id: 'tortinha-frutas',
    name: 'Tortinha folhada de frutas',
    category: 'tortinhas',
    description: 'Massa folhada, creme e frutas frescas por cima.',
    photo: 'tortinha-frutas',
    closeUp: 'tortinha-frutas',
    kind: 'sweet',
    unit: 'un',
    step: 50,
  },
  {
    id: 'tortinhas-cremosas',
    name: 'Tortinhas cremosas',
    category: 'tortinhas',
    description: 'Massa amanteigada com cobertura cremosa.',
    photo: 'tortinhas-cremosas',
    closeUp: 'tortinhas-cremosas',
    kind: 'sweet',
    unit: 'un',
    step: 50,
  },
  {
    id: 'bolo-recheado',
    name: 'Bolo recheado',
    category: 'tortinhas',
    description: 'Camadas de massa, recheio e cobertura. Tamanho e sabor a combinar.',
    photo: 'bolo-recheado',
    kind: 'other',
    unit: 'bolo',
    step: 1,
  },

  // Salgados
  {
    id: 'mini-hamburguer',
    name: 'Mini hambúrguer',
    category: 'salgados',
    description: 'Pão com gergelim, hambúrguer, alface e tomate.',
    photo: 'mini-hamburguer',
    closeUp: 'mini-hamburguer',
    kind: 'savory',
    unit: 'un',
    step: 50,
  },
  {
    id: 'mini-quiche',
    name: 'Mini quiche',
    category: 'salgados',
    description: 'Massinha amanteigada com recheio assado.',
    photo: 'mini-quiche',
    closeUp: 'mini-quiche',
    kind: 'savory',
    unit: 'un',
    step: 50,
  },

  // Natal (aparecem só na seção de Natal)
  {
    id: 'panetone',
    name: 'Panetone',
    category: 'natal',
    description: 'Panetone artesanal, feito à mão pela Salete.',
    illustration: 'panetone-simples.svg',
    kind: 'other',
    unit: 'un',
    step: 1,
  },
  {
    id: 'chocotone',
    name: 'Chocotone',
    category: 'natal',
    description: 'Chocotone artesanal, feito à mão pela Salete.',
    illustration: 'panetone-choco.svg',
    kind: 'other',
    unit: 'un',
    step: 1,
  },
  {
    id: 'bombons-presente',
    name: 'Bombons para presentear',
    category: 'natal',
    description: 'Bombons artesanais para dar de presente. Tamanho da caixa a combinar.',
    closeUp: 'bombom-florzinha',
    kind: 'other',
    unit: 'caixa',
    step: 1,
  },
]

export const PRODUCTS_BY_ID: Record<string, Product> = Object.fromEntries(
  PRODUCTS.map((product) => [product.id, product]),
)

export const CATALOG = PRODUCTS.filter((product) => product.category !== 'natal')
export const CHRISTMAS_PRODUCTS = PRODUCTS.filter((product) => product.category === 'natal')

/** The nine treats laid out in the hero box, in reading order. */
export const BOX_SELECTION = [
  'bombom-morango',
  'barquinha-morango',
  'docinho-rosa',
  'tortinha-frutas',
  'morango-do-amor',
  'bombom-florzinha',
  'mini-hamburguer',
  'bombom-crocante',
  'frutas-recheadas',
]
