import { observer } from 'mobx-react'

import { useChatStore } from '../../stores/useStores'

import './ChatHeader.css'

interface ChatHeaderProps {
  onOpenSidebar?: () => void
}

export const ChatHeader = observer(function ChatHeader({
  onOpenSidebar,
}: ChatHeaderProps) {
  const chatStore = useChatStore()
  const title = chatStore.activeSession?.title ?? 'SynthioChat'

  return (
    <header className="chat-header">
      {onOpenSidebar ? (
        <button
          type="button"
          className="chat-header-menu"
          aria-label="Open menu"
          onClick={onOpenSidebar}
        >
          <span
            className="icon-placeholder"
            data-icon="menu"
            aria-hidden="true"
          />
          {/* icon-placeholder: menu */}
        </button>
      ) : null}
      <h1 className="chat-header-title">{title}</h1>
    </header>
  )
})
