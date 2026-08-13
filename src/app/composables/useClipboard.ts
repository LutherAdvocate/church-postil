/* eslint-disable @typescript-eslint/no-explicit-any */
// composables/useClipboard.ts
export const useClipboard = () => {
  const toast = useToast()

  const copyNotesToClipboard = async (groupedNotes: any, toGmail) => {
    // 1. Build the Plain Text Body
    let bodyText = 'SCRIPTURE STUDY NOTES\n\n'

    groupedNotes.forEach((group: any) => {
      bodyText += `============================\n`
      bodyText += `SOURCE: ${group.path}\n`
      bodyText += `TITLE: ${group.title}\n`
      bodyText += `============================\n\n`

      group.items.forEach((note: any) => {
        // The Note text
        bodyText += `${note.text}\n`
        // The Timestamp on the line below
        const date = new Date(Number(note.id)).toLocaleString('en-GB', {
          day: '2-digit',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit'
        })
        bodyText += `[Captured: ${date}]\n`
        bodyText += `----------------------------\n\n`
      })
    })

    // 2. Create the blob as PLAIN TEXT
    try {
      // We use the simpler text/plain approach you liked
      const blob = new Blob([bodyText], { type: 'text/plain' })
      const data = [
        new ClipboardItem({
          ['text/plain']: blob
        })
      ]

      // Now 'await' is allowed because the function is 'async'
      await navigator.clipboard.write(data)

      toast.add({
        title: 'Copied to Clipboard!',
        description: toGmail ? 'Opening Gmail... just paste your notes.' : 'Paste the Notes from Clip board, manually!',
        icon: 'i-heroicons-clipboard-document-check'
      })
      if (!toGmail) return
      // Open Gmail after a short delay
      setTimeout(() => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
        const url = isMobile
          ? 'https://mail.google.com'
          : 'https://mail.google.com/mail/?view=cm&fs=1'
        window.open(url, '_blank')
      }, 1200)
    } catch (err) {
      console.error('Clipboard error:', err)
      toast.add({ title: 'Copy Failed', color: 'warning' })
    }
  }

  return { copyNotesToClipboard }
}
