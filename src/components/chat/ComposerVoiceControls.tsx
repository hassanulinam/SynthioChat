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

  const renderMicPulses = () => {
    if (!voiceStore.isMicActive) {
      return null
    }

    return (
      <>
        <span className="composer-voice-btn-pulse composer-voice-btn-pulse--1" aria-hidden="true" />
        <span className="composer-voice-btn-pulse composer-voice-btn-pulse--2" aria-hidden="true" />
        <span className="composer-voice-btn-pulse composer-voice-btn-pulse--3" aria-hidden="true" />
      </>
    )
  }

  const renderMicButton = () => (
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
      {renderMicPulses()}
      <MicIcon fill="currentColor" size={18} />
    </button>
  )

  const renderAudioChatButton = () => (
    <button
      type="button"
      className="composer-voice-btn composer-voice-btn--audio-chat"
      aria-label="Start audio chat"
      disabled={audioChatDisabled}
      onClick={() => voiceStore.startAudioChat()}
    >
      <AudioWaveIcon fill="currentColor" size={18} />
    </button>
  )

  return (
    <div className="composer-voice-controls">
      {renderMicButton()}
      {renderAudioChatButton()}
    </div>
  )
})
