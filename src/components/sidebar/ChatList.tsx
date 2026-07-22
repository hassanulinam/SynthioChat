import { observer } from 'mobx-react'

import { EmptyState } from '../common/EmptyState'
import { useChatStore } from '../../stores/useStores'

import { ChatItem } from './ChatItem'

export const ChatList = observer(function ChatList() {
  const chatStore = useChatStore()

  if (!chatStore.hasSessions) {
    return <EmptyState title="Start a new conversation" />
  }

  return (
    <ul className="chat-list" aria-label="Chat sessions">
      {chatStore.sessions.map((session) => (
        <li key={session.id}>
          <ChatItem session={session} />
        </li>
      ))}
    </ul>
  )
})
