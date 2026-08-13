// /* eslint-disable @typescript-eslint/no-explicit-any */
export const useGlobalValue = () => {
  // Use useState for SSR-friendly shared state
  const globalValue = useState<boolean>('myGlobalKey', () => false)

  /*
  // 'Register' or watch for changes
  watch(globalValue, (newValue, oldValue) => {
    console.log(`Global value changed from "${oldValue}" to "${newValue}"`)
  })
  */

  return globalValue
}

export const useOpenMenu = () => useState<boolean>('openMenu', () => false)
export const useTimeStamp = () => useState<number>('timeStamp', () => 0)
export const useLastActionTime = () => useState<number>('lastActionTime', () => 0)
export const useViewportWidth = () => useState<number>('viewportWidth', () => 0)
export const useViewportHeight = () => useState<number>('viewportHeight', () => 0)
export const usePlaceholderText = () => useState<string>('placeholderText', () => 'Ref: «This Note App was not able to automatically grab a quotation from the text. Try to double click again or copy/paste a quotation! NB! Keep the French Apostrophes around the quotation. If Not this Note App will not be able to create a sharable link to this quotation!»')
export const usePageId = () => useState<string>('pageId', () => '')
export const useUrlHash = () => useState<string>('urlHash', () => '')
export const usePageTitle = () => useState<string>('pageTitle', () => '')

export const useSourceVolume = () => useState<string>('sourceVolume', () => '')

// export const useCloseElement = () => useState<HTMLButtonElement>('closeElement', () => null)
