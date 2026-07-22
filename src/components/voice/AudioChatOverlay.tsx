import { observer } from 'mobx-react'

import { Button } from '../common/Button'
import { ErrorBanner } from '../common/ErrorBanner'
import { useChatStore, useVoiceStore } from '../../stores/useStores'

import { ListenerAnimation } from './ListenerAnimation'
import './AudioChatOverlay.css'

export const AudioChatOverlay = observer(function AudioChatOverlay() {
  const voiceStore = useVoiceStore()
  const chatStore = useChatStore()

  if (!voiceStore.isAudioChatActive) {
    return null
  }

  const renderDraft = () => {
    const draft = voiceStore.audioChatDraft.trim()
    if (!draft) {
      return (
        <p className="audio-chat-overlay-hint">
          Speak your question. I will respond after a brief pause.
        </p>
      )
    }

    return <p className="audio-chat-overlay-draft">{draft}</p>
  }

  return (
    <div className="audio-chat-overlay" aria-label="Audio chat">
      <div className="audio-chat-panel">
        <header className="audio-chat-panel-header">
          <h2 className="audio-chat-panel-title">Audio chat</h2>
          <p className="audio-chat-panel-subtitle">Hands-free conversation mode</p>
        </header>

        <div className="audio-chat-panel-body">
          <ListenerAnimation phase={voiceStore.audioChatPhase} />
          {renderDraft()}
          {voiceStore.error ? (
            <ErrorBanner
              message={voiceStore.error}
              onDismiss={() => voiceStore.clearError()}
            />
          ) : null}
          {chatStore.error ? (
            <ErrorBanner
              message={chatStore.error}
              onRetry={() => {
                void chatStore.retryLastMessage()
              }}
              onDismiss={() => chatStore.clearError()}
            />
          ) : null}
        </div>

        <footer className="audio-chat-panel-footer">
          <Button
            type="button"
            variant="danger"
            onClick={() => voiceStore.stopAudioChat()}
          >
            Stop audio chat
          </Button>
        </footer>
      </div>
    </div>
  )
})
