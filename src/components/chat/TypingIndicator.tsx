import './TypingIndicator.css'

export function TypingIndicator() {
  const renderDots = () => (
    <>
      <span className="typing-indicator-dot" />
      <span className="typing-indicator-dot" />
      <span className="typing-indicator-dot" />
    </>
  )

  return (
    <div className="typing-indicator" aria-live="polite" aria-label="Assistant is typing">
      {renderDots()}
    </div>
  )
}
