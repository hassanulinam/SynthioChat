import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { formatTimestamp } from '../../../utils/date'
import type { Message } from '../../../types/chat.types'

import './index.css'

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  const renderContent = () => {
    if (isUser) {
      return <p className="message-bubble-content">{message.content}</p>
    }

    return (
      <div className="message-bubble-content message-bubble-content--markdown">
        <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
      </div>
    )
  }

  const renderTimestamp = () => (
    <time className="message-bubble-time" dateTime={message.createdAt.toISOString()}>
      {formatTimestamp(message.createdAt)}
    </time>
  )

  return (
    <div
      className={`message-row${isUser ? ' message-row--user' : ' message-row--assistant'}`}
    >
      <div
        className={`message-bubble${isUser ? ' message-bubble--user' : ' message-bubble--assistant'}`}
      >
        {renderContent()}
        {renderTimestamp()}
      </div>
    </div>
  )
}
