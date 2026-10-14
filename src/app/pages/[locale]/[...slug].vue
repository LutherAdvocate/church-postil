<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
// source loading and saving json with id and files: https://gemini.google.com/share/1f70050d441f
import { useI18n } from 'vue-i18n'
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageHeadline } from '@nuxt/content/utils'
import LZString from 'lz-string'

const { toc } = useAppConfig()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

//b// @ts-expect-error - Suppresses error if it exists, warns you if the line is actually correct
definePageMeta({
  layout: 'docs',
  scrollToTop: false
})

const route = useRoute()

const { data: page } = await useAsyncData(
  `${route.path}`,
  () =>
    queryCollection('docs')
      // .where('path', '=', path)
      .path(route.path)
      .first()
)

const { imageData, headlineT } = useImageState()

// 2. Sync the Global State with the URL and Page Data
// Sync page data to global (image-editor) state automatically
watchEffect(() => {
  if (page.value) {
    imageData.value.pageContext = {
      title: page.value.title,
      description: page.value.description,
      path: page.value.path
    }
  }
})

const { locale } = useI18n()

const detectedLocale = computed(() => {
  if (route.path.startsWith('/da')) return 'da'
  if (route.path.startsWith('/en')) return 'en'
  return locale.value // fallback to default i18n state
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Page not found in ${detectedLocale.value} at ${route.fullPath}`,
    fatal: true
  })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('docs', `${route.path}`, {
    fields: ['description']
  })
})

// const config = useRuntimeConfig() // siteUrl or apiBase
const site = useSiteConfig() // required for og-image

useSeoMeta({
  // title, // This title comes below the shared image - I don't want to have the same title in image and below it
  ogTitle: route.path.startsWith('/en') ? 'Luther\'s Church Postil' : 'Luthers Kirke Postille', // page?.value?.title,
  // description,
  ogDescription: route.query.s ? (locale.value === 'en' ? 'Read this quote from Luther...' : 'Les dette sitatet fra Luther...') : page?.value?.description,
  ogUrl: () => `${site.url}${route.fullPath}` // route.path
  /*
  ogImage: quoteData // isAnchorLink.value
    ? undefined // Let the OG Module handle it otherwise
    : '/default-social-card.png' // A static image for urls with only the id instead of the section header title
  */
})

let sData = null as any

// We ONLY handle 's' here because it's for the normal page load
if (route.query.s) {
  try { // unzip only the s-query (z-query i handled in og-image modules)
    sData = JSON.parse(LZString.decompressFromEncodedURIComponent(route.query.s as string))
  } catch (e) { console.error('Unzip of s-query failed', e) }
}

const headline = computed(() => findPageHeadline(navigation?.value, page.value?.path)) as any

const layout = imageData.value.layout === 'Wide' ? 'Wide' : 'Narrow'

defineOgImage(layout, {
    title: sData?.t || imageData.value.content.t || page.value.title,
    description: sData?.d || imageData.value.content.d || page.value.description,
    headline: headline.value, // || sData?.h || imageData.value.content.h || headline.value,
    zip: route.query.zip || route.params.zip as any
  }
)

// 4. Wrap the logic in a safe Computed block
const links = computed(() => {
  // If page is null (because it's an API route or 404),
  // return an empty array immediately. No 'return' outside this function!
  if (!page.value) return []

  const toc = (page.value as any)?.body?.toc
  const result: any[] = []

  // Now we safely use page.value because we checked it above
  if (toc?.bottom?.edit) {
    result.push({
      icon: 'i-lucide:external-link',
      label: 'Edit this page',
      to: `${toc.bottom.edit}/${page.value.stem}.${page.value.extension}`,
      target: '_blank'
    })
  }

  return result
})
// Start working with the toc menu

/* -------- SAVING NAV MENU REF ---------- */
// Only used as ref to recognize click outside toc menu
const tocMenuRef = ref<HTMLElement | null>(null) // found after 1.click

// Saving nav menu reference when toc is opened first time

clickOnContentToc.count = 0
function clickOnContentToc(event) {
  clickOnContentToc.count++
  if (clickOnContentToc.count === 1) {
    tocMenuRef.value = event.target
  } else if (event.target.matches('span[data-slot="linkText"]')
    || event.target.matches('a[data-slot="link"]')) {
    // console.log('isTocOpen,value = false after click on link/linkText!')
    isTocOpen.value = false
  }
}

watch(tocMenuRef, (newValue, oldValue) => {
  if (oldValue === null) // Happening only once
    tocMenuRef.value = newValue?.closest('nav[data-state]') as HTMLElement
})

/* FINISH SAVING TOC NAV MENU REF */

// Close the toc menu on click outside the toc menu
onMounted(() => {
  document.addEventListener('click', function (event) {
    if (isTocOpen.value && tocMenuRef.value !== null) {
      const containsElement = event.composedPath().includes(tocMenuRef.value)
      if (!containsElement) {
        // console.log('isTocOpen,value = false after click outside the toc menu.')
        isTocOpen.value = false
      }
    }
  })
})

/* COLLAPSIBLE HANDLER FOR CLICK ETC. ON CONTENT TOC */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { $tocHashArr, $collapsibleToc, $formatUrl2Text /* , $activateNoteMenu */ } = useNuxtApp() as any

const isTocOpen = ref(false) // Initial state (e.g., closed)

const handleUpdate = (isOpen: boolean) => {
  isTocOpen.value = !isOpen ? false : true
  if (isOpen) {
    // if menu have already been open open it again in the same place
    $collapsibleToc([...hashArrayRef.value]) // collapsibleToc()
  }
}

const hashArrayRef = ref([])

// Watch for changes in the URL hash (e.g., #second-sunday... etc.)
watch(() => route.hash, (newHash /* , oldHash */) => {
  if (newHash) {
    // console.log('newHasth: ', newHash)
    // console.log('fullPath: ', route.fullPath)
    const pattern = /-\d+-\d+$/
    if (pattern.test(newHash) && newHash.length > 25) {
      // the hash is probably h2 or ## Sermon Header Title Ending with Bible verse
      const headerId = getIdByPath(route.fullPath)
      if (headerId?.length === 4) {
        pageId.value = headerId
      }
    }
    // tocHashArr is required to open the collapsed toc menu where it was last open
    hashArrayRef.value = $tocHashArr(newHash)
  }
})

const pageContainer = ref(null)
const noteRef = ref<any>(null)
const lastActionTime = useLastActionTime() as any // For the "Double-fire" shield

const handleContextMenu = (e: Event) => {
  const now = Date.now()
  // If a highlight was created in the last 1 second, prevent the menu
  if (now - lastActionTime < 1000) {
    e.preventDefault()
  }
}

/**
 * Handle scroll to note links, hashtags etc.
 * jur.eleison@ https://gemini.google.com/share/f80fafd3413d
 * is moved from onMounted to a composable: useSlugInitializer()
 */
useSlugInitializer()

/* GET THE PAGE ID FROM THE PAGE PATH AND SAVE IT */
const pageId = usePageId()
const { getIdByPath } = useOppositeLanguage()
pageId.value = getIdByPath(route.fullPath) as string

// Toc menu icon or x (close)
const tocIcon = (open) => {
  return open ? '✖' : '☰'
}

// exporting headline for use in og-modules etc.
headlineT.value = headline.value
</script>

<template>
  <UPage v-if="page">
    <UPageHeader
      v-if="page"
      :title="page.title"
      :description="page.description"
      :headline="headline"
    >
      <template #links>
        <UButton
          v-for="(link, index) in page?.links"
          :key="index"
          v-bind="link"
        />

        <PageHeaderLinks />
      </template>
      <SourceAccordion
        :title=" page?.title"
        :source="page?.source"
      />
    </UPageHeader>

    <UPageBody>
      <div
        ref="pageContainer"
        class="relative scripture-wrapper"
        @mouseup="noteRef?.handleTextInteraction"
        @touchend="noteRef?.handleTextInteraction"
        @contextmenu.prevent="handleContextMenu"
      >
        <ContentRenderer
          v-if="page"
          :value="page"
          class="cursor-crosshair scripture-content"
        />

        <SourceReference
          :title="page?.title"
          :source="page?.source"
        />

        <ClientOnly>
          <GithubComments />
          <RightBottomMenu />
          <ImageEditor
            v-if="page"
            :headline="headlineT"
            :url-as-text="$formatUrl2Text(route.fullPath)"
          />
          <AddNoteToMdPage
            v-if="page"
            ref="noteRef"
            :target="pageContainer"
            :headline="headlineT"
            :url-as-text="$formatUrl2Text(route.fullPath)"
          />
        </ClientOnly>

        <USeparator v-if="surround?.length" />

        <UContentSurround :surround="surround" />
      </div>
    </UPageBody>

    <template
      v-if="page?.body?.toc?.links?.length"
      #right
    >
      <!--
      CREATING CUSTOM ACCORDION OF CONTENT TOC - LOOK ON THE FOLLOWING URL FOR TIPS
      https://www.google.com/search?q=nuxt+ui+content+toc+-+enable+collabseble+rows+for+subchapters&oq=nuxt+ui+content+toc+-+enable+collabseble+rows+for+subchapters&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCTY2MDQyajBqN6gCCLACAfEF-8X75usZAAg&sourceid=chrome&ie=UTF-8
      -->
      <UContentToc
        v-model:open="isTocOpen"
        :title="`${tocIcon(isTocOpen)} ${toc?.title} ${page?.title}`"
        :links="page.body?.toc?.links"
        :ui="{
          title: 'text-info',
          trailing: 'text-info',
          link: 'focus:text-secondary active:text-warning hover:text-error visited:text-neutral'
        }"
        @click="clickOnContentToc"
        @update:open="handleUpdate"
      >
        <template
          v-if="toc?.bottom"
          #bottom
        >
          <div
            class="hidden lg:block space-y-6"
            :class="{ '!mt-6': page.body?.toc?.links?.length }"
          >
            <USeparator
              v-if="page.body?.toc?.links?.length"
              type="dashed"
            />

            <UPageLinks
              :title="toc.bottom.title"
              :links="links"
            />
          </div>
        </template>
      </UContentToc>
    </template>
  </UPage>
</template>

<style scooped>
/* For all elements */
body::-webkit-scrollbar {
    width: 15px; /* For vertical scrollbar */
}
body::-webkit-scrollbar-thumb {
    background: #888; /* Dark gray thumb */
    border-radius: 6px; /* Rounded corners */
    /* height: 35px */
}

body::-webkit-scrollbar-thumb:hover {
    background: #555; /* Darker on hover */
}

/* Remove 'scoped' from your <style> tag for this part */

/*
  Style and solution for content toc accordion.
  Uncomment above (line 126) // ulParent.setAttribute('class', 'tree')
  and change "nav > div div:nth-child(2)" with .tree below
  - if you want to simplify css code below.
*/

nav > div div:nth-child(2) > ul, nav > div div:nth-child(2) > ul ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

nav > div div:nth-child(2) > ul li {
  position: relative;
  padding-left: 25px; /* Space for the arrow */

  line-height: 2;
  cursor: pointer;
  user-select: none; /* Prevents text highlighting on double click */

}

/* 1. The Base Arrow State */

nav > div div:nth-child(2) > ul li.has-children::before {
  content: '\25B7'; /* '▶' */

  position: absolute;
  left: 5px;
  top: 0;
  display: inline-block; /* REQUIRED for rotation to work */

  transition: transform 0.2s ease;
  font-size: 10px;
  color: #666;
}

/* 2. The Rotation Logic (FIXED SELECTOR) */
/* Removed the ">" because ::before belongs to the LI itself */

nav > div div:nth-child(2) > ul li.is-open::before {
  transform: rotate(90deg);
}

/* 3. Visibility Logic */

nav > div div:nth-child(2) > ul li > ul {
  display: none;
}

nav > div div:nth-child(2) > ul li.is-open > ul {
  display: block;
}

/*
Reference
https://gemini.google.com/share/59939ee5a006
*/
</style>
