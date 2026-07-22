import { observer } from 'mobx-react'

import { ErrorBanner } from '../common/ErrorBanner'
import { AudioChatOverlay } from '../voice/AudioChatOverlay'
import { useChatStore, useVoiceStore } from '../../stores/useStores'

import { ChatHeader } from './ChatHeader'
import { MessageComposer } from './MessageComposer'
import { MessageList } from './MessageList'
import './ChatWindow.css'

interface ChatWindowProps {
  onOpenSidebar?: () => void
}

export const ChatWindow = observer(function ChatWindow({
  onOpenSidebar,
}: ChatWindowProps) {
  const chatStore = useChatStore()
  const voiceStore = useVoiceStore()
  const isAudioChat = voiceStore.isAudioChatActive

  const renderError = () => {
    if (!chatStore.error || isAudioChat) {
      return null
    }

    return (
      <div className="chat-window-error">
        <ErrorBanner
          message={chatStore.error}
          onRetry={() => {
            void chatStore.retryLastMessage()
          }}
          onDismiss={() => chatStore.clearError()}
        />
      </div>
    )
  }

  return (
    <section className="chat-window" aria-label="Chat">
      <ChatHeader onOpenSidebar={onOpenSidebar} />
      {renderError()}
      {!isAudioChat ? <MessageList /> : null}
      <AudioChatOverlay />
      {!isAudioChat ? <MessageComposer /> : null}
    </section>
  )
})
