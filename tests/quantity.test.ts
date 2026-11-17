import { describe, expect, it } from 'vitest'
import { centosLabel, formatQuantity } from '../app/utils/quantity'

describe('centosLabel', () => {
  it('fala em centos como na confeitaria', () => {
    expect(centosLabel(50)).toBe('meio cento')
    expect(centosLabel(100)).toBe('1 cento')
    expect(centosLabel(150)).toBe('1 cento e meio')
    expect(centosLabel(200)).toBe('2 centos')
    expect(centosLabel(1050)).toBe('10 centos e meio')
  })

  it('não inventa rótulo para quantidades quebradas', () => {
    expect(centosLabel(0)).toBeNull()
    expect(centosLabel(75)).toBeNull()
    expect(centosLabel(-100)).toBeNull()
    expect(centosLabel(Number.NaN)).toBeNull()
  })
})

describe('formatQuantity', () => {
  it('formata unidades, bolos e caixas', () => {
    expect(formatQuantity(1000, 'un')).toBe('1.000 un.')
    expect(formatQuantity(1, 'bolo')).toBe('1 bolo')
    expect(formatQuantity(2, 'bolo')).toBe('2 bolos')
    expect(formatQuantity(1, 'caixa')).toBe('1 caixa')
    expect(formatQuantity(3, 'caixa')).toBe('3 caixas')
  })
})
