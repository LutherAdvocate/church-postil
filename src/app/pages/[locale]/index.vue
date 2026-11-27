<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
// const { path } = useRoute()

const { data: page } = await useAsyncData(
  `/${locale.value}/index`,
  () => queryCollection('docs')
    .path(`/${locale.value}/`)
    .first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: false })
}

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description

const { ogUrl } = useOgRouteState(page.value?.body)

useSeoMeta({
  titleTemplate: '',
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogUrl:  () => ogUrl
  // ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/docs-light.png',
  // twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/docs-light.png'
})

defineOgImage('Root', {
  headline: 'Luther\'s Church Postil',
  title: 'For Luther Students',
  description: 'With a lot of Study Tools and Share Options',
})

/*
onMounted(() => {
  // Get query parameters from the URL
  const urlParams = new URLSearchParams(window.location.search)
  const action = urlParams.get('action') // Gets the value of the 'action' parameter

  // Do something based on the value
  if (action === 'queryA') {
    console.log('queryA')
  } else if (action === 'queryB') {
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
pageId.value = '2'

</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
    :prose="false"
  />
</template>
