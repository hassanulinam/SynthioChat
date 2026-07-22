import { useEffect, useRef } from 'react'
import { observer } from 'mobx-react'

import { EmptyState } from '../../common/EmptyState'
import { useChatStore } from '../../../stores/useStores'

import { ChatEmptyState } from '../ChatEmptyState'
import { FollowUpChips } from '../FollowUpChips'
import { MessageBubble } from '../MessageBubble'
import { TypingIndicator } from '../TypingIndicator'
import './index.css'

export const MessageList = observer(function MessageList() {
  const chatStore = useChatStore()
  const bottomRef = useRef<HTMLDivElement>(null)
  const messages = chatStore.activeMessages

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages.length, chatStore.isLoading])

  const handleFollowUpPrefill = (text: string) => {
    chatStore.setComposerText(text)
    window.requestAnimationFrame(() => {
      const input = document.getElementById('message-input')
      if (input instanceof HTMLTextAreaElement) {
        input.focus()
        const length = input.value.length
        input.setSelectionRange(length, length)
      }
    })
  }

  const renderNoSession = () => (
    <div className="message-list message-list--empty">
      <EmptyState title="Start a new conversation" />
    </div>
  )

  const renderMessages = () => (
    <div className="message-list" aria-live="polite">
      <div className="message-list-column">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {chatStore.isLoading ? <TypingIndicator /> : null}
        <FollowUpChips onPrefill={handleFollowUpPrefill} />
        <div ref={bottomRef} />
      </div>
    </div>
  )

  if (!chatStore.activeSession) {
    return renderNoSession()
  }

  if (messages.length === 0 && !chatStore.isLoading) {
    return <ChatEmptyState />
  }

  return renderMessages()
})
