import { createI18n } from 'vue-i18n'
import en from '~~/src/locales/en.json'
import da from '~~/src/locales/da.json'

export default defineNuxtPlugin(({ vueApp }) => {
  const route = useRoute()

  // 1. Detect language from the URL immediately (Works on both Server and Client)
  // If path starts with /da, use 'da', otherwise default to 'en'
  const initialLocale = route.path.startsWith('/da') ? 'da' : 'en'

  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: initialLocale, // Set it here so the Server knows!
    messages: {
      en,
      da
    }
  })

  vueApp.use(i18n)

  // 2. Keep this for Client-side updates if the user clicks a link
  if (import.meta.client) {
    watch(() => route.path, (newPath) => {
      const nextLocale = newPath.startsWith('/da') ? 'da' : 'en'
      if (i18n.global.locale.value !== nextLocale) {
        i18n.global.locale.value = nextLocale
      }
    })
  }
})
