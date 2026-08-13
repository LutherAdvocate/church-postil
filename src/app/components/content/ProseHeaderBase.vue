<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const props = defineProps<{
  id: string
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}>()

const { /* copy, */ copied } = useClipboard({ legacy: true })

const { openEditor, imageData, headlineT } = useImageState()

const getBreadcrumbs = (el: HTMLElement) => {
  // 1. Find all headers on the page
  const headers = Array.from(document.querySelectorAll('h2, h3, h4, h5, h6'))
  // 2. Find where the clicked header is in that list
  const currentIndex = headers.indexOf(el)
  if (currentIndex === -1) return ''

  const breadcrumbs: string[] = []
  const currentLevel = parseInt(el.tagName.substring(1))
  let lastLevel = currentLevel

  // 3. Walk backwards through the headers to find parents
  for (let i = currentIndex - 1; i >= 0; i--) {
    const h = headers[i] as HTMLElement
    const level = parseInt(h.tagName.substring(1))

    if (level < lastLevel) {
      // Remove '#' and extra whitespace
      const cleanText = h.innerText.replace('#', '').trim()
      breadcrumbs.unshift(cleanText)
      lastLevel = level
    }
    // Stop if we hit the highest level (H2)
    if (level === 2) break
  }

  return breadcrumbs.join(' > ')
}

const handleShareClick = () => {
  // 1. Get the element using the ID provided by Nuxt Content
  const targetElement = document.getElementById(props.id)

  if (!targetElement) {
    console.error('Critical: Could not find element with ID:', props.id)
    return
  }

  // 2. Use the tool to get the string
  const breadcrumbString = getBreadcrumbs(targetElement)

  // 2. We grab the text of the header we clicked DIRECTLY from the screen
  const clickedHeaderText = targetElement.innerText.replace('#', '').trim()
  // 3. Send the data to your Image Editor

  imageData.value.content.h = headlineT.value
  imageData.value.content.t = breadcrumbString
  imageData.value.content.d = clickedHeaderText

  openEditor({
    h: headlineT.value?.slice(0, 29),
    t: breadcrumbString, // The "Parents" go here
    d: clickedHeaderText || 'Clicked H el.' // The "Header" goes here
  })
}

const sizes = {
  h1: 'text-4xl', h2: 'text-3xl', h3: 'text-2xl',
  h4: 'text-xl', h5: 'text-lg', h6: 'text-base'
}
</script>

<template>
  <component
    :is="tag"
    :id="id"
    ref="headerRef"
    class="group relative font-bold mb-4 mt-8 scroll-mt-24 tracking-tight"
    :class="sizes[tag]"
  >
    <NuxtLink
      :to="`#${id}`"
      title="Click to Copy this link for SHARING"
      class="no-underline hover:text-primary-600 dark:hover:text-primary-400 transition-colors inline"
    >
      <slot />

      <span
        class="inline-flex items-center ml-2 align-middle cursor-pointer transition-all duration-200"
        :class="[
          copied ? 'text-primary-500 scale-110 opacity-100' : 'text-gray-400 opacity-100 md:opacity-0 md:group-hover:opacity-100'
        ]"
        @click="handleShareClick"
      >
        <UIcon
          :name="copied ? 'i-lucide-check' : 'i-lucide-share-2'"
          class="w-[0.6em] h-[0.6em]"
        />

        <Transition name="pop">
          <span
            v-if="copied"
            class="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-primary-500 text-white px-2 py-0.5 rounded shadow-sm whitespace-nowrap normal-case font-medium"
          >
            Copied!
          </span>
        </Transition>
      </span>
    </NuxtLink>
  </component>
</template>

<style scoped>
/* Animation for the "Copied!" bubble */
.pop-enter-active { transition: all 0.2s ease-out; }
.pop-leave-active { transition: all 0.5s ease-in; }
.pop-enter-from { opacity: 0; transform: translate(-50%, 10px) scale(0.8); }
.pop-leave-to { opacity: 0; transform: translate(-50%, -10px); }

/* Ensure the header doesn't have a giant gap when wrapping */
h1, h2, h3, h4, h5, h6 {
  line-height: 1.2;
}
</style>
