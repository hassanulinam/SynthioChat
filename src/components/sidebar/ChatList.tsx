import { observer } from 'mobx-react'

import { EmptyState } from '../common/EmptyState'
import { useChatStore } from '../../stores/useStores'
import type { ChatSession } from '../../types/chat.types'

import { ChatItem } from './ChatItem'
import './ChatList.css'

export const ChatList = observer(function ChatList() {
  const chatStore = useChatStore()
  const hasQuery = chatStore.searchQuery.trim().length > 0

  const renderEmpty = () => {
    if (!chatStore.hasSessions) {
      return <EmptyState title="Start a new conversation" />
    }

    if (hasQuery && !chatStore.hasSearchResults) {
      return <EmptyState title="No chats found" description="Try a different search." />
    }

    return null
  }

  const renderSection = (title: string, sessions: ChatSession[]) => {
    if (sessions.length === 0) {
      return null
    }

    return (
      <section className="chat-list-section" aria-label={title}>
        <h3 className="chat-list-section-title">{title}</h3>
        <ul className="chat-list">
          {sessions.map((session) => (
            <li key={session.id}>
              <ChatItem session={session} />
            </li>
          ))}
        </ul>
      </section>
    )
  }

  const empty = renderEmpty()
  if (empty) {
    return empty
  }

  return (
    <div className="chat-list-groups">
      {renderSection('Pinned', chatStore.pinnedSessions)}
      {renderSection('Chats', chatStore.unpinnedSessions)}
    </div>
  )
})
