import LZString from 'lz-string'

interface ImageContent {
  h?: string // Headline (A)
  t?: string // Title (B/C)
  d?: string // Description/Quote (D/E/F)
}

export const useImageState = () => {
  // Your Global "Source of Truth"
  const headlineT = useState('headline-t', () => '') // Our global storage for "Church Postil"

  const imageData = useState('og-image-data', () => ({
    showEditor: false,
    layout: 'Docs',
    // The "Bridge" storage
    pageContext: {
      title: '',
      description: '',
      path: ''
    },
    content: {
      h: '', // A headline
      t: '', // B or C title (page.title or parent to shared header)
      d: '' // D, E, or F description
    }
    // Meta for internal logic
    // sourceType: 'page' // helps track if it's a manual quote vs page scrap
  }))

  const setContent = (payload: { h?: string, t?: string, d?: string }) => {
    if (payload.h) imageData.value.content.h = payload.h
    if (payload.t) imageData.value.content.t = payload.t
    if (payload.d) imageData.value.content.d = payload.d
  }

  // 2. THE ACTION (The "Broadcast" Function)
  // We pass the text into this function from the component
  // Change from string to Object
  const openEditor = (payload: ImageContent) => {
    // We use the spread operator to update only what is provided
    imageData.value.content = {
      h: payload.h || headlineT.value || 'Headline not provided',
      t: payload.t || 'Title not provided',
      d: payload.d || 'No description provided'
    }
    imageData.value.showEditor = true
    // console.log('📢 Editor opened with structured data (h=):', imageData.value.content.h)
  }

  // This is your shared logic, now accessible from the Editor!
  const generateSharePayload = () => {
    const route = useRoute()

    // 1. Create a tiny object using our single-letter keys
    const payload = {
      h: imageData.value.content.h,
      t: imageData.value.content.t,
      d: imageData.value.content.d,
      l: imageData.value.layout === 'Mobile' ? 'm' : 'w' // m=mobile, w=wide
    }

    // 2. Compress the JSON string
    const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(payload))

    // `${origin}/__og-image__/image${route.path}/og.png?v=${z}` // is the correct or wrong?

    const originPath = `${window.location.origin}${route.path}`

    // 3. Build the final OG Image URL
    // This points to the automatic PNG route provided by Nuxt OG Image
    const imageUrl = `${originPath}/__og-image__/image/og.png?v=${compressed}`

    // 4. Build the "Backlink" (The actual page the user visits)
    const shareUrl = `${originPath}?v=${compressed}`

    return { imageUrl, shareUrl, fullText: imageData.value.content.d }
  }

  return { headlineT, imageData, openEditor, setContent, generateSharePayload }
}

/*
  // THE BRAIN: Sync URL -> Global State
  const syncFromUrl = (pageData: any) => {
    const { s, q, layout } = route.query

    // 1. Handle Layout preference if it exists in URL
    if (layout) imageData.value.layout = layout as string

    // 2. Handle Header Reference (?s=h31)
    if (s && pageData?.body?.toc?.links) {
      const found = pageData.body.toc.links.find((l: any) => l.id === s)
      if (found) {
        imageData.value.text = found.text
        imageData.value.isLoaded = true
        return
      }
    }

    // 3. Handle Zipped Quote (?q=...)
    if (q) {
      // Assuming you have your unzip function ready
      imageData.value.text = decodeURIComponent(q as string) // Simplified for now
      imageData.value.isLoaded = true
      return
    }

    // 4. Default if nothing is found
    imageData.value.text = pageData?.title || 'Luther Quote'
    imageData.value.isLoaded = true
  }
*/
