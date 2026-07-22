import { Button } from '../common/Button'

interface SendButtonProps {
  disabled: boolean
}

export function SendButton({ disabled }: SendButtonProps) {
  return (
    <Button type="submit" disabled={disabled} aria-label="Send message">
      Send
    </Button>
  )
}
