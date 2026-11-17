import type { RouterConfig } from '@nuxt/schema'

// In the preview build the page can be opened from any path (e.g. inside another link),
// so every path renders the home page. The normal build keeps the regular routes.
export default <RouterConfig>{
  routes: (routes) =>
    __PREVIEW__
      ? [{ path: '/:pathMatch(.*)*', name: 'index', component: () => import('~/pages/index.vue') }]
      : routes,
}
