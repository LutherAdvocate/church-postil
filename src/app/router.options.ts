// app/router.options.ts
import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    const hash = to.hash || ''
    const fullPath = to.fullPath || ''
    const queryS = to.query.s as string | undefined
    const sectionId = queryS || ''

    // --- IF 1: NOTE HASH DETECTED ---
    if (hash.startsWith('#note-')) {
      console.log('if1, hash startsWith "note-')
      const element = document.querySelector(hash)
      if (element) {
        return { el: hash, behavior: 'smooth' }
      }
      return false // Silences the warning if note isn't visible on screen
    }

    // --- IF 2: NORMAL LINK HASH ---
    if (hash.length > 5 && !fullPath.includes('#:~:text=')) {
      console.log('if2 hash is normal')
      
      // SAFETY GUARD: Check if the sermon element is actually in the DOM yet
      const element = document.querySelector(hash)
      if (element) {
        return { el: hash, behavior: 'smooth' }
      }
      
      // SILENCE FIX: If Nuxt Content is still rendering it, return false 
      // to silence the warning, and let your component lifecycle or a fallback handle it.
      return false 
    }

    // --- IF 4: DYNAMIC EXPERIMENTAL EXPERIMENT CASE ---
    if (sectionId === 'remove-this-if-you-want-to-replace-query-s-with-text-search-hash') {
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (!el) return
        console.log('sectionId ?s=', sectionId)

        const text = el.innerText || el.textContent || ''
        const textFragment = `:~:text=${encodeURIComponent(text.trim())}`

        el.scrollIntoView({ behavior: 'smooth', block: 'start' })

        const newUrl = window.location.pathname + `#${sectionId}${textFragment}`
        window.history.replaceState(null, '', newUrl)
        window.dispatchEvent(new Event('hashchange'))
      }, 400)
      
      return false
    }

    // --- IF 3: NO HASH OR QUERY SEARCHED ---
    if (hash.length === 0 && !fullPath.includes('#:~:text=') && !queryS) {
      console.log('if3 no hash or query')
      return savedPosition || { top: 0, left: 0, behavior: 'smooth' }
    }

    // --- ELSE 7: CATCH ALL FALLBACK ---
    console.log('Error: else(7) - scrollRestoration')
    return savedPosition || false
  }
}
