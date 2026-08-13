/* eslint-disable @typescript-eslint/no-explicit-any */
// provide global helpers (functions)

export default defineNuxtPlugin(() => {
  return {
    provide: {
      globalTest(content) {
        console.log('test test')
        alert(content)
      },
      created(timeStamp) {
        const dateObj = new Date(timeStamp)
        const date = dateObj.getDate().toString()
        let month = dateObj.getMonth() + 1 as any
        month = month.toString()
        const year = dateObj.getFullYear().toString()
        const time = dateObj.toLocaleString().slice(11, 17)
        return date + '/' + month + '/' + year.slice(2) + ' ' + time
      },

      localeDate(timeStamp) {
        const dateObj = new Date(timeStamp)
        return dateObj.toLocaleString()
      },

      keyboardClickO() {
        const targetElement = document
        const keyOEvent = new KeyboardEvent('keydown', {
          key: 'o',
          code: 'KeyO',
          bubbles: true,
          cancelable: true
        })
        targetElement.dispatchEvent(keyOEvent)
      },

      activateNoteMenu() {
        const targetElement = document
        const noteMenuEvent = new KeyboardEvent('keydown', {
          key: 'm',
          code: 'KeyM',
          keyCode: 77,
          bubbles: true,
          cancelable: true
        })
        targetElement.dispatchEvent(noteMenuEvent)
      }
    }
  }
})
