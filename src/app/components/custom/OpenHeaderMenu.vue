<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import * as locales from '@nuxt/ui/locale'
import type { AccordionItem, TabsItem } from '@nuxt/ui'
import { findPageChildren } from '@nuxt/content/utils'
// import { nextTick } from 'vue'

const { path } = useRoute()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { $toggleLanguageOnMainPages } = useNuxtApp() as any
const { getPagePath } = useOppositeLanguage()
const { locale } = useI18n()
const uiLocale = computed(() => locales[locale.value as keyof typeof locales])
const oldLocale = locale.value // updating it on close click
const openMenu = useOpenMenu()
const pageId = usePageId()

watch(openMenu, (/* newValue, oldValue */) => {
  if (openMenu.value === false) {
    if (oldLocale !== locale.value) {
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
  }
  // console.log(`Global variable "openMenu" was changed from "${oldValue}" to "${newValue}"`)
})

// const toggleMenu = () => { openMenu.value = !openMenu.value }

/* <!-- Tabs for toggle of language --> */

const tabs: TabsItem[] = [
  {
    label: 'English',
    icon: 'i-iconoir-language',
    slot: 'en',
    value: 'en'
  },
  {
    label: 'Danish',
    icon: 'i-lucide-languages',
    slot: 'da',
    value: 'da'
  }
]

// 1. Read the locale value and set the correct tab active
const activeTab = ref(locale.value === 'en' ? 'en' : 'da')

// 2. Watch the activeTab variable for changes
watch(activeTab, (newTabValue: string, oldTabValue) => {
  // Optional: check if the new value is different from the old one before running the function
  if (newTabValue !== oldTabValue) {
    locale.value = newTabValue
    showToast(`Language changed`, `Close the menu to switch lang.`)
  }
})

// const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
const { data: nav_en } = await useAsyncData('filtered-nav1', () => {
  return queryCollectionNavigation('docs')
    .where('path', 'LIKE', '/en/%') // Only include items starting with this path
})
const { data: nav_da } = await useAsyncData('filtered-nav2', () => {
  return queryCollectionNavigation('docs')
    .where('path', 'LIKE', '/da/%') // Only include items starting with this path
})

// filtering away the parent, /en or /da
const localeNavigation = computed(() => {
  const nav_menu = locale.value === 'en' ? nav_en : nav_da
  if (!nav_menu.value) return []

  const targetPath = `/${locale.value}`
  const children = findPageChildren(nav_menu.value, targetPath)
  return children || nav_menu.value // Fallback or adjust logic
})

/* <!-- Select Menu for more alternatives --> */
type RowCells = {
  id: string
  postil: string
  tags: string
  label: string
  bible: string
  // value: string
  type: never
  icon: string // creates one tab on sermons
  description: string
}

const router = useRouter()
const urlHash = useUrlHash()

const lang = path.startsWith('/da') ? 'da' : 'en'
// 1. Construct the URL as a plain string first
// 2. Add the query manually to the string to avoid the 'query' property error
const fetchUrl = computed(() => `/api/${lang}`)

const { data: sermons } = await useFetch<RowCells[]>(
  fetchUrl.value, // `/api/${locale.value}
  {
    key: `api-select-menu-${path}}`, // ${Math.random()
    transform: (
      data
    ) => {
      return data
        ?.map(sermon => ({
          ...sermon,
          label: `${sermon.label} - ${sermon.bible === undefined ? '' : sermon.bible}`,
          icon: sermon.icon === undefined ? '&nbsp;' : sermon.icon, // This creates a tab on sermons
          tooltip: `${sermon.label} - ${sermon.bible === undefined ? '' : sermon.bible}`,
          onSelect: () => {
            showToast(`${sermon.label} selected`, `Sermon opens in a new window`)

            const targetPath = getPagePath(sermon.id, locale.value)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const [path, hash] = targetPath.split('#') as any
            console.log('hash? ', hash)
            const isHash = hash !== undefined

            if (isHash) {
              console.log('isHash navigateTo ...')
              urlHash.value = hash
              navigateTo({
                path: path,
                hash: `#${hash || undefined}`, // `#${hash}`
                // This is your "message" to the router
                state: { skipHistoryScroll: true }
              })
            } else {
              console.log('router.push(path) running')
              router.push(path)
            }
            /*
            navigateTo(`${getPagePath(sermon.id, locale.value)}`, {
              external: false
              open: {
                target: '_blank',
                windowFeatures: { width: 800, height: 600 }
              }
            }) */
          }
        }))
    },
    server: true,
    lazy: false
  }
)

const toast = useToast()
function showToast(title, description) {
  toast.add({
    title: title,
    description: description,
    icon: 'i-lucide-wifi',
    close: {
      color: 'secondary',
      variant: 'outline',
      class: 'rounded-full'
    }
  })
}

const footerMenuAccordion = ref<AccordionItem[]>([
  {
    label: 'About Luther\'s Church Postil',
    icon: 'i-iconoir-church'
  }
])
const footerMenuAccordionTabs = ref<TabsItem[]>([
  {
    label: 'Languages',
    icon: 'i-lucide-toggle-right',
    content: `
      Toggle between English and Danish version of Luther's Church Postil.
    `
  },
  {
    label: 'About',
    icon: 'i-lucide-file-question-mark',
    content: `
      - Double click or highlight text to add notes. Share them or view them trough the movable pop up menu in the bottom right corner.
    `
  }
])

/* Open the UContentNavigation where it was last open */
const openedPaths = useState('nav-persistent-state', () => [])

const whenSelectMenuOpens = (/* el: any */) => {
  document.addEventListener('mousedown', handleSelectMenuInputFocus)
}

const selectMenu = ref(false)

const handleSelectMenuInputFocus = (event: MouseEvent) => {
  if (selectMenu.value === false) return
  // Element in Select Menu was clicked. Checking if it was input field...
  const target = event.target as HTMLInputElement
  // Check if the clicked element is our specific search input
  if (target && target.placeholder === 'Filter Sermons...') {
    // 1. Remove the read-only state to allow typing
    target.readOnly = false
    target.focus() // Ensure it stays focused after the flip
  }
}

watch(selectMenu, async (newValue/* , oldValue */) => {
  if (newValue === false)
    document.removeEventListener('mousedown', handleSelectMenuInputFocus)
})
</script>

<template>
  <UCard>
    <!-- onFocus: (e) => e.target.removeAttribute('readonly'), -->
    <template #header>
      <USelectMenu
        :ref="whenSelectMenuOpens"
        v-model:open="selectMenu"
        :placeholder="`${locale === 'en' ? 'Sermons Luther\'s Church Postil' : 'Prædikener Luthers Postiller'}`"
        icon="i-lucide-search"
        trailing-icon="i-lucide-arrow-down"
        :items="sermons"
        :search-input="{
          id: 'selectMenuInputFilter',
          placeholder: `${locale === 'en' ? 'Filter Sermons...' : 'Filtrer Prædikener...'}`,
          icon: 'i-lucide-search',
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
            name="i-mdi-learn"
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
