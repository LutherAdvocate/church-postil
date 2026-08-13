// composables/useScrollStop.ts
// import { useDebounceFn } from '@vueuse/core' // Optional: Use VueUse for a simple debounce utility

export function useScrollStop() {
  const isScrolling = ref(false)
  const showButton = ref(false)
  let scrollTimer: NodeJS.Timeout | null = null
  const TIMEOUT_DURATION = 300 // milliseconds

  const handleScroll = () => {
    console.log('handleScroll method running')
    isScrolling.value = true
    showButton.value = false // Hide button immediately when scrolling starts

    if (scrollTimer) {
      clearTimeout(scrollTimer)
    }

    scrollTimer = setTimeout(() => {
      isScrolling.value = false
      showButton.value = true // Show button when scrolling stops for the duration
    }, TIMEOUT_DURATION)
  }

  onMounted(() => {
    if (import.meta.client) {
      window.addEventListener('scroll', handleScroll)
    }
  })

  onUnmounted(() => {
    if (import.meta.client) {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimer) {
        clearTimeout(scrollTimer)
      }
    }
  })

  return {
    showButton
  }
}
