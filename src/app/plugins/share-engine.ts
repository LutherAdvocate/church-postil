export default defineNuxtPlugin(() => {
// This is the SAME imageData you've been using, now global
  const ogImageData = useState('image-data', () => ({
    // content: {
    h: 'share-engine Headline', // Folders navigation.yml title
    t: 'share-engine Title', // OR Parents (Breadcrumbs)
    d: 'share-engine Description' // page.description or clicked header title (with parent above)
    // }
  }))
  // temporary solving the og-image-problem
  const bridge = useState('og-bridge', () => ({ h: '', t: '', d: '' }))

  return {
    provide: {
      // One shared object for everyone
      ogImageData,

      // 1. THE SETTER: Used in ImageEditor.vue to SAVE data
      syncToOG(h: string, t: string, d: string) {
        bridge.value = {
          h,
          t,
          d
        }
      },

      getOGText(key: 'h' | 't' | 'd') {
        return bridge.value[key] || ''
      },

      getOgText(type: number) {
        // Log this to your terminal (Nuxi dev) to see if it's hitting the server
        if (type === 1) return bridge.value.h || 'H-Missing'
        if (type === 2) return bridge.value.t || 'T-Missing'
        if (type === 3) return bridge.value.d || 'D-Missing'
        return '???'
      },

      ogImageText(key: 'h' | 't' | 'd') {
        if (key === 'h') return 'Header'
        else if (key === 't') return 'Title'
        else if (key === 'd') return 'Description'
      },

      // The Helper function your OG-Image template will call
      ogText(key: 'h' | 't' | 'd') {
        return bridge.value[key] // imageData.value.content[key] || ''
      },
      // We name it 'shareHeader' to be descriptive
      shareHeader(id: string, title: string) {
        // 1. Grab the element directly from the DOM
        const targetElement = document.getElementById(id)

        if (!targetElement) {
          console.error(`[ShareEngine] Element with id ${id} not found.`)
          return
        }

        // 2. Run the breadcrumb logic (make sure getBreadcrumbs is accessible here)
        // const breadcrumbs = getBreadcrumbs(targetElement)

        // 3. Update the shared state
        // This assumes you have your useImageState or global useState ready
        const imageData = useState('image-editor-data')
        imageData.value = {
          h: 'Daily Note',
          t: 'breadcrumbs',
          d: title || targetElement.innerText.replace('#', '').trim()
        }

        // 4. Open the UI
        const isEditorOpen = useState('is-editor-open')
        isEditorOpen.value = true

        console.log('🚀 Share Engine Activated:', imageData.value)
      }
    }
  }
})
