import { observer } from 'mobx-react'

import ExpandRightIcon from '../../../Icons/ExpandRightIcon'
import { useChatStore, useUiStore } from '../../../stores/useStores'

import './index.css'

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

  const renderExpandButton = () => {
    if (isSidebarOpen) {
      return null
    }

    return (
      <button
        type="button"
        className="chat-header-icon-btn"
        aria-label="Expand sidebar"
        onClick={onExpandSidebar}
      >
        <ExpandRightIcon fill={iconFill} size={18} />
      </button>
    )
  }

  const renderBadge = () => (
    <span className="chat-header-badge" aria-hidden="true">
      SynthioChat
    </span>
  )

  return (
    <header className="chat-header">
      {renderExpandButton()}
      <h1 className="chat-header-title">{title}</h1>
      {renderBadge()}
    </header>
  )
})
