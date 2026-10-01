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
      },

      formatUrl2Text(fullPath) {
        if (!fullPath.startsWith('/en')) return '';

        // eslint-disable-next-line no-useless-assignment
        let targetString = '';
        let isHash = false;

        // 1. Separate Path vs Hash
        if (fullPath.includes('#')) {
          targetString = fullPath.split('#')[1];
          isHash = true;
        } else {
          const segments = fullPath.split('?')[0].split('/');
          targetString = segments[segments.length - 1];
          targetString = targetString.replace(/\.[^/.]+$/, "");
        }

        if (!targetString) return '';

        // 2. Apply Custom Rules if it's a Hash String
        if (isHash) {
        // Rule A: Remove leading underscore if present
        if (targetString.startsWith('_')) {
            targetString = targetString.substring(1);
        }

        // Rule B: Add space between stuck numbers and words (e.g., "1sunday" -> "1 sunday")
        targetString = targetString.replace(/(\d)([a-zA-Z])/g, '$1 $2');
        targetString = targetString.replace(/([a-zA-Z])(\d)/g, '$1 $2');

        // Rule C: Capitalize every single segment
        const cleanText = targetString.replace(/\s+/g, '-');
        const words = cleanText.split('-');
        
        const processedWords = words
          .filter(word => word.length > 0)
          .map(word => word.charAt(0).toUpperCase() + word.slice(1));

        // Rejoin text words with spaces
        let resultText = processedWords.join(' ');

        // Rule D: Fix the scripture formatting at the very end
        // Matches something like "Luke 2 41 52" at the end and changes it to "Luke 2: 41-52"
        resultText = resultText.replace(/\s(\d+)\s(\d+)\s(\d+)$/, ' $1: $2-$3');

        return resultText;
      }

      // 3. Fallback: Standard conversion for clean Filenames
      return targetString
        .split('-')
        .filter(word => word.length > 0)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      } // End for formatUrl2Text

    } // End of provide
  }
})
