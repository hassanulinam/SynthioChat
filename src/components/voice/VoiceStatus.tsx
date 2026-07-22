import type { VoiceStatus as VoiceStatusType } from '../../types/voice.types'

import './VoiceStatus.css'

interface VoiceStatusProps {
  status: VoiceStatusType
}

function getStatusLabel(status: VoiceStatusType): string {
  switch (status) {
    case 'connecting':
      return 'Connecting...'
    case 'connected':
      return 'Connected'
    case 'listening':
      return 'Listening...'
    case 'speaking':
      // Kept for type completeness; unused without TTS.
      return 'Listening...'
    case 'disconnected':
    default:
      return 'Disconnected'
  }
}

export function VoiceStatus({ status }: VoiceStatusProps) {
  return (
    <p className={`voice-status voice-status--${status}`} aria-live="polite">
      <span
        className="icon-placeholder"
        data-icon="voice-status"
        aria-hidden="true"
      />
      {/* icon-placeholder: voice-status */}
      <span>{getStatusLabel(status)}</span>
    </p>
  )
}
