export interface EstimateRules {
  sweetsPerGuest: number
  savoriesPerGuest: number
  savoriesPerGuestWithMeal: number
  /** Results are rounded up to this (50 = meio cento). */
  roundTo: number
}

/** Common rule of thumb for parties; change here if the Salete prefers other numbers. */
export const DEFAULT_RULES: EstimateRules = {
  sweetsPerGuest: 4,
  savoriesPerGuest: 12,
  savoriesPerGuestWithMeal: 6,
  roundTo: 50,
}

export function roundUpTo(value: number, step: number): number {
  if (step <= 0) return value
  return Math.ceil(value / step) * step
}

export function estimateParty(guests: number, withMeal: boolean, rules: EstimateRules = DEFAULT_RULES) {
  const people = Number.isFinite(guests) ? Math.max(0, Math.round(guests)) : 0
  if (people === 0) return { sweets: 0, savories: 0 }
  const savoriesPerGuest = withMeal ? rules.savoriesPerGuestWithMeal : rules.savoriesPerGuest
  return {
    sweets: roundUpTo(people * rules.sweetsPerGuest, rules.roundTo),
    savories: roundUpTo(people * savoriesPerGuest, rules.roundTo),
  }
}
