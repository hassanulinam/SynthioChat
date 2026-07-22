import './index.css'

interface SendButtonProps {
  disabled: boolean
}

export function SendButton({ disabled }: SendButtonProps) {
  const renderIcon = () => (
    <span
      className="icon-placeholder icon-placeholder--send"
      data-icon="send"
      aria-hidden="true"
    />
  )

  return (
    <button
      type="submit"
      className="composer-send-btn"
      disabled={disabled}
      aria-label="Send message"
    >
      {renderIcon()}
      {/* icon-placeholder: send */}
    </button>
  )
}
