<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'
import { useI18n } from 'vue-i18n'
import * as locales from '@nuxt/ui/locale'

const { locale } = useI18n()
const uiLocale = computed(() => locales[locale.value as keyof typeof locales])

const { seo } = useAppConfig()

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs'))
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('docs'), {
  server: false
})

useSeoMeta({
  titleTemplate: `%s - ${seo?.siteName}`,
  ogSiteName: seo?.siteName,
  twitterCard: 'summary_large_image',
  googleSiteVerification: 'OBR08WFLQQiJUKuLzi19h9dr7I99cVDn5UzDi9mAjwA'
})

provide('navigation', navigation)

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: uiLocale.value.code || 'en',
    dir: uiLocale.value.dir || 'ltr'
  }
})

// app.vue
onMounted(() => {
  if ('scrollRestoration' in window.history) {
    // window.history.scrollRestoration = 'manual'
  }
})
</script>

<template>
  <UApp>
    <!-- <PrintNotesLayer /> -->

    <NuxtLoadingIndicator />

    <Analytics />

    <AppHeader />

    <UMain class="main-body-content">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
      />
    </ClientOnly>
  </UApp>
</template>
