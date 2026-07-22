import { observer } from 'mobx-react'

import { useUiStore } from '../../stores/useStores'

import './ToastHost.css'

export const ToastHost = observer(function ToastHost() {
  const uiStore = useUiStore()

  if (uiStore.toasts.length === 0) {
    return null
  }

  return (
    <div className="toast-host" aria-live="polite">
      {uiStore.toasts.map((toast) => (
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
      ))}
    </div>
  )
})
