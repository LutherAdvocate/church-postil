import pageMapData from '../assets/json//file-list.json'

export const useOppositeLanguage = () => {
  // This is your lookup table - pageMapData
  // const pageMap: Record<string, { da: string; en: string }> = { 1011: { /* See json file */
  const pageMap = pageMapData
  /**
   * Returns the path for the selected language
   * @param id - The page ID (e.g., "1011")
   * @param currentLocale - The current language (locale.value)
   */
  const getPagePath = (id: string | number, currentLocale: string): string => {
    const entry = pageMap[id.toString()]

    if (!entry) {
      console.warn(`ID ${id} not found in pageMap`)
      return '/' // Fallback to home if ID is missing
    }

    // If current is 'en', return 'da', and vice versa
    return currentLocale === 'en' ? entry.en : entry.da
  }

  const getIdByPath = (fullPath: string): string | null => {
    // 1. Early exit if no path is provided
    if (!fullPath) return null

    // 2. Look for an exact match in the pageMap
    const entry = Object.entries(pageMap).find(([_, paths]) => {
      // Check if fullPath matches either the Danish or English version exactly
      return paths.da === fullPath || paths.en === fullPath
    })

    // 3. Return the key (ID) if found, otherwise null
    return entry ? entry[0] : null
  }

  return {
    getPagePath, getIdByPath
  }
}

// source: https://gemini.google.com/share/continue/1f70050d441f
