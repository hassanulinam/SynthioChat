import { observer } from 'mobx-react'

import type { ChatSession } from '../../types/chat.types'
import { useChatStore } from '../../stores/useStores'

import './ChatItem.css'

interface ChatItemProps {
  session: ChatSession
}

export const ChatItem = observer(function ChatItem({ session }: ChatItemProps) {
  const chatStore = useChatStore()
  const isActive = chatStore.activeSessionId === session.id

  return (
    <button
      type="button"
      className={`chat-item${isActive ? ' chat-item--active' : ''}`}
      onClick={() => chatStore.switchChat(session.id)}
      aria-current={isActive ? 'true' : undefined}
    >
      <span className="chat-item-title">{session.title}</span>
    </button>
  )
})
