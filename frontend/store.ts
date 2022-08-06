import create from 'zustand'
import { persist } from 'zustand/middleware'

import { QueryOptions } from './api'
import { GetItem, RemoveItem, SetItem } from './wailsjs/go/app/App'

interface State {
  dismissedHints: string[]
  dismissHint: (hint: string) => void
  resetHints: () => void
  queryHistory: { query: string; options: QueryOptions }[]
  setQueryHistory: (queries: { query: string; options: QueryOptions }[]) => void
  clearQueries: () => void
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      dismissedHints: [],
      dismissHint: (hint) =>
        set((state) => ({
          dismissedHints: Array.from(new Set([...state.dismissedHints, hint])),
        })),
      resetHints: () => set(() => ({ dismissedHints: [] })),
      queryHistory: [],
      setQueryHistory: (queries) => set(() => ({ queryHistory: queries })),
      clearQueries: () => set(() => ({ queryHistory: [] })),
    }),
    {
      name: 'store',
      // Use local storage if running in a browser, use the Go app's storage
      // if running in standalone mode
      getStorage: () =>
        'go' in window
          ? { getItem: GetItem, setItem: SetItem, removeItem: RemoveItem }
          : window.localStorage,
    }
  )
)
