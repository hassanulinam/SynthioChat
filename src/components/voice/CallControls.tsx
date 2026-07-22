import { observer } from 'mobx-react'

import { Button } from '../common/Button'
import { useVoiceStore } from '../../stores/useStores'

import './CallControls.css'

export const CallControls = observer(function CallControls() {
  const voiceStore = useVoiceStore()
  const isActive = voiceStore.isActive

  return (
    <div className="call-controls">
      {isActive ? (
        <Button
          type="button"
          variant="danger"
          onClick={() => voiceStore.endCall()}
          aria-label="End call"
        >
          End Call
        </Button>
      ) : (
        <Button
          type="button"
          onClick={() => voiceStore.startCall()}
          aria-label="Start call"
        >
          Start Call
        </Button>
      )}
    </div>
  )
})
