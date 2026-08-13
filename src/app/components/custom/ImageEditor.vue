<script setup lang="ts">
// Source: https://gemini.google.com/share/7b2243e3ed02
import LZString from 'lz-string'
import { useClipboard } from '@vueuse/core'

const route = useRoute()
const { imageData, openEditor } = useImageState()

// v4 Accordion Items
const editorItems = [
  {
    label: '1. Live Preview',
    title: 'Collapse the Live Preview and view the edit options!',
    icon: 'i-heroicons-eye',
    slot: 'preview'
  },
  {
    label: '2. Edit Quote',
    title: 'Collapse the Edit of headline, title and/or description',
    icon: 'i-heroicons-pencil-square',
    slot: 'edit'
  }
]

// Determine default open states: On small screens, maybe just open 'edit'
const openItems = ref(['0', '1'])

const toast = useToast()

// Inside ImageEditor.vue <script setup>

/* ----- OPEN AND VIEW THE FINAL IMAGE ----- */

// const { $syncToOG, $ogImageData } = useNuxtApp()

const openPreview = () => {
  // Encode the text so the URL doesn't break
  const h = encodeURIComponent(imageData.value.content.h) // headline
  const t = encodeURIComponent(imageData.value.content.t)
  const d = encodeURIComponent(imageData.value.content.d)

  const isMobile = imageData.value.layout === 'Mobile'
  const wx = isMobile ? 720 : 1200
  const hy = isMobile ? 1280 : 630
  // This URL sends the data directly to the Node.js server
  const url = `/__og-image__/image${route.path}/og.png?h=${h}&t=${t}&d=${d}&component=${imageData.value.layout}&width=${wx}&height=${hy}`

  window.open(url, '_blank')
}

const getAnchorUrl = () => {
  // 1. Normalize for a fair comparison
  const normalize = (text: string) => {
    return text.replace(/[«»"']/g, '').replace(/\s+/g, ' ').trim().toLowerCase()
  }

  const rawQuote = imageData.value.content.d
  const seeker = normalize(rawQuote).substring(0, 40)

  const paragraphs = document.querySelectorAll('p')
  let targetElement: HTMLElement | null = null

  // 2. Find the paragraph
  for (const p of paragraphs) {
    if (normalize(p.textContent || '').includes(seeker)) {
      targetElement = p as HTMLElement
      break
    }
  }

  let sectionId = ''
  if (targetElement) {
    let current: HTMLElement | null = targetElement

    // 3. The "Up and Out" strategy
    while (current && current.tagName !== 'BODY') {
      let sibling = current.previousElementSibling

      while (sibling) {
        if (/^H[1-6]$/i.test(sibling.tagName)) {
          // Look for the span with the ID deep inside the header
          // This will find Header > Anchor > Span[id]
          const elementWithId = sibling.querySelector('[id]')

          if (elementWithId && elementWithId.id) {
            sectionId = `#${elementWithId.id}`
            console.log('✅ Found Deep ID:', sectionId)
            break
          }
        }
        sibling = sibling.previousElementSibling
      }

      if (sectionId) break
      current = current.parentElement
    }
  } // https://gemini.google.com/share/a0b416652f6b

  return `${window.location.origin}${route.path}${sectionId}`
} // https://gemini.google.com/share/9aabcd75c390

const { copy, copied } = useClipboard()

const createPostWithImageAndUrl = async () => {
  // 1. Gather the data exactly as the Editor sees it
  const dataToZip = {
    h: imageData.value.content.h,
    t: imageData.value.content.t,
    d: imageData.value.content.d
  }

  // 2. Zip it for a "Lean" Social Media URL
  const z = LZString.compressToEncodedURIComponent(JSON.stringify(dataToZip))

  // 3. Build the Image URL
  // We match your width/height logic from openPreview
  const isMobile = imageData.value.layout === 'Mobile'
  const wx = isMobile ? 720 : 1200
  const hy = isMobile ? 1280 : 630

  const imageUrl = `${window.location.origin}/__og-image__/image${route.path}/og.png?z=${z}&component=${imageData.value.layout}&width=${wx}&height=${hy}`

  // 2. Get the Anchor Link (The "Real" Link for the Reader)
  // const sectionId = getNearestSectionId(currentElement)
  // const anchorUrl = `${window.location.origin}${route.path}${sectionId}`

  const anchorUrl = getAnchorUrl()

  // 4. Send to Clipboard / Web Share
  // const fullMessage = `Check out this Luther Quote:\n\n"${dataToZip.d}"\n\nView Image: ${imageUrl}`

  const finalPost = `
Check out this Luther Quote:

${dataToZip.d} 

---
Image:
${imageUrl}

Source:
${anchorUrl}
  `.trim()

  const source = 'Source:'
  const post = finalPost.split(source)[0] + source
  copy(anchorUrl)

  // 4. Send to Clipboard / Web Share
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Shared Luther Quote',
        text: `${post}`, // « »
        url: anchorUrl // This link contains the compressed data
      })
    } catch (err) {
      console.log('Share cancelled or failed', err)
    }
  } else {
    // Fallback for PC: Copy to Clipboard
    await navigator.clipboard.writeText(finalPost)
    toast.add({ title: 'Copied Post!', description: 'Past (quote & links to image and source) from clipboard to Post' })
  }
}

const shareUrlOfZipImage = async () => {
  // 1. Gather the data exactly as the Editor sees it
  const dataToZip = {
    h: imageData.value.content.h,
    t: imageData.value.content.t,
    d: imageData.value.content.d
  }

  // 2. Zip it for a "Lean" Social Media URL
  const z = LZString.compressToEncodedURIComponent(JSON.stringify(dataToZip))

  // 3. Build the Image URL
  // We match your width/height logic from openPreview
  const isMobile = imageData.value.layout === 'Mobile'
  const wx = isMobile ? 720 : 1200
  const hy = isMobile ? 1280 : 630

  const imageUrl = `${window.location.origin}/__og-image__/image${route.path}/og.png?z=${z}&component=${imageData.value.layout}&width=${wx}&height=${hy}`

  // immediately copy url to clipboard before the share window open
  copy(imageUrl)
  // 4. Send to Clipboard / Web Share
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Shared Luther Quote',
        // text: `${imageData.value.content.d}`, // « »
        url: imageUrl // This link contains the compressed data
      })
    } catch (err) {
      console.log('Share cancelled or failed', err)
    }
  } else {
    // Fallback for PC: Copy to Clipboard
    await navigator.clipboard.writeText(imageUrl)
    toast.add({ title: 'Link Copied!', description: 'Ready to paste in your browser.' })
  }
}

/* ------------- NOTE OVERVIEW --------------- */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { $localeDate } = useNuxtApp() as any
const { allNotes } = useNotes()
const quotesApostrophes = (text) => {
  const match = text.match(/«(.*?)»/)
  if (match) {
    return text = match[1]
  } else return text
}
const router = useRouter()
const movableMenuOpen = ref(false)

const goToNote = (note) => {
  // Ensure the ID is attached so the destination page knows where to look
  const pathWithHash = `${note.path}#note-${note.id}`
  router.push(pathWithHash)
  movableMenuOpen.value = false
}

// 1. Create a clean, flat list of items
const noteItems = computed(() => {
  return allNotes.value.map(note => ({
    id: note.id,
    // The main text shown in the list
    label: `${quotesApostrophes(note.text) + ' | ' + note.title}` || 'No note here!',
    description: note.path || '',
    icon: 'i-heroicons-pencil-square',
    // Keep the metadata for tooltips or custom slots
    title: `..${note.path} \n${note.title} \n${note.text} \n${$localeDate(note.id)}`,
    // Define the action directly on the item
    onSelect: () => goToNote(note)
  }))
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const selectedNote = ref<any>(null)

const ctx = imageData.value.pageContext // ctx.title gives page title etc. then we also have ctx.description and ctx.path

function onNoteSelect(item) {
  if (!item) return

  // You can call your goToNote function directly here
  openEditor({
    h: ctx.title.slice(0, 28),
    t: ctx.title, // The "Parents" go here - if shared header
    d: item.label || 'Note' // The "Clicked Header" goes here - if shared header
  })
}
</script>

<template>
  <USlideover
    v-model:open="imageData.showEditor"
    title="Edit Notes and Share Images"
    :ui="{
      body: 'pt-0 pr-0 pl-0 pb-2', // THIS removes the space around your preview!
      footer: 'py-0'
    }"
  >
    <!-- :description="imageData.content.h || 'Image Editor'" -->
    <template #body>
      <!-- SELECT MENU OVERVIEW HIGHLIGHTS & NOTES -->
      <div class="px-1 pb-1">
        <USelectMenu
          v-model="selectedNote"
          :items="noteItems"
          :placeholder="allNotes.length > 0 ? 'Select highlight, notes to edit/ share...' : 'Create note bobbles or highlight text!'"
          :search-input="{
            id: 'selectMenuInputFilter',
            placeholder: allNotes.length > 0 ? 'Filter Highligh & Notes...' : 'Created notes can be selected her...',
            icon: 'i-lucide-search',
            readonly: true
          }"
          icon="i-lucide-circle-check"
          by="id"
          class="w-full px-2"
          @update:model-value="onNoteSelect"
        >
          <!--
          @update:model-value="(val) => val?.onSelect?.()"
          full content width :ui="{ content: 'min-w-fit' }"
          -->
          <template #item="{ item }">
            <div class="flex items-center gap-2 min-w-0 w-full">
              <UIcon
                :name="item.icon"
                class="shrink-0 size-4"
              />

              <div class="flex flex-col min-w-0">
                <span class="truncate font-medium text-sm">
                  {{ item.label }}
                </span>
                <span class="ml-2 truncate text-xs text-(--ui-text-muted)">
                  {{ item.description }}
                </span>
              </div>
            </div>
          </template>
        </USelectMenu>
      </div>
      <UAccordion
        v-model="openItems"
        :items="editorItems"
        variant="ghost"
        type="multiple"
      >
        <template #preview>
          <div class="rounded-xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col">
            <!-- Button Group with  Preview (Mobile/ Docs) & Live View -->
            <div class="px-3 flex items-center justify-between bg-slate-900/95 p-2 border-t border-slate-800">
              <URadioGroup
                v-model="imageData.layout"
                color="primary"
                size="lg"
                :items="['Mobile', 'Docs']"
                :title="imageData.layout === 'Mobile' ? 'Preview Mobile Image (600x1280)' : 'Preview Docs (1230x600)'"
                orientation="horizontal"
              />

              <div class="flex items-center gap-1">
                <UButton
                  :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-clipboard-copy'"
                  title="Create Post - Copy/past text & links of image & source to post!"
                  color="primary"
                  variant="ghost"
                  size="lg"
                  @click="createPostWithImageAndUrl"
                />

                <UButton
                  :icon="copied ? 'i-lucide-copy-check' : 'i-heroicons-share'"
                  title="Copy/ past Image Url (link)!"
                  color="primary"
                  variant="ghost"
                  size="lg"
                  @click="shareUrlOfZipImage"
                />

                <UButton
                  icon="i-heroicons-magnifying-glass-plus"
                  title="Full view of share image!"
                  color="primary"
                  variant="ghost"
                  size="lg"
                  @click="openPreview"
                />
              </div>
            </div>
            <!-- MOBILE AND DOCS PREVIEW -->
            <div
              class="relative w-full flex flex-col justify-center overflow-hidden transition-all duration-500"
              :class="[
                imageData.layout === 'Mobile' ? 'aspect-[9/16] bg-[#0f172a]' : 'aspect-video bg-[#020420]'
              ]"
            >
              <div class="absolute -right-10 top-10 opacity-[0.07] text-[#00DC82]" />

              <!-- Mobile View -->
              <div
                v-if="imageData.layout === 'Mobile'"
                class="relative z-10 flex flex-col p-6 pt-8 h-full justify-between"
              >
                <div class="flex flex-col">
                  <p class="text-[#00DC82] uppercase font-bold text-[15px] tracking-wide mb-2">
                    {{ imageData.content.h }}
                  </p>
                  <h1 class="text-white text-xl font-black mb-4 leading-tight">
                    {{ imageData.content.t }}
                  </h1>
                  <p class="text-slate-300 text-[22px] italic leading-relaxed border-l-4 border-[#00DC82]/30 pl-3">
                    {{ imageData.content.d }}
                  </p>
                </div>
                <div class="bg-[#1e293b] py-2 border-t-2 border-[#00DC82] text-center -mx-6 -mb-6">
                  <span class="text-[#00DC82] text-[14px] font-mono tracking-[0.2em] uppercase">CHURCH-POSTIL.VERCEL.APP</span>
                </div>
              </div>

              <!-- Docs (wide) View -->
              <div
                v-else
                class="relative z-10 pl-8 pr-4 flex flex-col"
              >
                <p
                  v-if="imageData.content.h"
                  class="uppercase text-[10px] text-[#00DC82] mb-1 font-semibold"
                >
                  {{ imageData.content.h }}
                </p>

                <h1
                  class="ml-2 text-[14px] mb-3 text-white font-medium"
                >
                  {{ imageData.content.t }}
                </h1>
                <!--
                This was inside h1 (above) under the line with class="ml-2 text-[14px] etc."
                :class="{ 'opacity-60': !!imageData.content.s }"

                <div
                  v-if="imageData.content.s"
                  class="flex flex-col gap-1"
                >
                  <div class="text-[#E4E4E7] text-[10px] ml-4 border-l-2 border-[#00DC82] pl-2 opacity-80">
                    {{ imageData.content.s }}ssss
                  </div>
                </div>
              -->

                <!-- No need for v-else below in the p-tag when skipping the s values above -->
                <p
                  class="text-[12px] text-[#E4E4E7] ml-6 border-l-2 border-[#00DC82] pl-3 leading-tight max-w-[80%] italic"
                >
                  {{ imageData.content.d }}
                </p>
              </div>
            </div>
          </div>
        </template>

        <template #edit>
          <div class="space-y-6 px-4">
            <UFormField
              title="Headline (Max 29 chars)"
              class="py-0 my-1"
            >
              <UInput
                v-model="imageData.content.h"
                maxlength="40"
                class="w-full"
              />
            </UFormField>
            <!--  variant="subtle"
                placeholder="e.g. Church Postil 1522"
            -->

            <UFormField
              title="Title (Max 60 chars), or parents - if shared header"
              class="py-0 my-1"
            >
              <UTextarea
                v-model="imageData.content.t"
                autoresize
                :rows="1"
                class="w-full"
                maxlength="200"
              />
            </UFormField>

            <UFormField
              title="Quote / Description (Max 230/300 chars), or header if shared header"
              class="pt-0 my-0"
            >
              <UTextarea
                v-model="imageData.content.d"
                autoresize
                :rows="3"
                class="w-full"
                maxlength="300"
              />
            </UFormField>
          </div>
        </template>
      </UAccordion>
    </template>

    <template #footer>
      <div
        class="flex w-full border-t border-gray-200 dark:border-gray-800"
      >
        <UButton
          title="Create Post: Copy/ past text, image and link to a post etc."
          :trailing-icon="copied ? 'i-lucide-copy-check' : 'i-lucide-clipboard-copy'"
          color="neutral"
          variant="outline"
          class="flex-1 py-2 flex flex-col items-center justify-center gap-1 border-r border-gray-200 dark:border-gray-800"
          @click="createPostWithImageAndUrl"
        >
          <span class="text-xs font-medium uppercase tracking-wider">
            Copy 2 Post
          </span>
        </UButton>

        <UButton
          title="Share - Get URL (Link) to the Image"
          :trailing-icon="copied ? 'i-lucide-copy-check' : 'i-heroicons-share'"
          color="primary"
          class="flex-1 py-2 flex flex-col items-center justify-center gap-1"
          @click="shareUrlOfZipImage"
        >
          <span class="text-xs font-medium uppercase tracking-wider">
            Share Image
          </span>
        </UButton>
      </div>
    </template>
  </USlideover>
</template>

<style scooped>
.ui-slideover-content {
  /* This ensures the slideover height accounts for browser toolbars and keyboards */
  height: 100dvh
}
</style>
