import { makeAutoObservable, runInAction } from 'mobx'

import { AUDIO_CHAT_SILENCE_MS } from '../constants/voice'
import { cancelSpeech, speakText } from '../services/tts.service'
import {
  isSpeechRecognitionSupported,
  VoiceService,
  VoiceServiceError,
} from '../services/voice.service'
import type { AudioChatPhase, VoiceMode, VoiceStatus } from '../types/voice.types'
import type { ChatStore } from './chatStore'

export class VoiceStore {
  mode: VoiceMode = 'idle'
  status: VoiceStatus = 'disconnected'
  error: string | null = null
  interimText = ''
  audioChatPhase: AudioChatPhase = 'listening'
  /** Shown in the audio chat overlay while the user is speaking. */
  audioChatDraft = ''

  private readonly chatStore: ChatStore
  private readonly voiceService = new VoiceService()
  private micDraftBase = ''
  private audioChatPending = ''
  private silenceTimer: ReturnType<typeof setTimeout> | null = null
  private audioChatRunning = false

  constructor(chatStore: ChatStore) {
    this.chatStore = chatStore
    makeAutoObservable(this, {}, { autoBind: true })
  }

  get isMicActive(): boolean {
    return this.mode === 'mic'
  }

  get isAudioChatActive(): boolean {
    return this.mode === 'audioChat'
  }

  get isVoiceBusy(): boolean {
    return this.mode !== 'idle'
  }

  clearError(): void {
    this.error = null
  }

  toggleMic(): void {
    if (this.mode === 'audioChat') {
      return
    }

    if (this.mode === 'mic') {
      this.stopMic()
      return
    }

    this.startMic()
  }

  startMic(): void {
    if (!this.ensureSpeechSupported()) {
      return
    }

    this.stopAllVoiceActivity()
    this.mode = 'mic'
    this.micDraftBase = this.chatStore.composerText.trim()
    this.error = null
    this.interimText = ''
    this.status = 'connecting'

    this.voiceService.startCall(this.createMicHandlers())
  }

  stopMic(): void {
    if (this.mode !== 'mic') {
      return
    }

    this.voiceService.endCall()
    this.mode = 'idle'
    this.status = 'disconnected'
    this.interimText = ''

    // Keep whatever is currently in the composer (user may have edited it).
    this.micDraftBase = this.chatStore.composerText.trim()
  }

  /** Call when a message is sent so live transcript does not refill the input. */
  resetMicDraftAfterSend(): void {
    this.micDraftBase = ''
    this.interimText = ''

    if (this.mode !== 'mic') {
      return
    }

    // Restart recognition so in-flight interim results cannot refill the composer.
    this.voiceService.endCall()
    this.status = 'connecting'
    this.voiceService.startCall(this.createMicHandlers())
  }

  /** Keep mic draft in sync when the user edits the composer while listening. */
  syncMicDraftFromComposer(text: string): void {
    if (this.mode !== 'mic') {
      return
    }
    this.micDraftBase = text
    this.interimText = ''
  }

  startAudioChat(): void {
    if (!this.ensureSpeechSupported()) {
      return
    }

    this.stopAllVoiceActivity()
    this.chatStore.createChat()
    this.mode = 'audioChat'
    this.audioChatPhase = 'listening'
    this.audioChatDraft = ''
    this.audioChatPending = ''
    this.error = null
    this.interimText = ''
    this.status = 'connecting'
    this.audioChatRunning = true

    this.voiceService.startCall(this.createAudioChatHandlers())
  }

  stopAudioChat(): void {
    this.audioChatRunning = false
    this.clearSilenceTimer()
    cancelSpeech()
    this.voiceService.endCall()
    this.mode = 'idle'
    this.status = 'disconnected'
    this.audioChatPhase = 'listening'
    this.audioChatDraft = ''
    this.audioChatPending = ''
    this.interimText = ''
  }

  retryMic(): void {
    this.clearError()
    if (this.mode === 'mic') {
      this.stopMic()
    }
    this.startMic()
  }

  private ensureSpeechSupported(): boolean {
    if (isSpeechRecognitionSupported()) {
      return true
    }

    this.error =
      'Speech recognition is not supported in this browser. Try Chrome or Edge.'
    this.status = 'disconnected'
    return false
  }

  private stopAllVoiceActivity(): void {
    this.clearSilenceTimer()
    cancelSpeech()
    this.voiceService.endCall()
    this.mode = 'idle'
    this.status = 'disconnected'
    this.interimText = ''
    this.micDraftBase = ''
    this.audioChatPending = ''
    this.audioChatDraft = ''
    this.audioChatRunning = false
  }

  private createMicHandlers() {
    return {
      onStatus: (status: VoiceStatus) => {
        runInAction(() => {
          this.status = status
          if (status === 'disconnected' && this.mode === 'mic') {
            this.mode = 'idle'
            this.interimText = ''
          }
        })
      },
      onInterim: (text: string) => {
        runInAction(() => {
          this.interimText = text
          this.updateMicComposer(text)
        })
      },
      onFinal: (text: string) => {
        runInAction(() => {
          this.interimText = ''
          if (!text.trim()) {
            return
          }
          this.micDraftBase = [this.micDraftBase, text.trim()]
            .filter(Boolean)
            .join(' ')
          this.chatStore.setComposerText(this.micDraftBase)
        })
      },
      onError: (err: VoiceServiceError) => {
        runInAction(() => {
          this.handleVoiceError(err)
          if (this.mode === 'mic') {
            this.mode = 'idle'
          }
        })
      },
    }
  }

  private createAudioChatHandlers() {
    return {
      onStatus: (status: VoiceStatus) => {
        runInAction(() => {
          if (this.mode !== 'audioChat') {
            return
          }
          if (
            this.audioChatPhase === 'processing' ||
            this.audioChatPhase === 'speaking'
          ) {
            return
          }
          this.status = status
          if (status === 'listening') {
            this.audioChatPhase = 'listening'
          }
        })
      },
      onInterim: (text: string) => {
        if (this.mode !== 'audioChat' || this.audioChatPhase !== 'listening') {
          return
        }
        runInAction(() => {
          this.interimText = text
          this.audioChatDraft = [this.audioChatPending, text.trim()]
            .filter(Boolean)
            .join(' ')
          this.scheduleSilenceSubmit()
        })
      },
      onFinal: (text: string) => {
        if (this.mode !== 'audioChat' || this.audioChatPhase !== 'listening') {
          return
        }
        runInAction(() => {
          this.interimText = ''
          if (!text.trim()) {
            return
          }
          this.audioChatPending = [this.audioChatPending, text.trim()]
            .filter(Boolean)
            .join(' ')
          this.audioChatDraft = this.audioChatPending
          this.scheduleSilenceSubmit()
        })
      },
      onError: (err: VoiceServiceError) => {
        runInAction(() => {
          if (this.mode !== 'audioChat') {
            return
          }
          this.handleVoiceError(err)
          this.audioChatRunning = false
          this.mode = 'idle'
        })
      },
    }
  }

  private updateMicComposer(interim: string): void {
    const draft = [this.micDraftBase, interim.trim()].filter(Boolean).join(' ')
    this.chatStore.setComposerText(draft)
  }

  private scheduleSilenceSubmit(): void {
    this.clearSilenceTimer()
    this.silenceTimer = setTimeout(() => {
      void this.submitAudioChatUtterance()
    }, AUDIO_CHAT_SILENCE_MS)
  }

  private clearSilenceTimer(): void {
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer)
      this.silenceTimer = null
    }
  }

  private async submitAudioChatUtterance(): Promise<void> {
    if (this.mode !== 'audioChat' || this.audioChatPhase !== 'listening') {
      return
    }

    const utterance = this.audioChatPending.trim()
    if (!utterance) {
      return
    }

    this.audioChatPending = ''
    this.audioChatDraft = ''
    this.interimText = ''
    this.audioChatPhase = 'processing'
    this.status = 'processing'

    // Pause recognition while waiting for and reading the response.
    this.voiceService.endCall()

    const assistantMessage = await this.chatStore.sendMessage(utterance)

    if (!this.audioChatRunning || this.mode !== 'audioChat') {
      return
    }

    if (!assistantMessage) {
      runInAction(() => {
        this.audioChatPhase = 'listening'
        this.status = 'connecting'
      })
      this.voiceService.startCall(this.createAudioChatHandlers())
      return
    }

    runInAction(() => {
      this.audioChatPhase = 'speaking'
      this.status = 'speaking'
    })

    try {
      await speakText(assistantMessage.content)
    } catch (err) {
      runInAction(() => {
        this.error =
          err instanceof Error ? err.message : 'Unable to read the response aloud.'
      })
    }

    if (!this.audioChatRunning || this.mode !== 'audioChat') {
      return
    }

    runInAction(() => {
      this.audioChatPhase = 'listening'
      this.status = 'connecting'
      this.interimText = ''
      this.audioChatDraft = ''
    })

    this.voiceService.startCall(this.createAudioChatHandlers())
  }

  private handleVoiceError(err: VoiceServiceError): void {
    this.error =
      err instanceof VoiceServiceError
        ? err.message
        : 'Voice recognition failed. Please try again.'
    this.status = 'disconnected'
    this.interimText = ''
    this.voiceService.endCall()
  }
}
