<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const { data: page } = await useAsyncData(
  `/${locale.value}/index`,
  () => queryCollection('docs')
    .path(`/${locale.value}/`)
    .first()
)

// if (!page.value) {  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: false }) }

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page data returned null from database',
    fatal: false,
    // 💡 This injects real runtime data into the error block
    data: {
      searchedLocale: locale.value,
      expectedQueryPath: `/${locale.value}/index`,
      tip: 'Check your content folder names inside src/app/content/'
    }
  })
}

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description

useSeoMeta({
  titleTemplate: '',
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/docs-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/docs-light.png'
})

/*
onMounted(() => {
  // Get query parameters from the URL
  const urlParams = new URLSearchParams(window.location.search)
  const action = urlParams.get('action') // Gets the value of the 'action' parameter

  // Run a function based on the value
  if (action === 'queryA') {
    console.log('queryA')
  } else if (action === 'kMenu') {
    console.log('queryB')
  }
})

// Watch the entire query object
const route = useRoute()

watch(
  () => route.query,
  (newQuery) => {
    console.log('Query changed!', newQuery)
  },
  { deep: true }
)
// OR: Watch a specific parameter (e.g., ?search=...)
watch(
  () => route.query.search,
  (newSearch) => {
    console.log('Search term is now:', newSearch)
  }
)
*/
const pageId = usePageId()
pageId.value = ''
</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
    :prose="false"
  />
</template>
