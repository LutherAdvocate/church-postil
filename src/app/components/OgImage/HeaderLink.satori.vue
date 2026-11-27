<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
const route = useRoute()

const props = defineProps<{
  title: string
  description?: string
  headline?: string
}>()

// 1. Fetch the markdown page on the server (replace 'content' if your collection has a different name)
const { data: page } = await useAsyncData(`og-header-${route.path}-${route.query.h}`, () =>
  queryCollection('docs').path(route.path).first()
)

interface AstHeading {
  level: number
  spanIds: string[]
  text: string
}

// 2. Helper to extract text and any inner <span id="h..."> IDs from Nuxt Content v3 (Minimark) or v2 AST
const parseHeadingNode = (node: any): AstHeading | null => {
  // Nuxt Content v3 Minimark format: ['h4', { id: '...' }, ...children]
  if (Array.isArray(node) && typeof node[0] === 'string' && /^h[1-6]$/i.test(node[0])) {
    const level = Number(node[0].slice(1))
    const spanIds: string[] = []

    const walk = (n: any): string => {
      if (typeof n === 'string') return n
      if (Array.isArray(n)) {
        const [tag, attrs, ...children] = n
        if (tag === 'span' && attrs?.id) spanIds.push(String(attrs.id))
        return children.map(walk).join('')
      }
      return ''
    }

    return { level, spanIds, text: node.slice(2).map(walk).join('').trim() }
  }

  // Nuxt Content v2 Object AST format: { tag: 'h4', props: { id: '...' }, children: [...] }
  if (node && typeof node === 'object' && typeof node.tag === 'string' && /^h[1-6]$/i.test(node.tag)) {
    const level = Number(node.tag.slice(1))
    const spanIds: string[] = []

    const walk = (n: any): string => {
      if (typeof n === 'string') return n
      if (n?.type === 'text') return n.value || ''
      if (n?.tag === 'span' && n?.props?.id) spanIds.push(String(n.props.id))
      return Array.isArray(n?.children) ? n.children.map(walk).join('') : ''
    }

    return { level, spanIds, text: walk(node).trim() }
  }

  return null
}

// 3. Collect all headings in document order, find target (e.g. 'h47'), and walk backwards for h3 & h2
const hierarchy = computed(() => {
  const hParam = route.query.h ? String(route.query.h).replace(/^h/i, '') : ''
  if (!hParam || !page.value?.body) return null

  const targetId = `h${hParam}`
  const allHeadings: AstHeading[] = []

  const collectHeadings = (node: any) => {
    if (!node) return
    const heading = parseHeadingNode(node)
    if (heading) {
      allHeadings.push(heading)
      return
    }
    if (Array.isArray(node)) {
      node.forEach(collectHeadings)
    } else if (typeof node === 'object') {
      if (Array.isArray(node.children)) node.children.forEach(collectHeadings)
      if (Array.isArray(node.value)) node.value.forEach(collectHeadings)
    }
  }

  collectHeadings(page.value.body)

  const startIndex = allHeadings.findIndex((h) => h.spanIds.includes(targetId))
  if (startIndex === -1) return null

  const clickedHeading = allHeadings[startIndex]
  let parentTitle = ''
  let grandHeadline = ''
  let expectedLevel = clickedHeading.level - 1

  for (let i = startIndex - 1; i >= 0; i--) {
    const h = allHeadings[i]
    if (h.level <= expectedLevel) {
      if (!parentTitle) {
        parentTitle = h.text
        expectedLevel = h.level - 1
      } else if (!grandHeadline) {
        grandHeadline = h.text
        break
      }
    }
  }

  return {
    headline: grandHeadline,      // e.g. h2
    title: parentTitle,           // e.g. h3
    description: clickedHeading.text // e.g. h4 (<span id="h47">)
  }
})

// 4. Bind to your template with clean fallbacks
const displayHeadline = computed(() => hierarchy.value?.headline || props.headline || "Luther's Church Postil")
const displayTitle = computed(() => hierarchy.value?.title || props.title)
const displayDescription = computed(() => hierarchy.value?.description || props.description || 'Tap to jump to this section →')
</script>

<template>
  <div class="w-[1200px] h-[630px] flex flex-col justify-center px-16 bg-[#020420] relative overflow-hidden">
    <!-- Upper-right sunburst -->
    <svg
      class="absolute right-0 top-0"
      width="629"
      height="593"
      viewBox="0 0 629 593"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_199_94966)">
        <path
          d="M628.5 -578L639.334 -94.4223L806.598 -548.281L659.827 -87.387L965.396 -462.344L676.925 -74.0787L1087.69 -329.501L688.776 -55.9396L1160.22 -164.149L694.095 -34.9354L1175.13 15.7948L692.306 -13.3422L1130.8 190.83L683.602 6.50012L1032.04 341.989L668.927 22.4412L889.557 452.891L649.872 32.7537L718.78 511.519L628.5 36.32L538.22 511.519L607.128 32.7537L367.443 452.891L588.073 22.4412L224.955 341.989L573.398 6.50012L126.198 190.83L564.694 -13.3422L81.8734 15.7948L562.905 -34.9354L96.7839 -164.149L568.224 -55.9396L169.314 -329.501L580.075 -74.0787L291.604 -462.344L597.173 -87.387L450.402 -548.281L617.666 -94.4223L628.5 -578Z"
          fill="#00DC82"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_199_94966"
          x="0.873535"
          y="-659"
          width="1255.25"
          height="1251.52"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="40.5" result="effect1_foregroundBlur_199_94966" />
        </filter>
      </defs>
    </svg>

    <!-- Cross watermark -->
    <div class="absolute -right-6 top-10 opacity-[0.07] text-[#00DC82]">
      <svg width="480" height="600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11 2h2v5h5v2h-5v13h-2V9H6V7h5V2z" />
      </svg>
    </div>

    <!-- Centered content safe for both Messenger square thumbnail and 1200x630 wide banner -->
    <div class="px-16 relative z-10 flex flex-col items-center text-center">
      <!-- h2 (Sermon / Sunday) -->
      <p class="uppercase text-[30px] text-[#00DC82] mb-4 font-bold max-w-[950px] line-clamp-2">
        {{ displayHeadline }}
      </p>

      <!-- h3 (Main section) -->
      <h1 class="text-[52px] font-bold leading-tight mb-8 text-white max-w-[980px] line-clamp-2">
        {{ displayTitle }}
      </h1>

      <!-- h4 / Verse (Centered with subtle border so it stays inside Messenger's 630x630 center crop) -->
      <div class="border-l-4 border-[#00DC82] pl-6 py-2 max-w-[920px] text-left">
        <p class="text-[34px] leading-snug font-semibold text-[#00DC82] line-clamp-3">
          {{ displayDescription }}
        </p>
      </div>
    </div>
    <!-- END OF OG-IMAGE COMPONENT HEADERLINK -->
  </div>
</template>
