<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import { upperFirst } from 'scule'
import type { TableColumn } from '@nuxt/ui'
import type { Column, Row, SortingFn } from '@tanstack/vue-table'
import { useClipboard, useWindowSize /* , useLocalStorage */ } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const { path } = useRoute()
// Construct the full URL using our helper

const props = defineProps({
  postil: String
})

type RowItems = {
  id: string
  postil: string
  tags: string
  label: string
  bible: string
  // value: string
  type: never
  description: string
}

const fetchUrl = computed(() => {
  // 1. Your existing logic to determine which API file/folder to hit
  const lang = path.startsWith('/da') ? 'da' : 'en'

  let targetPath = ''
  if (path.includes('uddrag')) {
    targetPath = path.slice(1) // e.g., "da/uddrag"
  } else if (path.includes('test')) {
    targetPath = path.slice(1) // e.g., en/testfile
  } else {
    targetPath = lang // e.g., "en"
  }
  // 2. Wrap it in the helper to add the Domain on the Server
  // This produces: http://localhost:3000/api/da/uddrag (on Server)
  // or: /api/da/uddrag (on Client)
  return useApiUrl(`api/${targetPath}`)
})

// 1. Fetch the raw data (Keep the cache clean)
const { data: rawRows, status, error } = await useFetch<RowItems[]>(
  fetchUrl.value, {
    key: `api-index-table-${locale.value}-${props.postil ?? 'default'}`, // Cache key stays the same
    transform: (data) => {
      // Only do structural defensive checks here, NOT business logic filtering
      return Array.isArray(data) ? data : []
    },
    server: true,
    lazy: false
  }
)

// 2. Apply filtering reactively in a computed property
const rowItems = computed(() => {
  if (!rawRows.value) return []

  const isPostilDefined = props.postil !== undefined

  return rawRows.value.filter((row) => {
    return isPostilDefined
      ? row.postil === props.postil
      : row.postil !== undefined
  })
})

/* Adding custom sort function for bible column */
// https://gemini.google.com/share/e49b936b49a0
const BOOK_ORDER: Record<string, number> = {
  'ecclus': 2, '2 Mos': 2, 'is': 23, 'isaiah': 23, 'es': 23,
  'sirach': 39, 'sirak': 39, 'sir': 39,
  'matt': 40, 'mark': 41, 'luke': 42, 'luk': 42, 'john': 43, 'joh': 43,
  'acts': 44, 'apg': 44, 'rom': 45, '1 cor': 46, '1 kor': 46, '2 cor': 47, '2 kor': 47,
  'gal': 48, 'eph': 49, 'ef': 49, 'phil': 50, 'fil': 50, 'col': 53, 'kol': 51,
  '1 thess': 52, '1 tess': 52, '2 thess': 53, '2 tess': 53, '1 tim': 54, '2 tim': 55,
  'titus': 56, 'tit': 56, 'philem': 57, 'filem': 57, 'hebr': 58, 'heb': 58,
  'james': 59, 'jak': 59, '1 pet': 60, '2 pet': 61,
  '1 john': 62, '1 joh': 62, '2 john': 63, '2 joh': 63, '3 john': 64, '3 joh': 64,
  'jude': 65, 'jud': 65, 'rev': 66, 'åb': 66
}

type BibleBook = keyof typeof BOOK_ORDER

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tanstackBibleSort: SortingFn<any> = (rowA, rowB, colName) => {
  const matchObjVal = (raw) => {
    const str = String(raw || '').toLowerCase().trim()
    // This regex looks for: (Book Name) (Chapter):(Verse)
    const regex = /^((?:[1-5] )?\w+).? (\d+)[,:]\s?(\d+)(?=$| ?-.*)/ // https://regex101.com/r/hYxBM7/1
    const match = str.match(regex)
    if (!match) return { book: str, chapter: 0, verse: 0 }

    return {
      book: match[1],
      chapter: match[2] ? parseInt(match[2], 10) : '',
      verse: match[3] ? parseInt(match[3], 10) : ''
    }
  }

  const a = matchObjVal(rowA.getValue(colName))
  const b = matchObjVal(rowB.getValue(colName))

  // 1. Compare Book Rank
  const rankA = BOOK_ORDER[a.book as BibleBook] || 999
  const rankB = BOOK_ORDER[b.book as BibleBook] || 999

  if (rankA !== rankB) return rankA - rankB

  /*
  // 2. Compare Chapter (Tie-breaker 1)
  if (a.chapter !== b.chapter) return a.chapter - b.chapter

  // 3. Compare Verse (Tie-breaker 2)
  return a.verse - b.verse
  */

  // 2. Compare Chapter (Tie-breaker 1)
  if (a.chapter !== b.chapter) {
    return Number(a.chapter) - Number(b.chapter)
  }
  // 3. Compare Verse (Tie-breaker 2)
  return Number(a.verse) - Number(b.verse)
}

const columns: TableColumn<RowItems>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => getTableHeader(column, '#'),
    cell: ({ row }) => `${row.getValue('id')}`
  },
  {
    accessorKey: 'postil',
    header: ({ column }) => getTableHeader(column, 'Postil'),
    cell: ({ row }) => `${row.getValue('postil')}`

  },
  {
    accessorKey: 'tags',
    header: ({ column }) => getTableHeader(column, 'Tags'),
    cell: ({ row }) => `${row.getValue('tags')}`
  },
  {
    accessorKey: 'label',
    header: ({ column }) => getTableHeader(column, 'Holiday'),
    cell: ({ row }) => `${row.getValue('label')}`
  },
  {
    accessorKey: 'bible',
    sortingFn: tanstackBibleSort,
    header: ({ column }) => getTableHeader(column, 'Bible Txt'),
    cell: ({ row }) => `${row.getValue('bible')}`
  }, /*
  {
    accessorKey: 'value',
    header: ({ column }) => getTableHeader(column, 'Value'),
    cell: ({ row }) => `${row.getValue('value')}`
  }, */
  {
    id: 'menu',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            'content': {
              align: 'end'
            },
            'items': getRowItems(row),
            'aria-label': 'Actions dropdown'
          },
          () =>
            h(UButton, {
              'icon': 'i-lucide-ellipsis-vertical',
              'title': 'Open Sermon Menu',
              'color': 'neutral',
              'variant': 'ghost',
              'class': 'ml-auto',
              'aria-label': 'Actions dropdown'
            })
        )
      )
    }
  }
]

/*
  // global filter input field for searching
  // When caching the pages all postils are loaded on each "postil"-page
  // Fixing it with this method
  // source: https://gemini.google.com/share/f50524e9bb70
*/
const postilMapping = [
  { slug: 'advent', danish: 'Advent' },
  { slug: 'christmas', danish: 'Jul' },
  { slug: 'lent', danish: 'Faste' },
  { slug: 'easter', danish: 'Påske' },
  { slug: 'trinity1', danish: 'Trefoldighed I' },
  { slug: 'trinity2', danish: 'Trefoldighed II' }
]

// 1. Define the logic in a clear, reusable function
const getInitialFilter = () => {
  const currentSlug = path.slice(4) as string // route.params.slug

  // Find the object where the slug matches the start of the filename
  const match = postilMapping.find(item => currentSlug.startsWith(item.slug))

  // Return the Danish name if found, otherwise an empty string
  // if (match !== undefined)
  return match ? match.danish : ''
}

// 2. Initialize the ref as a string, not an object
// This matches the 'string' type the component is looking for
const globalFilter = ref<string>(getInitialFilter())

/*   VISIBILITY  */
const table = useTemplateRef('table') // Select Column View Dropdown Menu

const { width } = useWindowSize()
const columnVisibility = ref({})

onMounted(() => {
  watch(width, (newVal) => { // set columnVisibility on screen width
    columnVisibility.value = {
      ...columnVisibility.value,
      id: false,
      postil: false, // updating value below
      tags: false, // updating value below
      label: true,
      bible: true,
      // value: false,
      menu: true
    }

    if (newVal > 540) {
      columnVisibility.value = {
        ...columnVisibility.value,
        postil: true,
        tags: true
      }
    } else if (newVal > 440 && newVal < 540) {
      columnVisibility.value = {
        ...columnVisibility.value,
        tags: true
      }
    }
  }, { immediate: true })
})

/* Sorting */
const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

function getTableHeader(column: Column<RowItems>, label: string) {
  const isSorted = column.getIsSorted()

  return h(UButton, {
    color: 'neutral',
    variant: 'ghost',
    label: label,
    icon: isSorted ? (isSorted === 'asc' ? 'i-lucide-arrow-up-narrow-wide' : 'i-lucide-arrow-down-wide-narrow') : 'i-lucide-arrow-up-down',
    class: '-mx-2.5',
    onClick: () => column.toggleSorting() // column.toggleSorting(column.getIsSorted() === 'asc')
  })
}

const sorting = ref([
  {
    id: 'id',
    desc: false
  }
])

/* Get Row Actions */

const toast = useToast()
const { copy } = useClipboard()
const { getPagePath } = useOppositeLanguage()

const getPathFromId = (pageId) => {
  const targetPath = getPagePath(pageId, locale.value)

  // Navigate to the other language version
  // navigateTo(targetPath)
  return targetPath
}

function getRowItems(row: Row<RowItems>) {
  return [
    {
      label: 'Open Sermon',
      icon: 'i-lucide-link',
      onSelect() {
        navigateTo(`${getPathFromId(row.original.id)}`, {
          external: false /* ,
          open: {
            target: '_blank'
          } */
        })
      }
    },
    {
      label: 'New PC Tab',
      icon: 'i-lucide-link',
      onSelect() {
        navigateTo(`${getPathFromId(row.original.id)}`, {
          external: true,
          open: {
            target: '_blank'
            // windowFeatures: { width: 800, height: 600 }
          }
        })
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Share Link',
      icon: 'i-lucide-copy',
      onSelect() {
        copy(currentOrigin.value + getPathFromId(row.original.id))

        toast.add({
          title: 'Link Copied!',
          color: 'success',
          icon: 'i-lucide-circle-check'
        })
      }
    },
    {
      type: 'separator'
    },
    {
      label: row.getIsExpanded() ? 'Collapse' : 'Expand',
      id: 'homeButtonRef',
      title: row.getIsExpanded() ? 'Collapse or just open a new row to auto collapse the open row!' : JSON.stringify(row.original),
      icon: row.getIsExpanded() ? 'i-fluent-arrow-collapse-all-24-regular' : 'i-fluent-arrow-expand-all-24-regular',
      onSelect() { // on right click on row
        row.toggleExpanded()
      }
    }
  ]
}

const currentOrigin = ref('')

onMounted(() => {
  currentOrigin.value = window.location.origin
  if (typeof window !== 'undefined') {
    currentOrigin.value = window.location.origin
  }
})

/* Start of expandable rows */
// 2. The internal "real" state
const _expanded = ref({})

// 3. The "smart" wrapper state
const expanded = computed({
  get: () => _expanded.value,
  set: (newVal) => {
    const keys = Object.keys(newVal)
    // If user is trying to open a second row
    if (keys.length > 1) {
      // Find the key that exists in newVal but NOT in our current _expanded state
      const latestKey = keys.find(key => !_expanded.value[key as keyof typeof _expanded.value])
      // If we found a new key, make that the ONLY expanded row
      // Otherwise, if they clicked the same row to close it, latestKey will be undefined
      _expanded.value = latestKey ? { [latestKey]: true } : {}
    } else {
      // Standard behavior for 0 or 1 row
      _expanded.value = newVal
    }
  }
})

// The magic "Select" function - expanding the row
const onRowSelect = async (row) => {
  // If the row is already open, close it. If not, open only this one.
  expanded.value = expanded.value[row.id] ? {} : { [row.id]: true }
  // 1. Logic to expand row
  await nextTick()

  const element = expandRefs.value[row.id]

  // console.log('scrolling row element into view (to the top of the screen)')
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start' // 'nearest'
    })

    // 4. THE FIX: Re-verify after a tiny delay
    // This accounts for CSS transitions or slow layout shifts
    setTimeout(() => {
      const rect = element.getBoundingClientRect()

      // If 'top' is still less than 0, it means the expansion
      // pushed the row back up off-screen.
      if (rect.top < 0) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }, 250) // Adjust timeout to match your CSS transition time
  }

  catchBible(row.original.id)
}
/*
const scrollUpExpandRow = (el: any) => { // if it's to close to bottom
  let distanceToBottom = 0
  if (container) {
    const rect = container.getBoundingClientRect()
    const height = window.visualViewport
      ? window.visualViewport.height
      : window.innerHeight
    distanceToBottom = height - rect.bottom
    console.log('testing this is inside scrollupExpandRow')
    console.log('height is: ', height)
    console.log('rect.bottom = ', rect.bottom)
    console.log('rect = ', rect)

    console.log('distance to bottom = ', distanceToBottom)
    console.log('screen height = ', height)
    console.log('el = ', el)

    // If the bottom of the content is off-screen or too close (less than 50px)
    if (distanceToBottom < 5) {
      console.log('now it should scroll up')
      window.scrollBy({
        top: 240,
        behavior: 'smooth'
      })
    }
  }
}
*/

const expandRefs = ref({})

// Callback to store the reference
const scrollUpExpandRow = (el, id) => {
  if (el) expandRefs.value[id] = el
}

/*
// Your expansion trigger function
const onSelect = async (row) => {
  // 1. Logic to expand the row (e.g., updating 'expand' model)

  // 2. Wait for Vue to render the new DOM elements
  await nextTick()

  // 3. Access the specific element and scroll
  const element = expandRefs.value[row.id]
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    })
  }
}
*/

// For the expanded rows
function getTags(inputString, getRest = false) {
  const words = inputString.split(',').map(w => w.trim())

  if (getRest) {
    return words.slice(1).join(', ')
  }
  return words[0]
}

/* CATCH JSON BIBLE VERSE */
// Define the shape of your data
interface Bible {
  ref: string
  category: string
  tags: string
  text: string
  description: string
}

type BibleData = Record<string, Bible>

const loadedBible = ref<Bible | null>(null)

let cachedData: BibleData | null = null

async function catchBible(targetId: string) {
  // Only fetch if we haven't already
  if (!cachedData) {
    const response = await fetch(`../json/${locale.value}/bibleid.json`)
    cachedData = await response.json()
  }
  if (cachedData)
    loadedBible.value = cachedData[targetId] || null
}

// We calculate if we are truly empty only after the fetch is finished
const isEmpty = computed(() => status.value === 'success' && (!rowItems.value || rowItems.value.length === 0))

/* SAVE THE NEW JSON FILE WITH PATHS TO DA & EN PAGES. tHEN FIND IT TROUGH THE ID */
// Didn't work - trying caching trough nuxt config
</script>

<template>
  <div>
    <div class="flex justify-between">
      <!-- globalFilter -->
      <div class="px-4 py-3.5 border-b border-accented">
        <UInput
          v-model="globalFilter"
          icon="i-lucide-search"
          class="max-w-md"
          placeholder="Filter Sermons..."
        />
      </div>
      <div class="w-5/16 px-4 py-3.5 justify-end border-b border-accented">
        <!-- Select Column View -->
        <UDropdownMenu
          :items="
            table?.tableApi
              ?.getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => ({
                label: upperFirst(column.id),
                type: 'checkbox' as const,
                checked: column.getIsVisible(),
                onUpdateChecked(checked: boolean) {
                  table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
                },
                onSelect(e: Event) {
                  e.preventDefault()
                }
              }))
          "
          :content="{ align: 'end' }"
        >
          <UButton
            label="View"
            color="neutral"
            variant="outline"
            trailing-icon="i-lucide-chevron-down"
          />
        </UDropdownMenu>
      </div>
    </div>
    <div
      class="church-postil-table"
    >
      <!--  class="church.postil-table" data-allow-mismatch -->
      <!-- The presentation of rowItems as data and rows is possibly creating hydration node mismatch warning in browser. Suppressing this warning with this the data-allow-mismatch property --->
      <!-- PENDING TABLE DIV -->
      <div
        v-if="status === 'pending'"
        class="flex items-center gap-4 "
      >
        <USkeleton class="h-12 w-12 rounded-full" />
        <!-- <p>Loading records...</p> -->
        <div class="grid gap-2">
          <USkeleton class="h-4 w-[250px]" />
          <USkeleton class="h-4 w-[200px]" />
        </div>
      </div>
      <!-- ERROR TABLE DIV -->
      <div v-else-if="error">
        <UError
          :clear="{
            color: 'neutral',
            size: 'xl',
            icon: 'i-lucide-arrow-left',
            class: 'rounded-full'
          }"
          :error="{
            statusCode: 404,
            statusMessage: 'No Table Rows',
            message: error.message
          }"
        />
      </div>
      <UTable
        v-else-if="rowItems && rowItems.length > 0"
        ref="table"
        v-model:column-visibility="columnVisibility"
        v-model:sorting="sorting"
        v-model:global-filter="globalFilter"
        v-model:expanded="expanded"
        :data="rowItems || []"
        :columns="columns"
        class="flex-1 whitespace-normal"
        :ui="{
          th: 'pt-1, pb-1',
          td: 'pt-1 pb-1 whitespace-normal'
        }"
        @select="(_, row) => onRowSelect(row)"
      >
        <!-- Removed :data="rowItems || []" :rows="rowItems || []" -->
        <template #expanded="{ row }">
          <div
            :ref="el => scrollUpExpandRow(el, row.id)"
            class="expand-container -ml-4 -mr-4 pl-4 pt-2 pb-1 pr-2 bg-gray-50/50 dark:bg-white/5"
          >
            <div class="expand-content pl-4 border-l-4 border-primary-500 rounded-sm">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                {{ row.original.postil }} {{ getTags(row.original.tags) }} - {{ row.original.label }}
              </h4>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                <div class="pb-1">
                  <UPopover
                    arrow
                    :overlay="false"
                  >
                    <UButton
                      :label="row.original.bible"
                      title="Click Gets Bible Text"
                      size="xs"
                      variant="outline"
                      @click="catchBible(row.original.id)"
                    />
                    <template #content="{ close }">
                      <!-- <div> -->
                      <div
                        v-if="loadedBible"
                        class="ml-2 mr-2 mt-0 mb-0 max-h-[25vh] overflow-y-auto"
                        :style="{
                          maxWidth: (width - 33) + 'px', width: '400px', height: '300px'
                        }"
                      >
                        <p class="text-sm whitespace-normal break-words">
                          {{ loadedBible.text }}
                        </p>
                      </div>
                      <div
                        v-if="loadedBible"
                        class="flex items-center justify-between gap-4"
                      >
                        <!-- {{ loadedBible.ref }} -->
                        <UBadge
                          size="sm"
                          :label="loadedBible.tags"
                          variant="subtle"
                          class="mb-1 ml-2"
                        />

                        <UButton
                          color="neutral"
                          variant="ghost"
                          icon="i-lucide-x"
                          class="justify-end"
                          @click="close"
                        />
                      </div>
                      <!-- </div> -->
                    </template>
                  </UPopover>
                  <!--
                  <span v-if="loadedBible">
                    &nbsp;{{ loadedBible.tags }}
                  </span>
                  <span v-else>
                    &nbsp;{{ getTags(row.original.tags, true) }}
                  </span>
                  -->
                </div>
                <p v-if="loadedBible">
                  &emsp;{{ loadedBible.description }}
                </p>
                <p v-else>
                  &emsp;{{ row.original }}
                </p>
                <p class="flex justify-end">
                  <UButton
                    label="Read Sermon"
                    :to="getPathFromId(row.original.id)"
                    title="Open Luther's Sermon"
                    size="xs"
                    variant="outline"
                    trailing-icon="i-lucide-arrow-right"
                  />
                </p>
              </div>
            </div>
          </div>
        </template>
      </UTable>
      <!-- NO ROWS FOUND -->
      <div v-else-if="isEmpty">
        <ClientOnly>
          {{ rowItems }}
          <UEmpty
            icon="i-lucide-table"
            title="No Rows Found"
            description="Hmm, There is an error loading table rows."
            :actions="[
              {
                icon: 'i-lucide-refresh-cw',
                label: 'Refresh',
                color: 'neutral',
                variant: 'subtle'
              }
            ]"
          />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional: Make the cursor look clickable when hovering over rows */
:deep(tbody tr) {
  cursor: pointer;
}

/* Target the row, the cells, and every text-bearing element inside */
:deep(tr[data-expanded="true"]),
:deep(tr[data-expanded="true"] td),
:deep(tr[data-expanded="true"] td *) {
  color: #00C16A !important; /* This is Tailwind's green-900 */
  font-weight: 500 !important;
}
/* Dark mode adjustment */
.dark :deep(tr[data-expanded="true"]),
.dark :deep(tr[data-expanded="true"] td),
.dark :deep(tr[data-expanded="true"] td *) {
  color: #0A5331 !important; /* This is Tailwind's green-600 */
}

/*
https://gemini.google.com/share/3638933429ae
https://ui.nuxt.com/docs/getting-started/theme/design-system
*/

/* 1. Keep your parent row highlight using the attribute selector we found */
:deep(tr[data-expanded="true"]) {
  background-color: rgb(var(--color-primary-50) / 0.3);
  transition: background-color 0.3s ease;
}
/* 2. The Sliding Animation for your specific container */
.expand-container {
  overflow: hidden; /* Clips the content while it slides */
  animation: slideDown 0.35s ease-out forwards;
  /* Ensures the container starts at zero height for the animation */
  max-height: 500px;
}
@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    max-height: 500px; /* Adjust to a size larger than your content */
    transform: translateY(0);
  }
}
/* 3. Smooth transition for the parent row highlight */
:deep(tr) {
  transition: background-color 0.2s ease-in-out;
}
</style>
