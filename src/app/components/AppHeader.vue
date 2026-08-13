<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import * as locales from '@nuxt/ui/locale'

const { header } = useAppConfig()
const isDrawerOpen = ref(false)
const openMenu = useOpenMenu() // const globalValue = useGlobalValue()

const handleClose = (isOpen: boolean) => {
  console.log('isOpen?')
  if (!isOpen)
    openMenu.value = false
  else
    openMenu.value = true
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { width } = useWindowSize() as any
const toast = useToast()

defineShortcuts({
  meta_m: () => {
    if (width.value < 1024)
      isDrawerOpen.value = !isDrawerOpen.value
    else toast.add({ title: 'This menu - Not on wide screen!', description: 'Resize window < 1024 px to view this menu.' })
  }
})

const handleGlobalCommandPaletteFocus = (event: FocusEvent) => {
  const target = event.target as HTMLInputElement
  // 1. Identify the input (Nuxt UI Command Palette usually has no unique ID,
  // so we check for class or placeholder)
  if (target && (target.placeholder === 'Type a command or search…' || target.closest('input[placeholder="Type a command or search…"]'))) {
    // 2. If it's a "fresh" focus (not yet clicked), lock it
    if (!target.dataset.isUnlocked) {
      target.readOnly = true
      // 3. Attach your 'mousedown' logic once to this specific input
      target.addEventListener('mousedown', () => {
        target.readOnly = false
        target.dataset.isUnlocked = 'true'
        target.focus() // Force focus back after making it editable
      }, { once: true })
    }
  }
}

// Optional: Reset the state when the menu closes
const resetInputsOnGlobalClick = (event: MouseEvent) => {
  // If the user clicks outside or closes, we might want to let the guard
  // protect the input again next time it opens
  const target = event.target as HTMLElement
  if (!target.closest('input[placeholder="Type a command or search…"]')) {
    const input = document.querySelector('input[placeholder="Type a command or search…"]') as HTMLInputElement
    if (input) delete input.dataset.isUnlocked
  }
}

onMounted(() => {
  // 'focusin' catches the automatic focus before the keyboard can pop up
  document.addEventListener('focusin', handleGlobalCommandPaletteFocus)
  document.addEventListener('mousedown', resetInputsOnGlobalClick)
})

onUnmounted(() => {
  document.removeEventListener('focusin', handleGlobalCommandPaletteFocus)
  document.removeEventListener('mousedown', resetInputsOnGlobalClick)
})

/* ------------- TOGGLE LANGUAGE BUTTON ------------- */
const notMobile = ref(false)
// notMobile.value = width.value > 385
// not watching (width.value) or updating when width changes
onMounted(() => {
  notMobile.value = width.value > 385
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { $toggleLanguageOnMainPages } = useNuxtApp() as any
const { locale } = useI18n()
const uiLocale = computed(() => locales[locale.value as keyof typeof locales])
const { getPagePath } = useOppositeLanguage()

const isLang = ref(false)
const pageId = usePageId()
const router = useRouter()
const urlHash = useUrlHash()

const toggleLang = () => {
  isLang.value = isLang.value === true ? false : true
  locale.value = locale.value === 'en' ? 'da' : 'en'

  toast.add({ title: `${uiLocale.value.name} Translated Page`, description: '' })
  if (pageId !== null && pageId.value.length === 4) {
    // Grab your data from JSON
    const targetPath = getPagePath(pageId.value, locale.value)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [path, hash] = targetPath.split('#') as any
    const isHash = hash !== undefined

    if (isHash) {
      urlHash.value = hash
      navigateTo({
        path: path,
        hash: `#${hash || undefined}`, // `#${hash}`
        // This is your "message" to the router
        state: { skipHistoryScroll: true }
      })
    } else {
      router.push(path)
    }
  } else { // no pageId
    $toggleLanguageOnMainPages(locale.value)
  }
}
</script>

<template>
  <UHeader
    v-model:open="isDrawerOpen"
    :ui="{
      center: 'flex-1'
    }"
    :to="header?.to || '/'"
    mode="drawer"
    class="relative"
    @update:open="handleClose"
  >
    <!-- @update:open="handleClose" -->
    <UContentSearchButton
      v-if="header?.search"
      :collapsed="false"
      class="w-full"
    />

    <template
      v-if="header?.logo?.dark || header?.logo?.light || header?.title"
      #title
    >
      <UColorModeImage
        v-if="header?.logo?.dark || header?.logo?.light"
        :light="header?.logo?.light!"
        :dark="header?.logo?.dark!"
        :alt="header?.logo?.alt"
        class="h-6 w-auto shrink-0"
      />

      <span v-else-if="header?.title">
        {{ header.title }}
      </span>
    </template>

    <template
      v-else
      #left
    >
      <NuxtLink :to="header?.to || '/'">
        <AppLogo class="w-auto h-6 shrink-0" />
      </NuxtLink>

      <TemplateMenu />
    </template>

    <template #right>
      <UContentSearchButton
        v-if="header?.search"
        title="Search Menu"
        class="lg:hidden"
      />

      <UColorModeButton
        v-if="header?.colorMode"
        title="Toggle Color"
      />

      <template v-if="notMobile">
        <ClientOnly>
          <UButton
            title="Toggle Language"
            :icon="isLang ? 'i-fluent-local-language-24-filled' : 'i-ix-language-filled'"
            square
            color="neutral"
            variant="ghost"
            aria-label="Toggle Language"
            @click="toggleLang"
          />
        </ClientOnly>
      </template>
    </template>

    <!-- View of open menu on mobile screens -->
    <template #body>
      <!-- Content navigation menu with language toggle, select menu and traditional content nav -->
      <openHeaderMenu />
      <!-- -->
    </template>
  </UHeader>
</template>
