import { observer } from 'mobx-react'

import { useUiStore } from '../../stores/useStores'
import type { ToastItem } from '../../stores/uiStore'

import './ToastHost.css'

export const ToastHost = observer(function ToastHost() {
  const uiStore = useUiStore()

  if (uiStore.toasts.length === 0) {
    return null
  }

  const renderToast = (toast: ToastItem) => (
    <div key={toast.id} className="toast-item" role="status">
      <span>{toast.message}</span>
      <button
        type="button"
        className="toast-dismiss"
        aria-label="Dismiss notification"
        onClick={() => uiStore.dismissToast(toast.id)}
      >
        ×
      </button>
    </div>
  )

  return (
    <div className="toast-host" aria-live="polite">
      {uiStore.toasts.map(renderToast)}
    </div>
  )
})
