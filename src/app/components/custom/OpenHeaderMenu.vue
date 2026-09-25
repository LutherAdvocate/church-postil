<script setup lang="ts">
// compoents/custom/OpenHeaderMenu.vue
import { useI18n } from 'vue-i18n'
import * as locales from '@nuxt/ui/locale'
import type { AccordionItem, TabsItem } from '@nuxt/ui'
import { findPageChildren } from '@nuxt/content/utils'

const route = useRoute()
const router = useRouter()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { $toggleLanguageOnMainPages } = useNuxtApp() as any
const { getPagePath } = useOppositeLanguage()
const { locale } = useI18n()
const uiLocale = computed(() => locales[locale.value as keyof typeof locales])
const oldLocale = locale.value 
const openMenu = useOpenMenu()
const pageId = usePageId()

/// 1. Keep track of the language state reactively
// const currentLocaleState = ref(locale.value) // extracting the locale value from route.path

watch(openMenu, () => {
  if (openMenu.value === false) {
    if (oldLocale !== locale.value) {
      toast.add({ title: `${uiLocale.value.name} Translated Page`, description: '' })
      
      // 🚨 Fix 1: Identify if we are actively sitting on a document/note root page
      const isDocRootPage = route.path.endsWith('/note') || route.path.endsWith('/intro')
      
      // 🚨 Fix 2: Check if we are sitting strictly on a bare language index landing zone
      const isLandingIndexPage = route.path === '/' || route.path === '/da' || route.path === '/en'

      // 🌟 STEP 1: Handled in the first IF statement to manage index pages explicitly
      if (isLandingIndexPage) {
        // Handle transitions strictly for index landing zones here if needed, 
        // or let it pass gracefully.
      } 
      // 🌟 STEP 2: Explicitly intercept and PREVENT any redirection for da/note or da/intro
      else if (isDocRootPage) {
        // Do absolutely nothing. It breaks out of the loop and locks the page open!
        return
      } 
      // 🌟 STEP 3: The original sermon engine handles the 6 main hash pages safely inside the ELSE statement
      else { 
        if (pageId !== null && pageId.value && pageId?.value.length === 4) {
          const targetPath = getPagePath(pageId.value, locale.value)
          const [pathStr, hash] = targetPath.split('#')
          const isHash = hash !== undefined

          if (isHash) {
            urlHash.value = hash
            navigateTo({
              path: pathStr,
              hash: `#${hash || undefined}`,
              state: { skipHistoryScroll: true }
            })
          } else {
            router.push(pathStr)
          }
        } else { // no pageId
          // Runs your important hash redirection engine for the 6 main sermon pages!
          // !route.path.includes('/note') && $toggleLanguageOnMainPages(locale.value)
          if (!route.path.includes('/note'))
            $toggleLanguageOnMainPages(locale.value)
        }
      }
    }
  }
})

/* <!-- Tabs for toggle of language --> */
const tabs: TabsItem[] = [
  { label: 'English', icon: 'i-lucide:whole-word', slot: 'en', value: 'en' },
  { label: 'Danish', icon: 'i-lucide:languages', slot: 'da', value: 'da' }
]

const activeTab = ref(locale.value === 'en' ? 'en' : 'da')

watch(activeTab, (newTabValue: string, oldTabValue) => {
  console.log('watching activeTab')
  if (newTabValue !== oldTabValue) {
    console.log('watching activeTab inside IF')
    locale.value = newTabValue
    showToast(`Language changed`, `Close the menu to switch lang.`)
  }
})

const { data: nav_en } = await useAsyncData('filtered-nav1', () => {
  return queryCollectionNavigation('docs').where('path', 'LIKE', '/en/%')
})
const { data: nav_da } = await useAsyncData('filtered-nav2', () => {
  return queryCollectionNavigation('docs').where('path', 'LIKE', '/da/%')
})

// Filtering away the parent, /en or /da
const localeNavigation = computed(() => {
  // 💡 Step 1: Detect the real active language path directly from the route being built
  const currentUrlLang = route.path.startsWith('/da') ? 'da' : 'en'
  
  // Step 2: Grab the matching collection navigation database tree
  const nav_menu_value = currentUrlLang === 'en' ? nav_en.value : nav_da.value
  if (!nav_menu_value) return []

  // Step 3: Align targetPath with the real language tree being compiled
  const targetPath = `/${currentUrlLang}`
  
  // Pass the clean un-nested navigation collection straight into the parser
  const children = findPageChildren(nav_menu_value, targetPath)
  return children || nav_menu_value
})


/* <!-- Select Menu for more alternatives --> */
type RowCells = {
  id: string
  postil: string
  tags: string
  label: string
  bible: string
  type: never
  icon: string 
  description: string
}

const urlHash = useUrlHash()
const selectMenu = ref(false)

const lang = computed(() => route.path.startsWith('/da') ? 'da' : 'en')
const fetchUrl = computed(() => `/api/${lang.value}`)

console.log('STARING OPENHEADERMENU')
const { data: sermons } = await useFetch<RowCells[]>(
  () => fetchUrl.value, 
  {
    // Fix 1: Static data-cache key based on target language instead of volatile dynamic path
    key: `api-select-menu-data-${lang.value}`, 
    transform: (data) => {
      return data?.map(sermon => ({
        ...sermon,
        label: `${sermon.label} - ${sermon.bible || ''}`,
        icon: sermon.icon || '&nbsp;', 
        tooltip: `${sermon.label} - ${sermon.bible || ''}`,
        // Fix 3: Accept the event parameter context cleanly
        onSelect: (e: Event) => {
          // 💡 Command the pnpm v12 server pass to completely skip this block at build time:
          if (e) {
            e.preventDefault()
            e.stopPropagation()
          }
          
          showToast(`${sermon.label} selected`, `Sermon opens in a new window`)
          
          // Explicitly shut the dropdown modal down right away before moving
          selectMenu.value = false
          openMenu.value = false

          const targetPath = getPagePath(sermon.id, locale.value)
          const [targetUrlPath, hash] = targetPath.split('#')
          const isHash = hash !== undefined

          if (isHash) {
            urlHash.value = hash
            navigateTo({
              path: targetUrlPath,
              hash: `#${hash}`,
              state: { skipHistoryScroll: true }
            })
          } else {
            router.push(targetUrlPath)
          }
        }
      }))
    },
    server: true,
    lazy: false
  }
)

const toast = useToast()
function showToast(title: string, description: string) {
  toast.add({
    title,
    description,
    icon: 'i-lucide:wifi',
    close: { color: 'secondary', variant: 'outline', class: 'rounded-full' }
  })
}

const footerMenuAccordion = ref<AccordionItem[]>([
  { label: 'About Luther\'s Church Postil', icon: 'i-iconoir-church' }
])
const footerMenuAccordionTabs = ref<TabsItem[]>([
  {
    label: 'Languages',
    icon: 'i-lucide:toggle-right',
    content: `Toggle between English and Danish version of Luther's Church Postil.`
  },
  {
    label: 'About',
    icon: 'i-lucide:file-question-mark',
    content: `- Double click or highlight text to add notes. Share them or view them through the movable pop up menu.`
  }
])

const openedPaths = useState('nav-persistent-state', () => [])

const whenSelectMenuOpens = () => {
  document.addEventListener('mousedown', handleSelectMenuInputFocus)
}

const handleSelectMenuInputFocus = (event: MouseEvent) => {
  if (selectMenu.value === false) return
  const target = event.target as HTMLInputElement
  if (target && target.placeholder === 'Filter Sermons...') {
    target.readOnly = false
    target.focus()
  }
}

watch(selectMenu, (newValue) => {
  if (newValue === false) {
    document.removeEventListener('mousedown', handleSelectMenuInputFocus)
  }
})
// Source: https://mail.google.com/mail/u/0/?tab=rm&ogbl#drafts?compose=lLtBPchzQqbPFGfkgqdjLjnTHXTrKvWcSNSzPTFwbhldJXtZVDlmKdmFhlNFtQBmxwvNDgzl
</script>

<template>
  <UCard>
    <!-- onFocus: (e) => e.target.removeAttribute('readonly'), -->
    <template #header>
      <USelectMenu
        :ref="whenSelectMenuOpens"
        v-model:open="selectMenu"
        :placeholder="`${locale === 'en' ? 'Sermons Luther\'s Church Postil' : 'Prædikener Luthers Postiller'}`"
        icon="i-lucide:search"
        trailing-icon="i-lucide:arrow-down"
        :items="sermons"
        :search-input="{
          id: 'selectMenuInputFilter',
          placeholder: `${locale === 'en' ? 'Filter Sermons...' : 'Filtrer Prædikener...'}`,
          icon: 'i-lucide:search',
          readonly: true
        }"
        :ui="{/* input: '[&>input]:cursor-pointer' */ }"
        class="w-full"
      >
        <template #item-label="{ item }">
          <!-- @vue-expect-error  Property 'tooltip' does not exist on type 'AcceptableValue... -->
          <UTooltip :text="item?.tooltip">
            <!-- @vue-expect-error  Property 'label' does not exist on type 'AcceptableValue... -->
            <span v-if="typeof item !== 'string' && 'label' in item">{{ item?.label }}</span>
            <span v-else>Error: No label</span>
          </UTooltip>
        </template>
      </USelectMenu>
    </template>

    <UTabs
      v-model="activeTab"
      :items="tabs"
    >
      <!-- <UTabs @click="closeMenuAndUpdate" -->
      <template #en>
        <UContentNavigation
          highlight
          highlight-color="primary"
          :navigation="localeNavigation"
          type="single"
          :default-open="false"
          class="pl-2 pr-2"
        />
        <a
          href="/da/notes"
          class="pl-2.5"
        >
          <UIcon
            name="i-heroicons:academic-cap-20-solid"
            class="size-5"
          />
          Userguide: How to create notes?
        </a>
      </template>

      <template #da>
        <UContentNavigation
          v-model:open="openedPaths"
          highlight
          highlight-color="primary"
          :navigation="localeNavigation"
          type="single"
          :default-open="true"
          class="pl-2 pr-2"
        />
      </template>
    </UTabs>

    <template #footer>
      <UAccordion :items="footerMenuAccordion">
        <template #body="{ }">
          <!-- <template #body="{ item }" -->
          <UTabs
            :unmount-on-hide="false"
            :items="footerMenuAccordionTabs"
            color="neutral"
            class="w-full"
          />
        </template>
      </UAccordion>
    </template>
  </UCard>
</template>
