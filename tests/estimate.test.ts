import { describe, expect, it } from 'vitest'
import { DEFAULT_RULES, estimateParty, roundUpTo } from '../app/utils/estimate'

describe('estimateParty', () => {
  it('usa 4 doces e 12 salgados por convidado, arredondando para meio cento', () => {
    expect(estimateParty(80, false)).toEqual({ sweets: 350, savories: 1000 })
  })

  it('reduz os salgados quando tem refeição', () => {
    expect(estimateParty(80, true)).toEqual({ sweets: 350, savories: 500 })
  })

  it('arredonda sempre para cima', () => {
    expect(estimateParty(1, false)).toEqual({ sweets: 50, savories: 50 })
    expect(estimateParty(13, false)).toEqual({ sweets: 100, savories: 200 })
  })

  it('devolve zero para entradas vazias ou inválidas', () => {
    expect(estimateParty(0, false)).toEqual({ sweets: 0, savories: 0 })
    expect(estimateParty(Number.NaN, false)).toEqual({ sweets: 0, savories: 0 })
    expect(estimateParty(-5, true)).toEqual({ sweets: 0, savories: 0 })
  })

  it('aceita regras próprias', () => {
    expect(estimateParty(10, false, { ...DEFAULT_RULES, sweetsPerGuest: 6, roundTo: 10 }).sweets).toBe(60)
  })
})

describe('roundUpTo', () => {
  it('arredonda para o múltiplo de cima', () => {
    expect(roundUpTo(320, 50)).toBe(350)
    expect(roundUpTo(350, 50)).toBe(350)
    expect(roundUpTo(7, 0)).toBe(7)
  })
})
