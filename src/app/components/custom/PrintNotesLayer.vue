<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @stylistic/arrow-parens -->
<script setup lang="ts">
// Use your shared composable
const { allNotes } = useNotes()
const toast = useToast()
// const { $created, $localeDate } = useNuxtApp() as any

// Group notes by Path + Title
const groupedNotes = computed(() => {
  const groups: Record<string, any> = {}

  allNotes.value.forEach((note: any) => {
    // Create a unique key for the group
    const groupKey = `${note.path}-${note.title}`

    if (!groups[groupKey]) {
      groups[groupKey] = {
        path: note.path,
        title: note.title,
        items: []
      }
    }
    groups[groupKey].items.push(note)
  })

  return Object.values(groups)
})

const formatTimestamp = (id: number | string) => {
  const date = new Date(Number(id))
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  })
}
toast.add({ title: 'Print Notes!', description: 'Click the Print button to print notes!' })
alert('Click on the Print Button to Print the page!')
console.log('Styled Printable Notes opened in new tab!')
</script>

<template>
  <Teleport to="body">
    <div class="print-container-final">
      <header class="print-header">
        <h1>Study Notes</h1>
      </header>

      <div
        v-for="group in groupedNotes"
        :key="group.path + group.title"
        class="print-group"
      >
        <div class="group-header">
          <div class="print-path">
            {{ group.path }}
          </div>
          <div class="print-note-title">
            {{ group.title }}
          </div>
        </div>

        <div
          v-for="note in group.items"
          :key="note.id"
          class="print-note-item"
        >
          <p class="print-text">
            {{ note.text }}
          </p>
          <div class="print-meta">
            {{ formatTimestamp(note.id) }}
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style>
/* IMPORTANT: No 'scoped' attribute here so it can target the body and #__nuxt */

.print-container-final {
  display: none !important;
}

@media screen {
  .print-container-final {
    display: none !important;
  }
}

/* Your working CSS logic */
body.is-printing {
  background: white !important;
}

body.is-printing #__nuxt,
body.is-printing #teleports,
body.is-printing [id^="headlessui-portal"] {
  display: none !important;
}

body.is-printing .print-container-final {
  display: block !important;
  visibility: visible !important;
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100% !important;
  color: black !important;
  padding: 40px !important;
}

/* EXTRA */
@page {
  size: auto;
  margin: 15mm; /* Nice margins for the paper */
}

/* ... keep your body.is-printing visibility logic from before ... */

.print-group {
  margin-bottom: 40px;
  page-break-inside: avoid;
}

.group-header {
  border-bottom: 2px solid #000;
  margin-bottom: 15px;
  padding-bottom: 5px;
}

.print-path {
  font-size: 9pt;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.print-note-title {
  font-size: 16pt;
  font-weight: bold;
  color: #000;
}

.print-note-item {
  margin-left: 20px;
  margin-bottom: 20px;
  border-left: 1px solid #ddd;
  padding-left: 15px;
  position: relative;
}

.print-text {
  font-size: 13pt;
  line-height: 1.5;
  margin: 0;
}

.print-meta {
  font-size: 8pt;
  color: #999;
  text-align: right;
  font-style: italic;
}
</style>
