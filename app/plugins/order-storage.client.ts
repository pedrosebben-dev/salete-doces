// Keeps the order in the visitor's browser, so it survives a reload.
// Restores only after hydration so the static HTML and the first client render match.
const KEY = 'salete-togni:pedido:v1'

export default defineNuxtPlugin((nuxtApp) => {
  const order = useOrderStore()

  nuxtApp.hook('app:mounted', () => {
    try {
      const raw = window.localStorage.getItem(KEY)
      if (raw) order.restore(JSON.parse(raw))
    } catch {
      // Private mode or blocked storage: the order just won't be remembered.
    }

    watch(
      () => order.snapshot(),
      (value) => {
        try {
          window.localStorage.setItem(KEY, JSON.stringify(value))
        } catch {
          // Ignore: storage is a convenience, not a requirement.
        }
      },
      { deep: true },
    )
  })
})
