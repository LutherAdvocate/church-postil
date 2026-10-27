// provide global function for toggle language

export default defineNuxtPlugin(() => {
  return {
    provide: {
      toggleLanguageOnMainPages(newLocale) { // inside closeMenuAndUpdate
        const oldPath = ref<string>(window.location.pathname)

        if (oldPath.value.endsWith('/notes') || oldPath.value.endsWith('/intro')) {
          console.log('/notes and /intro pages is not translated')
          return
        }

        let restPath = oldPath.value?.slice(3)
        if (restPath.startsWith('/')) restPath = restPath.slice(1)

        let newPath = `../${newLocale}/${restPath}`
        // correction for removing ex. advent/index.md to ex. ../advent-postil
        if (newPath.startsWith('../en') && newPath.endsWith('-postil')) {
          newPath = newPath.slice(0, -7) // prepare for redirect from da to en postil (without the "-postil" ending)
        }

        const endings = ['advent', 'christmas', 'lent', 'easter', 'trinity1', 'trinity2']
        function endingWith(str, suffixes) {
          return suffixes.some(function (suffix) {
            return str.endsWith(suffix)
          })
        }
        const router = useRouter()

        if (endingWith(newPath, endings)) {
          console.log('Toggle language of the six main pages (except the root pages) ', newPath)
          if (newPath.startsWith('../da'))
            router.push(`${newPath}-postil`) // redirecting to an da postil
          else router.push(`${newPath}`)

        } else if (!endings.some(folder => newPath.includes(folder))) { // if path not ends with postil folder
          // This if is necessary when en and then click on danish pages in the header menu
          console.log('Toggle language of root page; oldPath: ', oldPath.value)
          // if (!route.path.endsWith('/note') || !route.path.endsWith('/intro')) return // does not redirect to the other language if the page is a note or intro page, because these pages are not translated yet
          
          // Checking if the old route exists in the new language code - if not note or intro page
          const index2LastSlash = newPath.lastIndexOf('/')
          let resultUrl
          if (!router.hasRoute(newPath)) {
            if (index2LastSlash !== -1) {
              // removing /filename and returning to the folders index-file
              resultUrl = newPath.slice(0, index2LastSlash)
              router.push(`../${resultUrl}`)
              // removing the old locale value with ../
            }
            return
          }
        } else console.log('This page/path: ', oldPath, ' have no code in plugins/toggleLanguageOnMainPages.ts')
      } // End of function toggleLanguageOnMainPages()
    }
  }
})
/*
PLAN: PATH TO SERMONS IN DANISH AND ENGLISH MUST BE COORDINATED
IF NOT: TOGGLE OF LANGUAGE DON'T LOAD THE SAME SERMON IN OPPOSITE LANGUAGE
THE PROBLEM IS THE NAME OF THE HEADERS LINKS...
*/
