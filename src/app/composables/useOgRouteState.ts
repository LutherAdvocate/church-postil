/* eslint-disable @typescript-eslint/no-explicit-any */
// composables/useOgRouteState.ts
export const OG_VERSION = '1'

export const useOgRouteState = (pageBody?: any) => {
  const route = useRoute()
  const router = useRouter()

  // Add ?v=1 on /en pages OR any page not starting with /da (e.g. root '/') when no other query params exist
  // const isTargetPath = route.path.startsWith('/en') || !route.path.startsWith('/da') // const isNotDanish = !route.path.startsWith('/da')

  if (import.meta.client && route.path.length < 20 && Object.keys(route.query).length === 0) {
    router.replace({ query: { v: OG_VERSION } })
  }

  const { imageData } = useImageState()

  // 1. Determine layout from query params
  if (route.query.c === 'Wide' || route.query.c === 'Narrow' || route.query.c === 'QuoteLink') {
    imageData.value.layout = route.query.c
  } else if (route.query.h) {
    imageData.value.layout = 'HeaderLink'
  } else if (route.query.s) {
    imageData.value.layout = 'QuoteLink'
  }

  type OgLayout = Parameters<typeof defineOgImage>[0]
  const layout: OgLayout = (
    imageData.value.layout === 'Wide'
      ? 'Wide'
      : imageData.value.layout === 'Narrow'
        ? 'Narrow'
        : imageData.value.layout === 'HeaderLink'
          ? 'HeaderLink'
          : 'QuoteLink'
  ) as OgLayout

  // 2. If ?h= is present, extract h2 / h3 / h4 from pageBody for BOTH useSeoMeta & defineOgImage
  let headerMeta: { headline: string; title: string; description: string } | null = null

  const hParam = route.query.h ? String(route.query.h).replace(/^h/i, '') : ''

  if (hParam && pageBody) {
    const targetId = `h${hParam}`

    const allHeadings: { level: number; spanIds: string[]; text: string }[] = []

    const getText = (n: any): string => {
      if (typeof n === 'string') return n
      if (n?.type === 'text') return n.value || ''
      if (Array.isArray(n)) return n.slice(2).map(getText).join('')
      if (Array.isArray(n?.children)) return n.children.map(getText).join('')
      return ''
    }

    const scanSpans = (c: any, spanIds: string[]) => {
      if (!c) return
      // Minimark array format: ['span', { id: 'h3154' }, ...children]
      if (Array.isArray(c)) {
        if (c[0] === 'span' && c[1]?.id) {
          spanIds.push(String(c[1].id))
        }
        c.slice(2).forEach((child) => scanSpans(child, spanIds))
      }
      // Object AST format: { tag: 'span', props: { id: 'h3154' }, children: [...] }
      else if (typeof c === 'object') {
        if (c.tag === 'span' && c.props?.id) {
          spanIds.push(String(c.props.id))
        }
        if (Array.isArray(c.children)) {
          c.children.forEach((child: any) => scanSpans(child, spanIds))
        }
      }
    }

    const collect = (node: any) => {
      if (!node) return

      // 1. Minimark array format: ['h3', { id: '...' }, ...children]
      if (Array.isArray(node) && typeof node[0] === 'string' && /^h[1-6]$/i.test(node[0])) {
        const spanIds: string[] = []
        node.slice(2).forEach((child) => scanSpans(child, spanIds))
        allHeadings.push({
          level: Number(node[0].slice(1)),
          spanIds,
          text: node.slice(2).map(getText).join('').trim()
        })
        return
      }

      // 2. Object AST format: { tag: 'h3', children: [...] }
      if (node && typeof node === 'object' && typeof node.tag === 'string' && /^h[1-6]$/i.test(node.tag)) {
        const spanIds: string[] = []
        if (Array.isArray(node.children)) {
          node.children.forEach((child: any) => scanSpans(child, spanIds))
        }
        allHeadings.push({
          level: Number(node.tag.slice(1)),
          spanIds,
          text: getText(node).trim()
        })
        return
      }

      // 3. Recurse into containers
      if (Array.isArray(node)) node.forEach(collect)
      else if (typeof node === 'object') {
        if (Array.isArray(node.children)) node.children.forEach(collect)
        if (Array.isArray(node.value)) node.value.forEach(collect)
      }
    }


    collect(pageBody)

    const idx = allHeadings.findIndex((h) => h.spanIds.includes(targetId))
    if (idx !== -1) {
      const clicked = allHeadings[idx]
      let parentTitle = ''
      let grandHeadline = ''
      let expected = clicked.level - 1
      for (let i = idx - 1; i >= 0; i--) {
        if (allHeadings[i].level <= expected) {
          if (!parentTitle) {
            parentTitle = allHeadings[i].text
            expected = allHeadings[i].level - 1
          } else if (!grandHeadline) {
            grandHeadline = allHeadings[i].text
            break
          }
        }
      }
      headerMeta = {
        headline: grandHeadline,
        title: parentTitle || clicked.text,
        description: clicked.text,
      }
    }
  }

  return { layout, headerMeta }
}

/* First solution 
export const useOgRouteState = () => {
  const route = useRoute()
  const { imageData } = useImageState()

  // 1. Set imageData.value.layout from route query parameters
  if (route.query.c === 'Wide' || route.query.c === 'Narrow' || route.query.c === 'QuoteLink') {
    imageData.value.layout = route.query.c
  } else if (route.query.h) {
    imageData.value.layout = 'HeaderLink'
  } else if (route.query.s) {
    imageData.value.layout = 'QuoteLink'
  }

  // 2. Return the strictly typed layout for defineOgImage()
  type OgLayout = Parameters<typeof defineOgImage>[0]

  const layout: OgLayout = (
    imageData.value.layout === 'Wide'
      ? 'Wide'
      : imageData.value.layout === 'Narrow'
        ? 'Narrow'
        : imageData.value.layout === 'HeaderLink'
          ? 'HeaderLink'
          : 'QuoteLink'
  ) as OgLayout

  return layout
}
*/
