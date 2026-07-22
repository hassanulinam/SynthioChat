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

  if (!chatStore.activeSession) {
    return (
      <div className="message-list message-list--empty">
        <EmptyState title="Start a new conversation" />
      </div>
    )
  }

  if (messages.length === 0 && !chatStore.isLoading) {
    return (
      <div className="message-list message-list--empty">
        <EmptyState title="How can I help you today?" />
      </div>
    )
  }

  return (
    <div className="message-list" aria-live="polite">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {chatStore.isLoading ? <TypingIndicator /> : null}
      <div ref={bottomRef} />
    </div>
  )
})
