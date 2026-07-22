import './index.css'

interface SpinnerProps {
  label?: string
  size?: 'sm' | 'md'
}

export function Spinner({ label = 'Loading', size = 'md' }: SpinnerProps) {
  return (
    <span
      className={`ui-spinner ui-spinner--${size}`}
      role="status"
      aria-label={label}
    />
  )
}
