import { observer } from 'mobx-react'

import ExpandRightIcon from '../../Icons/ExpandRightIcon'
import { useChatStore, useUiStore } from '../../stores/useStores'

import './ChatHeader.css'

interface ChatHeaderProps {
  isSidebarOpen: boolean
  onExpandSidebar: () => void
}

export const ChatHeader = observer(function ChatHeader({
  isSidebarOpen,
  onExpandSidebar,
}: ChatHeaderProps) {
  const chatStore = useChatStore()
  const uiStore = useUiStore()
  const title = chatStore.activeSession?.title ?? 'SynthioChat'
  const iconFill = uiStore.isDark ? '#f5f5f5' : '#171717'

  return (
    <header className="chat-header">
      {!isSidebarOpen ? (
        <button
          type="button"
          className="chat-header-icon-btn"
          aria-label="Expand sidebar"
          onClick={onExpandSidebar}
        >
          <ExpandRightIcon fill={iconFill} size={18} />
        </button>
      ) : null}
      <h1 className="chat-header-title">{title}</h1>
      <span className="chat-header-badge" aria-hidden="true">
        SynthioChat
      </span>
    </header>
  )
})
