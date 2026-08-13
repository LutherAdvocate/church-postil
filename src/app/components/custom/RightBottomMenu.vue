<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import * as locales from '@nuxt/ui/locale'
import { useWindowScroll, useWindowSize } from '@vueuse/core'
import type { DropdownMenuItem } from '@nuxt/ui'

const toast = useToast()

/*
const allNotes = useLocalStorage<any[]>('global-church-notes', [])
const { copyRichNotesToGmail } = useExport()
*/
const { allNotes } = useNotes()
const { sendToGmail } = useExport()
const { copyNotesToClipboard } = useClipboard()

// The grouping logic (Keep this here or in useNotes)
const groupedNotes = computed(() => {
  const groups: Record<string, any> = {}
  allNotes.value.forEach((note: any) => {
    const key = `${note.path}-${note.title}`
    if (!groups[key]) groups[key] = { path: note.path, title: note.title, items: [] }
    groups[key].items.push(note)
  })
  return Object.values(groups)
})

const handleCopyToGmaiAsDraft = () => {
  sendToGmail(groupedNotes.value, allNotes.value.length)
}
const handleCopyAndGmail = (toGmail) => {
  if (toGmail)
    copyNotesToClipboard(groupedNotes.value, true)
  else
    copyNotesToClipboard(groupedNotes.value, false)
}

const mdNotes = () => {
  const cleanNotes = groupedNotes.value.filter(g => g.items.some(i => i.text.length > 0))
  toast.add({ title: 'Print Notes:', description: 'Print from browsers menu or Right Click' })
  setTimeout(() => {
    $openPrintableMdNotes(cleanNotes)
  }, 3000)
}
const styledNotes = () => {
  // Filter before passing to the function
  const cleanNotes = groupedNotes.value.filter(g => g.items.some(i => i.text.length > 0))
  $openStyledNotes(cleanNotes)
}
const downloadNotes = () => {
  // Filter before passing to the function
  const cleanNotes = groupedNotes.value.filter(g => g.items.some(i => i.text.length > 0))
  $exportNotesAsFile(cleanNotes)
}

/* Above is only the gmail send code */

const isMobile = ref(navigator.maxTouchPoints === 1 || navigator.maxTouchPoints === 1)

const viewportWidth = useViewportWidth()
const viewportHeight = useViewportHeight()

const pos = computed(() => {
  // Desktop Default (Bottom Right)
  const btnSize = 36 // We use 36 as an estimate for the button size
  const margin = 4 // Align to bottom-right with a 6px padding
  const btnSum = btnSize + margin
  let x = window.innerWidth - btnSum - 8
  let y = window.innerHeight - btnSum

  if (isMobile.value) { // 'ontouchstart' in window
    // On Mobile, use visualViewport if available for better accuracy
    const viewportWidth = window.visualViewport
      ? window.visualViewport.width
      : window.innerWidth

    const viewportHeight = window.visualViewport
      ? window.visualViewport.height
      : window.innerHeight

    x = viewportWidth - btnSum
    y = viewportHeight - btnSum
  }
  return { x, y }
})

viewportWidth.value = pos.value.x
viewportHeight.value = pos.value.y

const showMovableToggle = ref(true)

// 1. Monitor scroll with idle detection
const { isScrolling } = useWindowScroll({ idle: 200 })

// 2. Single watcher to handle showing/hiding AND mobile detection
watch(isScrolling, (scrolling) => {
  // We only care when scrolling STOPS
  if (!scrolling) {
    // Perform mobile check only when needed (saves resources)
    // Wait with detect navigator to we are sure it exist (on scroll)
    isMobile.value = (navigator.maxTouchPoints === 1)

    // Show menu only if we are past 200px
    showMovableToggle.value = true // y.value > 200
  } else {
    // Hide menu immediately when scrolling starts
    showMovableToggle.value = false
    // movableMenuOpen.value = false // Re-setting the state of all the menu buttons (closing them)
  }
})

const movableMenuOpen = ref(false)

const { height } = useWindowSize()

watch(height, (/* newVal, oldVal */) => {
  viewportWidth.value = window.visualViewport
    ? window.visualViewport.width - 36
    : window.innerWidth - 36
  viewportHeight.value = window.visualViewport
    ? window.visualViewport.height - 36
    : window.innerHeight - 36

  /*
  if (newVal > oldVal) {
    alert('viewport changed1')
    console.log('Height changed from ', oldVal, ' to ', newVal)
  }
  // The movable menu will follow the scroll (when url field is open) until the url field is gone
  // https://share.google/aimode/UCrm8q2yXk3WR74tf
  */
})

/* Creating popup menu and insert it on the right side */
// const inActive = ref(true) // required when switch is used

/* On click outside movable menu the button stays inActive = false */

const scrollToTop = () => {
  movableMenuOpen.value = !movableMenuOpen.value
  toast.add({ title: 'Scrolling to Top!', description: '- and closing bottom menu' })
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Smooth scroll behavior
  })
}

const cpOpen = ref(false)

defineShortcuts({
  o: () => {
    movableMenuOpen.value = !movableMenuOpen.value
    if (!movableMenuOpen.value) cpOpen.value = false
  },
  m: () => {
    movableMenuOpen.value = cpOpen.value ? false : true
    cpOpen.value = !cpOpen.value
  }
})

/* ------------- TOGGLE LANGUAGE BUTTON ------------- */

const {
  $toggleLanguageOnMainPages,
  $keyboardClickK,
  $keyboardClickM,
  $localeDate, // for notes
  $openPrintableMdNotes,
  $openStyledNotes,
  $exportNotesAsFile
  // $created
} = useNuxtApp() as any

const { locale } = useI18n()
const uiLocale = computed(() => locales[locale.value as keyof typeof locales])
const { getPagePath } = useOppositeLanguage()

const isLang = ref(false)
const pageId = usePageId() as any
const urlHash = useUrlHash()

const toggleLang = () => {
  isLang.value = isLang.value === true ? false : true
  locale.value = locale.value === 'en' ? 'da' : 'en'

  if (pageId !== null && pageId.value.length === 4) {
    // Grab your data from JSON
    const targetPath = getPagePath(pageId.value, locale.value)

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
    } else { // no hash
      if (isMobile.value)
        navigateTo(`${path}`, {
          external: true
        })
      else {
        router.push(`${path}`)
      }
    }
  } else { // not pageId
    $toggleLanguageOnMainPages(locale.value)
  }
  toast.add({ title: `${uiLocale.value.name} Translated Page`, description: '' })
}

// https://share.google/aimode/SQerCGjVs75LHYtJV

/* START PREVENT THE MENU FROM POPPING UP WHEN DRAGGED */

const isHold = ref(false)
let pressTimer: NodeJS.Timeout | null = null
const holdTime = 350 // milliseconds for a "hold"

const startHoldTimer = () => { // event: MouseEvent | TouchEvent
  isHold.value = false
  // Clear any existing timer to prevent issues
  if (pressTimer) {
    clearTimeout(pressTimer)
  }
  // Start a timer for the hold action
  pressTimer = setTimeout(() => {
    isHold.value = true
  }, holdTime)
}

const endHoldTimer = () => {
  if (pressTimer) {
    // doIfHoldCondition(event, condition)
    clearTimeout(pressTimer)
  }
}

const handleMovableState = (/* ev */) => {
  if (!movableMenuOpen.value) {
    // OPENING: Set the conditions you identified
    movableMenuOpen.value = false
  } else { // closed
    // CLOSING: Reset them so the button can work again
    movableMenuOpen.value = true
  }

  if (!isMobile.value && isHold.value) {
    movableMenuOpen.value = !movableMenuOpen.value
  }
}

/*
// Fixing that click outside movable button(s) the menu close, but the inActive staying FALSE
watch(movableMenuOpen, (newVal, oldVal) => {
  console.log('movableMenuOpen; oldVal= ', oldVal, ' newVal= ', newVal)
})
*/

// I could done the same with a mousedown handle and vueUse onLongPress(buttonRef, () => {

/* END PREVENT THE MENU FROM POPPING UP WHEN DRAGGED */

// const selectmovableMenuOpen = ref(false)
const searchTermRef = ref('')

/* -- HANDLING THE BLUR ON INPUT ON STARTUP AND ON TYPING  -- */
const handleInputRef = (el: any) => {
  if (!el) return
  // 1. Get the DOM node.
  // If it's a component, grab $el.
  let domNode = el.$el ?? el
  // 2. If it's a #text node (nodeType 3), look for the nearest element sibling
  if (domNode.nodeType === 3 && domNode.nextElementSibling) {
    domNode = domNode.nextElementSibling
  }
  // 3. Now ensure we have a real element to query
  if (domNode instanceof HTMLElement || domNode instanceof Element) {
    const input = domNode.children[0]!.children[0] as HTMLInputElement // domNode.querySelector('input')
    let timer
    function startTimer() {
      // 1. Capture the ID
      timer = setTimeout(() => {
        input.blur()
      }, 3000) // 3-second delay before input blur()
    }

    if (input) {
      // Your logic here (e.g., input.focus())
      // Option A: Blur it immediately
      const rawComp = toRaw(input)
      const inputValue = rawComp.value as any
      if (inputValue.trim().length === 0)
        input.blur() // not keyboard typing
      else {
        searchTermRef.value = inputValue
        startTimer()
      }
      watch(inputValue, () => {
        function resetTimer() {
          // 2. Clear the existing timer
          clearTimeout(timer)
          // 3. Restart the timer
          startTimer()
        }
        resetTimer()
      })

      // Option B: Make it readonly temporarily so keyboard can't open
      input.readOnly = true
      setTimeout(() => {
        input.readOnly = false
      }, 100)
    }
  }
}

// const templateExpandedHandler = () => { /* */ }
const backupJson = () => {
  const data = JSON.stringify(allNotes.value, null, 2)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `my-scripture-notes-${new Date().toISOString().slice(0, 10)}.json`
  link.click()
}

const quotesApostrophes = (text) => {
  const match = text.match(/«(.*?)»/)
  if (match) {
    return text = match[1]
  } else return text
}
// quotes apostrophes

/* -- ADDING NEW COMMAND PALETTE GROUP FOR NOTES -- */

// 1. Hook into the same global storage key you used in the slug page
// const allNotes = useLocalStorage<any[]>('global-church-notes', [])
const router = useRouter()
const showDescriptions = ref(false)

// 2. Format the notes for the Command Palette
const noteGroups = computed(() => [
  // GROUP 1: Your Existing Notes
  {
    id: 'notes',
    label: 'NOTES Opens on Click',
    items: allNotes.value.map(note => ({
      id: note.id,
      // Show a snippet of the text + the page title
      label: `${quotesApostrophes(note.text) + ' | ' + note.title}` || 'No note here!', //  + note.text
      description: note.path || '',
      suffix: note.path || note.title,
      title: `..${note.path} \n${note.title} \n${note.text} \n${$localeDate(note.id)}`,
      icon: 'i-heroicons-pencil-square',
      // What happens when you click the note in the palette:
      onSelect: () => {
        goToNote(note) // router.push(note.path) // `${note.path}#note-${note.id}`
      }
    }))
  },

  // GROUP 2: Utility Actions (Formated for VS Code/Linter)
  ...(allNotes.value.length > 0
    ? [
        {
          id: 'actions',
          label: 'Note Actions',
          items: [
            {
              id: 'toggle-desc',
              label: showDescriptions.value ? 'Hide Path to Note' : 'Show Path to Note',
              icon: 'i-heroicons-eye',
              onSelect: () => { showDescriptions.value = !showDescriptions.value }
            }
          ]
        }
      ]
    : [] // The alternate (empty array)
  )
])

// https://gemini.google.com/share/9167ca0a6ca8
const goToNote = (note) => {
  // Ensure the ID is attached so the destination page knows where to look
  const pathWithHash = `${note.path}#note-${note.id}`
  router.push(pathWithHash)
  movableMenuOpen.value = false
}

/* ------------------- NOTE ACTIONS MENU ---------------------- */
const fileInput = ref<HTMLInputElement | null>(null)

const noteActions = ref<DropdownMenuItem[][]>([
  [
    {
      id: 'into-clipboard',
      label: 'Copy to Clipboard',
      title: 'Copy Notes to Clipboard and manually past them anywhere',
      icon: 'i-lucide-copy',
      onSelect: () => handleCopyAndGmail(false)
    },
    {
      id: 'into-clipboard',
      label: 'Copy/Paste to Gmail',
      title: 'Copy Notes to Clipboard and open Gmail - Past it manually into Gmail',
      icon: 'i-lucide-clipboard-copy',
      onSelect: () => handleCopyAndGmail(true)
    },
    {
      id: 'gmail-notes',
      label: 'Export to Gmail (PC)',
      title: 'Export Notes automatically to Gmail - ONLY ON PC!',
      icon: 'i-simple-icons-gmail',
      onSelect: () => handleCopyToGmaiAsDraft()
    },
    {
      id: 'md-notes',
      label: 'Open Md Notes',
      title: 'Open notes in md format!',
      icon: 'i-lucide-notepad-text',
      onSelect: () => mdNotes()
    },
    {
      id: 'styled-notes',
      label: 'Print Notes',
      title: 'Print Styled notes!',
      icon: 'i-heroicons-printer',
      onSelect: () => styledNotes()
    }
  ],

  [
    {
      id: 'download-notes',
      label: 'Download Notes',
      title: 'Download Md notes!',
      icon: 'i-lucide-hard-drive-download',
      onSelect: () => downloadNotes()
    },
    {
      id: 'backup-notes',
      label: 'Backup JSON',
      title: 'Backup JSON data!',
      icon: 'i-mdi-code-json',
      onSelect: () => backupJson()
    },
    {
      id: 'import-notes',
      label: 'Import Notes',
      title: 'Import Notes from backup',
      icon: 'i-lucide-import',
      // onSelect: event => importNotes(event)
      onSelect: () => {
        // This "clicks" the hidden file input when the dropdown item is picked
        nextTick(() => fileInput.value?.click())
      }
    }
  ],
  [
    {
      id: 'toggle-desc',
      label: showDescriptions.value ? 'Hide Path to Note' : 'Show Path to Note',
      icon: 'i-heroicons-eye',
      onSelect: () => { showDescriptions.value = !showDescriptions.value }
    }
  ]
])

/* NOTE ACTION IMPORT NOTES */
// The state that controls the "Action Menu"

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = async (e) => {
    try {
      const importedData = JSON.parse(e.target?.result as string)
      if (!Array.isArray(importedData)) throw new Error('Bad Json Format')

      // The Choice Strategy
      const userChoice = window.confirm(
        `Found ${importedData.length} notes.\n\n`
        + `OK: MERGE (Add new notes, keep current)\n`
        + `CANCEL: REPLACE (Wipe current, restore backup)`
      )

      if (userChoice) {
        // MERGE: Filter out IDs we already have
        const currentIds = new Set(allNotes.value.map(n => n.id))
        const newNotes = importedData.filter(n => !currentIds.has(n.id))
        allNotes.value = [...allNotes.value, ...newNotes]
        // alert(`Successfully merged ${newNotes.length} new notes.`)
        toast.add({ title: `Successfully Merged ${newNotes.length} new notes.` /* , description: '' */ })
      } else {
        // REPLACE: Double check before wiping
        const secondaryCheck = window.confirm('Are you 100% sure? \nAll current notes will be deleted.\nMaybe you should take a backup first?\n')
        if (secondaryCheck) {
          allNotes.value = importedData
          toast.add({ title: 'Restore Complete!', description: 'Backup imported and stored to notes.' })
        } else
          toast.add({ title: 'Restore Canceled!', description: 'Backup imported and stored to notes.' })
      }

      // saveToLocalStorage() // Sync to storage
      //  allNotes.value = [...otherNotes, ...newVal]
    } catch (err) {
      toast.add({ title: 'Import failed:', description: `Invalid JSON file: ${err}` })
    } finally {
      // Important: Reset the input so you can import the same file twice if needed
      target.value = ''
    }
  }
  reader.readAsText(file)
}

/* -------- OPEN IMAGE EDITOR ---------- */
const { openEditor } = useImageState()

const openImageEditor = (allNotes) => {
  openEditor({
    h: allNotes.length === 0 ? 'No highlighted text or bobbles to show...' : 'Select a note to edit',
    t: allNotes.length === 0 ? 'Highlight text or create bobbles first!' : 'Open select menu to select',
    d: allNotes.length === 0 ? 'Create note bobbles with double click anywhere and open them here to edit and share Luther quotes and notes.' : 'All notes (note bobbles or highlighted text) can be found in the select menu in the top of this window. Select one to edit and share!'
  })
}
</script>

<template>
  <ClientOnly>
    <div
      v-if="showMovableToggle"
      class="fixed -bottom-10 right-2"
    >
      <!-- Extra div with the class-content prevents that content scroll on mobile when trying to drag the menu -->
      <!-- This div move the draggable menu upwards -->
      <!-- <div class="fixed bottom-0 right-0 w-[90px] h-[200px] z-50 touch-none"> -->
      <WrapAndDragEl
        :x-width="viewportWidth"
        :y-height="viewportHeight"
        :mobile="isMobile"
        class=""
        @touchstart.stop
        @touchmove.stop
      >
        <!-- https://ui.nuxt.com/docs/components/popover#with-anchor-slot -->
        <UPopover
          v-model:open="movableMenuOpen"
          arrow
          :content="{ side: 'top', align: 'start' }"
          class="flex flex-col-reverse"
          :ui="{ content: 'w-(--reka-popper-anchor-width)' }"
        >
          <!-- <template #anchor> -->
          <UButton
            :icon="movableMenuOpen ? 'i-iconamoon-close-bold' : 'i-iconamoon-menu-kebab-vertical-bold'"
            :color="movableMenuOpen ? 'secondary' : 'secondary'"
            variant="outline"
            :title="movableMenuOpen ? 'Close Menu' : 'Open Menu'"
            @pointerdown="startHoldTimer"
            @touchstart="startHoldTimer"
            @pointerup="endHoldTimer"
            @touchend="endHoldTimer"
            @click="handleMovableState"
          />
          <!-- </template> -->
          <template #content>
            <div>
              <!-- BUTTON MENU WITH TWO MENU BUTTONS -->
              <div class="w-8">
                <UButton
                  title="Back to Top"
                  icon="i-heroicons-arrow-up-solid"
                  square
                  color="secondary"
                  variant="ghost"
                  aria-label="Back to top"
                  class="ghost h-8"
                  @click="scrollToTop"
                />
                <UButton
                  title="Toggle Language"
                  :icon="isLang ? 'i-fluent-local-language-24-filled' : 'i-ix-language-filled'"
                  color="secondary"
                  square
                  variant="ghost"
                  aria-label="Toggle Language"
                  @click="toggleLang"
                />
                <UChip
                  :text="allNotes.length"
                  size="3xl"
                  color="secondary"
                  position="bottom-left"
                >
                  <UButton
                    title="Image Editor - Edit the og-image that appear on social media on sharing"
                    color="secondary"
                    square
                    variant="subtle"
                    icon="i-lucide-edit"
                    @click="openImageEditor(allNotes)"
                  />
                </UChip>
              </div>
              <UDrawer
                v-model:open="cpOpen"
                handle-only
                :ui="{
                  container: 'p-0',
                  body: 'p-0'
                }"
              >
                <UChip
                  :text="allNotes.length"
                  size="3xl"
                  color="neutral"
                  position="bottom-left"
                >
                  <UButton
                    title="Note Menu with overview of all highlighted text and notes!"
                    color="secondary"
                    square
                    variant="subtle"
                    icon="i-boxicons-menu-notification-filled"
                  />
                </UChip>
                <template #body>
                  <div
                    class="max-h-[80vh] flex flex-col u-command-palette-parent overflow-hidden"
                    :class="{ 'hide-note-details': !showDescriptions }"
                  >
                    <!--
                      Source code:
                      https://ui.nuxt.com/docs/components/command-palette#with-children-in-items
                      class="groups text-muted"   min-h-0 flex flex-col
                    -->
                    <UCommandPalette
                      :ref="handleInputRef"
                      :groups="noteGroups"
                      placeholder="Note Filter..."
                      class="groups text-muted"
                      :autofocus="false"
                      :close="{ color: 'neutral', variant: 'ghost' }"
                      :ui="{
                        input: '[&>input]:[inputmode:none]',
                        root: 'u-command-palette'
                      }"
                      @update:open="cpOpen = false"
                    >
                      <div
                        v-if="showDescriptions"
                        class="text-xs opacity-70 truncate"
                      >
                      <!-- {{ note.text }} -->
                      </div>
                      <template #empty>
                        <div class="flex flex-col items-center justify-center py-12 px-6 text-center">
                          <div
                            v-if="allNotes.length === 0"
                            class="space-y-3"
                          >
                            <UIcon
                              name="i-heroicons-pencil-square"
                              class="w-10 h-10 mx-auto text-gray-400 opacity-50"
                            />
                            <p class="text-sm text-gray-500">
                              No Study Notes yet?
                            </p>
                            <p class="text-xs text-gray-400 italic">
                              Start highlighting text <br>
                              or <br>
                              double-click <br>
                              <br>
                              to view them here!
                            </p>
                          </div>

                          <div
                            v-else
                            class="space-y-3"
                          >
                            <UIcon
                              name="i-heroicons-magnifying-glass"
                              class="w-10 h-10 mx-auto text-gray-400 opacity-50"
                            />
                            <p class="text-sm text-gray-500">
                              No notes match your search <br>
                              <br>
                              <strong>"{{ searchTermRef }}"</strong>
                            </p>
                            <UButton
                              label="Clear Filter"
                              variant="link"
                              color="primary"
                              disabled
                              @click="searchTermRef = ''"
                            />
                          </div>
                        </div>
                      </template>
                      <template #footer>
                        <!--
                        https://gemini.google.com/share/5719bd6e91d8
                        https://gemini.google.com/share/5df860e7dd9a
                        -->
                        <div class="sticky bottom-0 flex items-center justify-between gap-2 w-full">
                          <UDropdownMenu :items="noteActions">
                            <UButton
                              icon="heroicons-pencil-square"
                              label="Note Actions"
                              size="xs"
                              variant="ghost"
                              color="primary"
                            />
                          </UDropdownMenu>

                          <USeparator
                            orientation="vertical"
                            class="h-4"
                          />

                          <UButton
                            color="warning"
                            icon="i-lucide-square-menu"
                            variant="ghost"
                            label="Search"
                            size="xs"
                            @click="$keyboardClickK"
                          />

                          <USeparator
                            orientation="vertical"
                            class="h-4"
                          />

                          <UButton
                            color="secondary"
                            icon="i-lucide-menu"
                            variant="ghost"
                            label="Menu"
                            size="xs"
                            @click="$keyboardClickM"
                          />

                          <USeparator
                            orientation="vertical"
                            class="h-4"
                          />

                          <UButton
                            color="neutral"
                            icon="i-heroicons-x-mark"
                            variant="ghost"
                            label=""
                            size="xs"
                            class="text-dimmed"
                            @click="cpOpen = false"
                          />
                        </div>
                      </template>
                    </UCommandPalette>
                  </div>
                </template>
              </UDrawer>
            </div>
          </template>
        </UPopover>
        <!---->
      </WrapAndDragEl>
      <!-- </div> -->
    </div>
    <input
      ref="fileInput"
      type="file"
      class="hidden"
      accept=".json"
      @change="handleFileChange"
    >
  </ClientOnly>
</template>

<style scoped>
/* TOGGLE THE DESCRIPTION */
/* When the 'hide-note-details' class is active on the parent... */
.hide-note-details :deep([data-slot="itemSuffix"]),
.hide-note-details :deep([data-slot="itemDescription"]) {
  display: none !important;
}

/* This ensures the row height shrinks when the description is gone */
.hide-note-details :deep([data-slot="group"] > button) {
  padding-top: 4px !important;
  padding-bottom: 4px !important;
  min-height: 0 !important;
}

/*  ------------------------  */
</style>
