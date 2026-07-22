import { useEffect, useRef } from 'react'
import { observer } from 'mobx-react'

import { EmptyState } from '../common/EmptyState'
import { useChatStore } from '../../stores/useStores'

import { MessageBubble } from './MessageBubble'
import { TypingIndicator } from './TypingIndicator'
import './MessageList.css'

export const MessageList = observer(function MessageList() {
  const chatStore = useChatStore()
  const bottomRef = useRef<HTMLDivElement>(null)
  const messages = chatStore.activeMessages

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages.length, chatStore.isLoading])

  const renderEmpty = (title: string) => (
    <div className="message-list message-list--empty">
      <EmptyState title={title} />
    </div>
  )

  const renderMessages = () => (
    <div className="message-list" aria-live="polite">
      <div className="message-list-column">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {chatStore.isLoading ? <TypingIndicator /> : null}
        <div ref={bottomRef} />
      </div>
    </div>
  )

  if (!chatStore.activeSession) {
    return renderEmpty('Start a new conversation')
  }

  if (messages.length === 0 && !chatStore.isLoading) {
    return renderEmpty("What's on the agenda today?")
  }

  return renderMessages()
})
