export const EVENT_TYPES = [
  'Aniversário',
  'Casamento',
  'Batizado',
  'Formatura',
  'Confraternização',
  'Natal',
  'Outra',
] as const

export type EventType = (typeof EVENT_TYPES)[number]

export interface PartyEvent {
  type: EventType
  title: string
  text: string
  /** Product photo used as thumbnail (/public/fotos/produtos). */
  photo: string
}

export const EVENTS: PartyEvent[] = [
  {
    type: 'Casamento',
    title: 'Casamentos',
    text: 'Bombons com plaquinha personalizada, doces finos e mesa completa para o grande dia.',
    photo: 'bombons-casamento',
  },
  {
    type: 'Formatura',
    title: 'Formaturas',
    text: 'Docinhos para a mesa e para a família comemorar junto.',
    photo: 'docinho-branco',
  },
  {
    type: 'Aniversário',
    title: 'Aniversários',
    text: 'Docinhos, bolo e salgados para comemorar mais um ano.',
    photo: 'docinhos-festa',
  },
  {
    type: 'Batizado',
    title: 'Batizados',
    text: 'Doces delicados para receber a família depois da cerimônia.',
    photo: 'brigadeiros',
  },
  {
    type: 'Confraternização',
    title: 'Confraternizações',
    text: 'Mini hambúrguer, mini quiche e docinhos para a equipe ou a família.',
    photo: 'mini-hamburguer',
  },
]
