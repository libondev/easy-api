import { createRouter, createWebHashHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'

import { useTitle } from './guards/use-title'
import { useViewTransition } from './guards/use-view-transition'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(generatedRoutes),
})

useTitle(router)
useViewTransition(router)

export default router
