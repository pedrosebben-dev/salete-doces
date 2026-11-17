/** Smooth scroll to a section by id, moving focus there for keyboard and screen reader users. */
export function useSectionScroll() {
  return (id: string, block: ScrollLogicalPosition = 'start') => {
    if (import.meta.server) return
    const el = document.getElementById(id)
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block })
    if (el.tabIndex < 0 && !el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
    el.focus({ preventScroll: true })
  }
}
