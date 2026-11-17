import { describe, expect, it } from 'vitest'
import { daysUntilChristmas, isChristmasSeason, todayISO } from '../app/utils/christmas'

const season = { start: { month: 10, day: 1 }, end: { month: 12, day: 24 } }

describe('daysUntilChristmas', () => {
  it('conta os dias no horário de Brasília', () => {
    expect(daysUntilChristmas(new Date('2026-11-16T22:30:00-03:00'))).toBe(39)
  })

  it('usa a data de Brasília mesmo quando em UTC já virou o dia', () => {
    // 23h de 24/12 em Brasília = 02h de 25/12 em UTC
    expect(daysUntilChristmas(new Date('2026-12-25T02:00:00Z'))).toBe(1)
  })

  it('é zero no dia de Natal e passa para o próximo ano depois', () => {
    expect(daysUntilChristmas(new Date('2026-12-25T12:00:00-03:00'))).toBe(0)
    expect(daysUntilChristmas(new Date('2026-12-26T12:00:00-03:00'))).toBe(364)
  })
})

describe('isChristmasSeason', () => {
  it('liga de outubro até a véspera de Natal', () => {
    expect(isChristmasSeason(new Date('2026-09-30T12:00:00-03:00'), season)).toBe(false)
    expect(isChristmasSeason(new Date('2026-10-01T12:00:00-03:00'), season)).toBe(true)
    expect(isChristmasSeason(new Date('2026-12-24T23:00:00-03:00'), season)).toBe(true)
    expect(isChristmasSeason(new Date('2026-12-25T09:00:00-03:00'), season)).toBe(false)
  })
})

describe('todayISO', () => {
  it('gera a data mínima do campo de data', () => {
    expect(todayISO(new Date('2026-11-16T23:30:00-03:00'))).toBe('2026-11-16')
  })
})
