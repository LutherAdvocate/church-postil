// composables/useSlugInitializer.js
import { onMounted, watch } from 'vue'
import LZString from 'lz-string'

export const useSlugInitializer = () => {
  const route = useRoute()

  const { allNotes } = useNotes()

  const scrollToNoteFromHash = () => {
    console.log('Log from scrollToNoteFromhash (line 11 in useSlugInitializer)')
    const noteId = route.hash?.replace('#note-', '')
    const targetNote = allNotes.value.find(n => String(n.id) === noteId)

    if (targetNote) {
      const notePos = targetNote.top

      // Your discovered "Sweet Spot" formula
      const responsiveOffset = window.innerWidth * 0.7
      const finalTarget = notePos + responsiveOffset

      window.scrollTo({
        top: finalTarget - 70,
        behavior: 'smooth'
      })
    }
  }

  const handleRouteLogic = () => {

    // --- PAYLOAD TYPE 1: UNZIPPING (?v=...) ---
    if (route.query.v) {
      // const zipped = route.query.v as string
      console.log('unzipping')
      const unzipped = JSON.parse(LZString.decompressFromEncodedURIComponent(route.query.v as string))
      // const unzipped = LZString.decompressFromEncodedURIComponent(zipped)
      console.log('Welcome back! You were sent here to see:', unzipped.d)
      return
      // source: https://gemini.google.com/share/a89844d0d7e5
      // You could open your Slideover here automatically to show them the quote!
    }

    // --- PAYLOAD TYPE 2: DECOMPRESS & HIGHLIGHT SEARCH (?s=...) ---
    const s = route.query.s as string

    if (s) {
      try {
        const decompressed = LZString.decompressFromEncodedURIComponent(s)
        const { d } = JSON.parse(decompressed)
        const quoteSnippet = d.substring(0, 40)

        // 1. Find the paragraph
        const paragraphs = document.querySelectorAll('p')
        let targetEl: HTMLElement | null = null

        for (const p of paragraphs) {
          if (p.textContent?.includes(quoteSnippet)) {
            targetEl = p as HTMLElement
            break
          }
        }

        if (targetEl) {
          // 1. Get the original HTML
          const fullHtml = targetEl.innerHTML

          // 2. We need to find the text even if there are slight spacing differences
          // We'll search for the raw quote 'd'
          const quoteToHighlight = d.trim()

          // 3. Use a "Replace" to wrap the quote in a <mark> tag
          // We use a regex or simple replace to add the styling
          if (fullHtml.includes(quoteToHighlight)) {
            targetEl.innerHTML = fullHtml.replace(
              quoteToHighlight,
              `<mark style="background-color: #fef08a; color: black; padding: 2px 0;">${quoteToHighlight}</mark>`
            )
          }

          // 4. Scroll to the element
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' })

          // 5. Clean the URL for the address bar
          // const textFragment = `:~:text=${encodeURIComponent(quoteToHighlight)}`
          // window.history.replaceState(null, '', `${window.location.pathname}#${textFragment}`)
        }
      } catch (e) {
        console.error('Manual highlight failed', e)
      }
    } // https://gemini.google.com/share/0a4a0adb393b

    /**
     * PAYLOAD TYPE 3: CHROME NATIVE TEXT HIGHLIGHT REFRESH NUDGE
     * This handles the "Arrival" via a link
     */
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    const fullUrl = navEntry?.name || ''

    const sectionId = route.query.s as string

    if (route.hash.startsWith('#note-')) { // NOTE HASH
      console.log('if1, hash startsWith "note-')
      scrollToNoteFromHash()
    } else if (route.hash.length > 5 // NORMAL HASH
      && !(route.hash.startsWith('#note-') || fullUrl.includes('#:~:text='))) {
      // 1. Process your custom hash filtering rules
      setTimeout(() => {
        console.log('if2 hash is normal. useSlugInitializer')
        const routerHash = route.hash.slice(1)
        const hashEl = document.getElementById(routerHash)
        hashEl?.scrollIntoView({ behavior: 'smooth' })
        // urlHash.value = ''
      }, 50)
    } else if (route.hash.length === 0 // NO HASH here
      && !fullUrl.includes('#:~:text=')
      && !(route.query.s || sectionId)) {
      // Before this code the page opened in the bottom view
      console.log('if3 no hash or query')
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth' // or 'instant'
      })
    } else if (sectionId === 'remove-this-if-you-want-to-replace-query-s-with-text-search-hash') {
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId)
          if (!el) return
          console.log('sectionId ?s=', sectionId)

          // 1. Get the text for the "Yellow Highlight"
          const text = el.innerText || el.textContent || ''
          const textFragment = `:~:text=${encodeURIComponent(text.trim())}`

          // 2. Scroll to the element first (Smooth & Reliable)
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })

          // 3. Update the URL: Change ?s=id into #id + the text highlight
          // This keeps the highlight visible but cleans the query param
          const newUrl = window.location.pathname + `#${sectionId}${textFragment}`
          window.history.replaceState(null, '', newUrl)

          // 4. Tell the rest of the app "We have moved!"
          window.dispatchEvent(new Event('hashchange'))
        }, 400) // 400ms gives Nuxt Content plenty of time to finish the layout
      }
    } else if (fullUrl.includes('#:~:text=')) {
      console.log('if6 text search hash')
      const textFragment = fullUrl.split('#')[1] // Gets :~:text=...

      // 2. Put it back into the address bar so it stays there
      if (import.meta.client) {
        window.history?.replaceState(null, '', window.location.pathname + '#' + textFragment)
      }
      // 3. Your "Nudge" to ensure the browser highlights
      setTimeout(() => {
        window.scrollBy(0, 1)
        window.scrollBy(0, -1)
      }, 500)
    } else { // THIS SHOULD NEVER HAPPEN - probable an error
      console.log('Error: else(7) - scrollRestoration')
      /*
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto'
      }
      */
    }

    // 2. You can paste your query string matching rules right below here later...
    if (route.query.search) {
      // Future query string logic goes here cleanly
    }
  }

  onMounted(() => {
    // Fires on the very first page navigation load
    handleRouteLogic()
  })

  // Listens if the user clicks an anchor link leading to a different hash on the exact same page path
  watch(() => route.fullPath, () => {
    handleRouteLogic()
  })

  // This handles the "Jumping" if you are already on the page
  watch(() => route.hash, () => {
    console.log('Watching hash from slug.vue')
    if (route.hash.startsWith('#note-'))
      scrollToNoteFromHash()
    else console.log('string not starts width #note-')
  }) // https://gemini.google.com/share/c9a8b8ceb3f8

}
