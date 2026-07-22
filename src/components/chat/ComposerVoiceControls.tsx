import { observer } from 'mobx-react'

import AudioWaveIcon from '../../Icons/AudioWaveIcon'
import MicIcon from '../../Icons/MicIcon'
import { useChatStore, useVoiceStore } from '../../stores/useStores'

import './ComposerVoiceControls.css'

export const ComposerVoiceControls = observer(function ComposerVoiceControls() {
  const voiceStore = useVoiceStore()
  const chatStore = useChatStore()

  const micDisabled = chatStore.isLoading || voiceStore.isAudioChatActive
  const audioChatDisabled = chatStore.isLoading || voiceStore.isMicActive

  return (
    <div className="composer-voice-controls">
      <button
        type="button"
        className={`composer-voice-btn composer-voice-btn--mic${
          voiceStore.isMicActive ? ' composer-voice-btn--mic-active' : ''
        }`}
        aria-label={voiceStore.isMicActive ? 'Stop microphone' : 'Start microphone'}
        aria-pressed={voiceStore.isMicActive}
        disabled={micDisabled}
        onClick={() => voiceStore.toggleMic()}
      >
        {voiceStore.isMicActive ? (
          <span className="composer-voice-btn-pulse" aria-hidden="true" />
        ) : null}
        <MicIcon fill="currentColor" size={18} />
      </button>

      <button
        type="button"
        className="composer-voice-btn composer-voice-btn--audio-chat"
        aria-label="Start audio chat"
        disabled={audioChatDisabled}
        onClick={() => voiceStore.startAudioChat()}
      >
        <AudioWaveIcon fill="currentColor" size={18} />
      </button>
    </div>
  )
})
