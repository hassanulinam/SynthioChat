import type { FormEvent, KeyboardEvent } from 'react'
import { useEffect, useRef } from 'react'
import { observer } from 'mobx-react'

import { ErrorBanner } from '../common/ErrorBanner'
import { useChatStore, useVoiceStore } from '../../stores/useStores'

import { ComposerVoiceControls } from './ComposerVoiceControls'
import { SendButton } from './SendButton'
import './MessageComposer.css'

export const MessageComposer = observer(function MessageComposer() {
  const chatStore = useChatStore()
  const voiceStore = useVoiceStore()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const canSend =
    chatStore.composerText.trim().length > 0 && !chatStore.isLoading

  useEffect(() => {
    const el = textareaRef.current
    if (!el) {
      return
    }

    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`
  }, [chatStore.composerText])

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

  const renderVoiceError = () => {
    if (!voiceStore.error || voiceStore.isAudioChatActive) {
      return null
    }

    return (
      <div className="message-composer-error">
        <ErrorBanner
          message={voiceStore.error}
          onRetry={() => voiceStore.retryMic()}
          onDismiss={() => voiceStore.clearError()}
        />
      </div>
    )
  }

  return (
    <div className="message-composer-wrap">
      {renderVoiceError()}
      <form className="message-composer" onSubmit={handleSubmit}>
        <div className="message-composer-shell">
          <label className="sr-only" htmlFor="message-input">
            Message
          </label>
          <textarea
            id="message-input"
            ref={textareaRef}
            className="message-composer-input"
            rows={1}
            placeholder={
              voiceStore.isMicActive ? 'Listening…' : 'Ask anything'
            }
            value={chatStore.composerText}
            onChange={(event) => chatStore.setComposerText(event.target.value)}
            onKeyDown={handleKeyDown}
            disabled={chatStore.isLoading}
          />
          <div className="message-composer-actions">
            {canSend ? <SendButton disabled={!canSend} /> : null}
            <ComposerVoiceControls />
          </div>
        </div>
      </form>
    </div>
  )
})
