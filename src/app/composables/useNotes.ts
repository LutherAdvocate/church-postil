// composables/useNotes.ts
import { useLocalStorage } from '@vueuse/core'

export const useNotes = () => {
  // We use the same key so it syncs with your existing data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allNotes = useLocalStorage<any[]>('global-church-notes', [])

  return {
    allNotes
  }
}
