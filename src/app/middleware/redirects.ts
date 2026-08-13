export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/da/advent')
    return navigateTo('/da/advent-postil', { redirectCode: 302 })
  if (to.path === '/da/christmas')
    return navigateTo('/da/christmas-postil', { redirectCode: 302 })
  if (to.path === '/da/lent')
    return navigateTo('/da/lent-postil', { redirectCode: 302 })
  if (to.path === '/da/easter')
    return navigateTo('/da/easter-postil', { redirectCode: 302 })
  if (to.path === '/da/trinity1')
    return navigateTo('/da/trinity1-postil', { redirectCode: 302 })
  if (to.path === '/da/trinity2')
    return navigateTo('/da/trinity2-postil', { redirectCode: 302 })
  /* If the user hits the absolute root "/"
  if (to.path === '/')
    return navigateTo('/en', { redirectCode: 302 })
  */
})
