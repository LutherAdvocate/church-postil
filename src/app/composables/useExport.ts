/* eslint-disable @typescript-eslint/no-explicit-any */
// composables/useExport.ts
export const useExport = () => {
  const toast = useToast()

  const sendToGmail = (groupedNotes: any, totalCount: number) => {
    const myEmail = 'jur.eleison@gmail.com'
    const subject = encodeURIComponent(`Scripture Study Notes (${totalCount} notes) - ${new Date().toLocaleDateString()}`)

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

    // 2. Construct the Gmail Web URL
    // 'to' sets the recipient, 'su' sets the subject, 'body' sets the content
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${myEmail}&su=${subject}&body=${encodeURIComponent(bodyText)}`

    try {
      toast.add({
        title: 'Preparing Gmail...',
        description: `Exporting ${totalCount} notes.`,
        icon: 'i-heroicons-envelope'
      })

      // 3. Open in a new tab
      window.open(gmailUrl, '_blank')
    } catch (err) {
      console.error('Gmail launch failed', err)
    }
  }

  return { sendToGmail }
}
