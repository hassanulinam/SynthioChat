import type { ReactNode } from 'react'

import { rootStore, type RootStore } from './rootStore'
import { StoreContext } from './StoreContext'

interface StoreProviderProps {
  children: ReactNode
  store?: RootStore
}

export function StoreProvider({ children, store = rootStore }: StoreProviderProps) {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
