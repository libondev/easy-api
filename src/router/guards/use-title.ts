import type { Router } from 'vue-router'
import { name } from '@/../package.json'

export function useTitle(router: Router) {
  router.beforeEach((to, _, next) => {
    const title = to.meta?.title as string

    if (title) {
      document.title = title === name ? name : `${title} - ${name}`
    }

    next()
  })
}
