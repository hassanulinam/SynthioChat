import { observer } from 'mobx-react'

import { EmptyState } from '../common/EmptyState'
import { useVoiceStore } from '../../stores/useStores'

import './Transcript.css'

export const Transcript = observer(function Transcript() {
  const voiceStore = useVoiceStore()
  const hasLines = voiceStore.transcript.length > 0 || Boolean(voiceStore.interimText)

  if (!hasLines && voiceStore.status === 'disconnected') {
    return (
      <div className="transcript transcript--empty">
        <EmptyState title="Press Start Call to begin." />
      </div>
    )
  }

  return (
    <div className="transcript" aria-live="polite" aria-label="Voice transcript">
      {voiceStore.transcript.map((line, index) => (
        <p key={`${index}-${line.slice(0, 12)}`} className="transcript-line">
          {line}
        </p>
      ))}
      {voiceStore.interimText ? (
        <p className="transcript-line transcript-line--interim">{voiceStore.interimText}</p>
      ) : null}
    </div>
  )
})
