import type { CategoryId } from '~/types'

let toastTimer: ReturnType<typeof setTimeout> | undefined

/** Short confirmation shown at the bottom of the screen. */
export function useToast() {
  const message = useState<string>('toast', () => '')
  const id = useState<number>('toast-id', () => 0)

  function show(text: string) {
    message.value = text
    id.value++
    if (toastTimer) clearTimeout(toastTimer)
    toastTimer = setTimeout(() => (message.value = ''), 3200)
  }

  return { message, id, show }
}

/** Product shown in the photo dialog. */
export function useProductPreview() {
  return useState<string | null>('product-preview', () => null)
}

/** Catalog filter and the product briefly highlighted after a tap in the hero box. */
export function useCatalog() {
  const filter = useState<CategoryId | 'todos'>('catalog-filter', () => 'todos')
  const highlighted = useState<string | null>('catalog-highlight', () => null)
  return { filter, highlighted }
}
