import { formatTimestamp } from '../../utils/date'
import type { Message } from '../../types/chat.types'

import './MessageBubble.css'

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div
      className={`message-bubble${isUser ? ' message-bubble--user' : ' message-bubble--assistant'}`}
    >
      <p className="message-bubble-content">{message.content}</p>
      <time className="message-bubble-time" dateTime={message.createdAt.toISOString()}>
        {formatTimestamp(message.createdAt)}
      </time>
    </div>
  )
}
