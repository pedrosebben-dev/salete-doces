/**
 * Builds URLs for files in /public that respect app.baseURL,
 * so the site also works when served from a sub-folder.
 */
export function useAssets() {
  const base = useRuntimeConfig().app.baseURL
  const file = (path: string) => `${base}${path}`

  return {
    file,
    product: (slug: string, width: 480 | 960) => file(`fotos/produtos/${slug}-${width}.webp`),
    productSrcset: (slug: string) =>
      `${file(`fotos/produtos/${slug}-480.webp`)} 480w, ${file(`fotos/produtos/${slug}-960.webp`)} 960w`,
    closeUp: (slug: string, width: 240 | 480) => file(`fotos/close/${slug}-${width}.webp`),
    closeUpSrcset: (slug: string) =>
      `${file(`fotos/close/${slug}-240.webp`)} 240w, ${file(`fotos/close/${slug}-480.webp`)} 480w`,
    illustration: (name: string) => file(`ilustracoes/${name}`),
  }
}
