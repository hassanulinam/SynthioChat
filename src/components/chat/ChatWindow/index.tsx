import { observer } from 'mobx-react'

import { ErrorBanner } from '../../common/ErrorBanner'
import { AudioChatOverlay } from '../../voice/AudioChatOverlay'
import { useChatStore, useVoiceStore } from '../../../stores/useStores'

import { ChatHeader } from '../ChatHeader'
import { MessageComposer } from '../MessageComposer'
import { MessageList } from '../MessageList'
import './index.css'

interface ChatWindowProps {
  isSidebarOpen: boolean
  onExpandSidebar: () => void
}

export const ChatWindow = observer(function ChatWindow({
  isSidebarOpen,
  onExpandSidebar,
}: ChatWindowProps) {
  const chatStore = useChatStore()
  const voiceStore = useVoiceStore()
  const isAudioChat = voiceStore.isAudioChatActive

  const renderHeader = () => (
    <ChatHeader
      isSidebarOpen={isSidebarOpen}
      onExpandSidebar={onExpandSidebar}
    />
  )

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

  const renderMessages = () => {
    if (isAudioChat) {
      return null
    }

    return <MessageList />
  }

  const renderComposer = () => {
    if (isAudioChat) {
      return null
    }

    return <MessageComposer />
  }

  return (
    <section className="chat-window" aria-label="Chat">
      {renderHeader()}
      {renderError()}
      {renderMessages()}
      <AudioChatOverlay />
      {renderComposer()}
    </section>
  )
})
