import { makeAutoObservable, runInAction } from 'mobx'

import {
  isSpeechRecognitionSupported,
  VoiceService,
  VoiceServiceError,
} from '../services/voice.service'
import type { VoiceStatus } from '../types/voice.types'
import type { ChatStore } from './chatStore'

export class VoiceStore {
  status: VoiceStatus = 'disconnected'
  transcript: string[] = []
  interimText = ''
  error: string | null = null
  isActive = false

  private readonly chatStore: ChatStore
  private readonly voiceService = new VoiceService()

  constructor(chatStore: ChatStore) {
    this.chatStore = chatStore
    makeAutoObservable(this, {}, { autoBind: true })
  }

  clearError(): void {
    this.error = null
  }

  startCall(): void {
    if (this.isActive) {
      return
    }

    if (!isSpeechRecognitionSupported()) {
      this.error =
        'Speech recognition is not supported in this browser. Try Chrome or Edge.'
      this.status = 'disconnected'
      this.isActive = false
      return
    }

    this.error = null
    this.interimText = ''
    this.isActive = true
    this.status = 'connecting'

    this.voiceService.startCall({
      onStatus: (status) => {
        runInAction(() => {
          this.status = status
          if (status === 'disconnected') {
            this.isActive = false
            this.interimText = ''
          }
        })
      },
      onInterim: (text) => {
        runInAction(() => {
          this.interimText = text
          this.chatStore.setComposerText(text)
        })
      },
      onFinal: (text) => {
        runInAction(() => {
          this.interimText = ''
          if (!text.trim()) {
            return
          }
          this.transcript = [...this.transcript, text]
          if (!this.chatStore.isLoading) {
            void this.chatStore.sendMessage(text)
          }
        })
      },
      onError: (err) => {
        runInAction(() => {
          this.error =
            err instanceof VoiceServiceError
              ? err.message
              : 'Voice recognition failed. Please try again.'
          this.isActive = false
          this.status = 'disconnected'
          this.interimText = ''
        })
      },
    })
  }

  endCall(): void {
    this.voiceService.endCall()
    this.isActive = false
    this.status = 'disconnected'
    this.interimText = ''
  }

  retryConnection(): void {
    this.clearError()
    this.startCall()
  }
}
