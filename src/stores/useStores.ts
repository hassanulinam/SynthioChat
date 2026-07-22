import { useContext } from 'react'

import { StoreContext } from './StoreContext'
import type { RootStore } from './rootStore'

function useRootStore(): RootStore {
  const store = useContext(StoreContext)
  if (!store) {
    throw new Error('useRootStore must be used within StoreProvider')
  }
  return store
}

export function useChatStore() {
  return useRootStore().chatStore
}

export function useVoiceStore() {
  return useRootStore().voiceStore
}

export function useUiStore() {
  return useRootStore().uiStore
}
