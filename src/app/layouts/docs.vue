<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

onMounted(() => {
  /*
  Showing the title of the main chapters on two or more lines.
  Extend the code to do this also for subchapters.
  */
  const elements = document.querySelectorAll('li > button > span:first-child')
  // console.log('The numbers of selected elements is ' + elements.length)
  if (elements) {
    elements.forEach((element) => {
      // console.log('The selected elements is ' + element.innerHTML)
      element.classList.remove('truncate')
      element.classList.add('truncate-none')
      element.classList.add('text-left')
    })
  }
})
</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UPageAside>
          <UContentNavigation
            highlight
            :navigation="navigation"
            type="single"
            :default-open="true"
            class="nav-with-custom-style"
          />
        </UPageAside>
      </template>

      <slot />
    </UPage>
  </UContainer>
</template>
