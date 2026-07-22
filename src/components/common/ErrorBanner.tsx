import { Button } from './Button'
import './ErrorBanner.css'

interface ErrorBannerProps {
  message: string
  onRetry?: () => void
  onDismiss?: () => void
}

export function ErrorBanner({ message, onRetry, onDismiss }: ErrorBannerProps) {
  return (
    <div className="error-banner" role="alert">
      <p className="error-banner-message">{message}</p>
      <div className="error-banner-actions">
        {onRetry ? (
          <Button type="button" variant="danger" onClick={onRetry}>
            Retry
          </Button>
        ) : null}
        {onDismiss ? (
          <Button type="button" variant="secondary" onClick={onDismiss}>
            Dismiss
          </Button>
        ) : null}
      </div>
    </div>
  )
}
