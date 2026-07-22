interface SendButtonProps {
  disabled: boolean
}

export function SendButton({ disabled }: SendButtonProps) {
  return (
    <button
      type="submit"
      className="composer-send-btn"
      disabled={disabled}
      aria-label="Send message"
    >
      <span
        className="icon-placeholder icon-placeholder--send"
        data-icon="send"
        aria-hidden="true"
      />
      {/* icon-placeholder: send */}
    </button>
  )
}
