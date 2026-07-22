import { observer } from 'mobx-react'

import { ErrorBanner } from '../common/ErrorBanner'
import { useVoiceStore } from '../../stores/useStores'

import { CallControls } from './CallControls'
import { Transcript } from './Transcript'
import { VoiceStatus } from './VoiceStatus'
import './VoicePanel.css'

export const VoicePanel = observer(function VoicePanel() {
  const voiceStore = useVoiceStore()

  const renderError = () => {
    if (!voiceStore.error) {
      return null
    }

    return (
      <ErrorBanner
        message={voiceStore.error}
        onRetry={() => voiceStore.retryConnection()}
        onDismiss={() => voiceStore.clearError()}
      />
    )
  }

  return (
    <aside className="voice-panel" aria-label="Voice panel">
      <div className="voice-panel-header">
        <h2 className="voice-panel-title">Voice</h2>
        <VoiceStatus status={voiceStore.status} />
      </div>
      {renderError()}
      <Transcript />
      <div className="voice-panel-footer">
        <CallControls />
      </div>
    </aside>
  )
})
