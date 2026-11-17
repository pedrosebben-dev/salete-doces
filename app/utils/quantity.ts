import type { Unit } from '~/types'

/**
 * Confeitaria counts party sweets in "centos" (hundreds).
 * Returns a friendly label for multiples of 50, or null when it would not read well.
 *   50 -> "meio cento", 100 -> "1 cento", 250 -> "2 centos e meio"
 */
export function centosLabel(quantity: number): string | null {
  if (!Number.isFinite(quantity) || quantity <= 0 || quantity % 50 !== 0) return null
  const centos = Math.floor(quantity / 100)
  const half = quantity % 100 === 50
  if (centos === 0) return 'meio cento'
  const base = centos === 1 ? '1 cento' : `${centos} centos`
  return half ? `${base} e meio` : base
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(value)
}

export function formatQuantity(quantity: number, unit: Unit): string {
  if (unit === 'bolo') return quantity === 1 ? '1 bolo' : `${formatNumber(quantity)} bolos`
  if (unit === 'caixa') return quantity === 1 ? '1 caixa' : `${formatNumber(quantity)} caixas`
  return `${formatNumber(quantity)} un.`
}
