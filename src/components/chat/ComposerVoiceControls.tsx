import { observer } from 'mobx-react'

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
        <span
          className="icon-placeholder icon-placeholder--mic"
          data-icon="mic"
          aria-hidden="true"
        />
        {/* icon-placeholder: mic */}
      </button>

      <button
        type="button"
        className="composer-voice-btn composer-voice-btn--audio-chat"
        aria-label="Start audio chat"
        disabled={audioChatDisabled}
        onClick={() => voiceStore.startAudioChat()}
      >
        <span
          className="icon-placeholder icon-placeholder--audio"
          data-icon="audio-chat"
          aria-hidden="true"
        />
        {/* icon-placeholder: audio-chat */}
      </button>
    </div>
  )
})
