import type { ReactNode } from 'react'

import './index.css'

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  const renderDescription = () => {
    if (!description) {
      return null
    }

    return <p className="empty-state-description">{description}</p>
  }

  const renderAction = () => {
    if (!action) {
      return null
    }

    return <div className="empty-state-action">{action}</div>
  }

  return (
    <div className="empty-state">
      <p className="empty-state-title">{title}</p>
      {renderDescription()}
      {renderAction()}
    </div>
  )
}
