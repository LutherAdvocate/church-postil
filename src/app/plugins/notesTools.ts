/* eslint-disable @typescript-eslint/no-explicit-any */
// provide global helpers (functions)

export default defineNuxtPlugin(() => {
  const useClipboardExport = () => {
    const toast = useToast()

    const copyNotesToClipboard = async (groupedNotes: any) => {
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
          description: 'Opening Gmail... just paste your notes.',
          icon: 'i-heroicons-clipboard-document-check'
        })

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

  const openPrintableMdNotes = (groupedNotes: any) => {
    // 1. Build the Markdown String
    let markdown = `# Scripture Study Notes\n\n`
    markdown += `> Generated on: ${new Date().toLocaleDateString()}\n\n---\n\n`

    groupedNotes.forEach((group: any) => {
      markdown += `## ${group.path}\n`
      markdown += `### ${group.title}\n\n`

      group.items.forEach((item: any) => {
        // Markdown bullet points
        markdown += `- ${item.text}\n`
      })
      markdown += `\n---\n\n`
    })

    // 2. Create a Blob (Binary Large Object) of the text
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' })

    // 3. Create a temporary URL for that blob
    const url = URL.createObjectURL(blob)

    // 4. Open it in a new window/tab
    window.open(url, '_blank')

    // Optional: Clean up the URL after a minute to save memory
    setTimeout(() => URL.revokeObjectURL(url), 60000)
  }

  const openStyledNotes = (groupedNotes: any) => {
    const content = groupedNotes.map(g => `
      <h2>${g.path}</h2>
      <p><strong>${g.title}</strong></p>
      <ul>${g.items.map(i => `<li>${i.text}</li>`).join('')}</ul>
    `).join('<hr>')

    const html = `
      <!DOCTYPE html>
        <head>
          <title>Scripture Notes</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta charset="UTF-8">
          <style>
             /* This only affects the browser view */
            body { font-family: sans-serif; line-height: 1.6; padding: 40px; max-width: 768px; margin: auto; }
            h2 { color: #2c3e50; border-bottom: 1px solid #eee; }
            @media screen and (max-width: 768px) {
              body {
                zoom: 1.5; /* Simple but non-standard */
                /* OR use transform for better compatibility */
                transform: scale(1);
                transform-origin: top left;
                width: 63%; /* Offset the scale to prevent horizontal scroll (1/1.2) */
              }
            }
            @media print {
              button { display: none; }
              body {
                zoom: 1 !important;
                transform: none !important;
                width: 100% !important;
              }
              /* Hide the print button itself on the paper */
            }
          </style>
          <script>
            setTimeout(() => {
              alert('Click on Print button to print this page!')
            }, 500)
            console.log('Styled print page for notes!')
          </script>
        </head>
        <body>
          <h1>Study Notes</h1>
          <button class="print-button" onclick="window.print()">Print This Page</button>
          ${content}
        </body>
      </html>
    `

    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
  }

  const downloadFile = (url, name) => {
    if (!url) return
    // Create a temorary element
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', name === undefined ? 'download-from-church-postil' : name)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportNotesAsFile = (groupedNotes: any) => {
    // 1. Build your Markdown string (same as before)
    let markdown = `# Scripture Study Notes\n\n`
    groupedNotes.forEach((group: any) => {
      markdown += `## ${group.path} - ${group.title}\n`
      group.items.forEach((item: any) => {
        if (item.text.trim()) markdown += `- ${item.text}\n`
      })
      markdown += `\n`
    })

    // 2. Create the Blob
    const blob = new Blob([markdown], { type: 'text/markdown' })

    // 3. GENERATE THE URL
    const blobUrl = URL.createObjectURL(blob)

    // 4. CALL YOUR DOWNLOAD FUNCTION
    downloadFile(blobUrl, 'md-notes-from-church-postil-downloaded.md')

    // 5. Cleanup the memory
    setTimeout(() => URL.revokeObjectURL(blobUrl), 60000)
  }

  return {
    provide: {
      useClipboardExport: useClipboardExport,
      openPrintableMdNotes: openPrintableMdNotes,
      openStyledNotes: openStyledNotes,
      downloadFile: downloadFile,
      exportNotesAsFile: exportNotesAsFile

    }
  }
})
