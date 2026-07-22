import type { FormEvent, KeyboardEvent } from 'react'
import { observer } from 'mobx-react'

import { useChatStore } from '../../stores/useStores'

import { SendButton } from './SendButton'
import './MessageComposer.css'

export const MessageComposer = observer(function MessageComposer() {
  const chatStore = useChatStore()
  const canSend =
    chatStore.composerText.trim().length > 0 && !chatStore.isLoading

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!canSend) {
      return
    }
    void chatStore.sendMessage()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      if (canSend) {
        void chatStore.sendMessage()
      }
    }
  }

  return (
    <form className="message-composer" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="message-input">
        Message
      </label>
      <textarea
        id="message-input"
        className="message-composer-input"
        rows={1}
        placeholder="Type a message…"
        value={chatStore.composerText}
        onChange={(event) => chatStore.setComposerText(event.target.value)}
        onKeyDown={handleKeyDown}
        disabled={chatStore.isLoading}
      />
      <SendButton disabled={!canSend} />
    </form>
  )
})
