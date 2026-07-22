import './TypingIndicator.css'

export function TypingIndicator() {
  return (
    <div className="typing-indicator" aria-live="polite" aria-label="Assistant is typing">
      <span className="typing-indicator-dot" />
      <span className="typing-indicator-dot" />
      <span className="typing-indicator-dot" />
    </div>
  )
}
