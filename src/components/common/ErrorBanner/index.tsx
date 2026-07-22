import { Button } from '../Button'
import './index.css'

interface ErrorBannerProps {
  message: string
  onRetry?: () => void
  onDismiss?: () => void
}

export function ErrorBanner({ message, onRetry, onDismiss }: ErrorBannerProps) {
  const renderRetry = () => {
    if (!onRetry) {
      return null
    }

    return (
      <Button type="button" variant="danger" onClick={onRetry}>
        Retry
      </Button>
    )
  }

  const renderDismiss = () => {
    if (!onDismiss) {
      return null
    }

    return (
      <Button type="button" variant="secondary" onClick={onDismiss}>
        Dismiss
      </Button>
    )
  }

  const renderActions = () => (
    <div className="error-banner-actions">
      {renderRetry()}
      {renderDismiss()}
    </div>
  )

  return (
    <div className="error-banner" role="alert">
      <p className="error-banner-message">{message}</p>
      {renderActions()}
    </div>
  )
}
