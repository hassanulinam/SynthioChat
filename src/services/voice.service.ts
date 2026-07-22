import type { VoiceStatus } from '../types/voice.types'

export class VoiceServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'VoiceServiceError'
  }
}

export interface VoiceCallHandlers {
  onStatus: (status: VoiceStatus) => void
  onInterim: (text: string) => void
  onFinal: (text: string) => void
  onError: (error: VoiceServiceError) => void
}

interface SpeechRecognitionResultLike {
  readonly isFinal: boolean
  readonly 0: { transcript: string }
}

interface SpeechRecognitionEventLike {
  readonly resultIndex: number
  readonly results: ArrayLike<SpeechRecognitionResultLike> & {
    length: number
  }
}

interface SpeechRecognitionErrorEventLike {
  readonly error: string
  readonly message?: string
}

interface SpeechRecognitionLike {
  continuous: boolean
  interimResults: boolean
  lang: string
  onstart: ((this: SpeechRecognitionLike, ev: Event) => void) | null
  onresult:
    | ((this: SpeechRecognitionLike, ev: SpeechRecognitionEventLike) => void)
    | null
  onerror:
    | ((this: SpeechRecognitionLike, ev: SpeechRecognitionErrorEventLike) => void)
    | null
  onend: ((this: SpeechRecognitionLike, ev: Event) => void) | null
  start(): void
  stop(): void
  abort(): void
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike

function getSpeechRecognitionConstructor(): SpeechRecognitionConstructor | null {
  const win = window as Window & {
    SpeechRecognition?: SpeechRecognitionConstructor
    webkitSpeechRecognition?: SpeechRecognitionConstructor
  }

  return win.SpeechRecognition ?? win.webkitSpeechRecognition ?? null
}

export function isSpeechRecognitionSupported(): boolean {
  return getSpeechRecognitionConstructor() !== null
}

function mapRecognitionError(errorCode: string): VoiceServiceError {
  switch (errorCode) {
    case 'not-allowed':
    case 'service-not-allowed':
      return new VoiceServiceError(
        'Microphone access was denied. Allow the mic and try again.',
      )
    case 'audio-capture':
      return new VoiceServiceError(
        'No microphone was found. Check your audio input and try again.',
      )
    case 'network':
      return new VoiceServiceError(
        'Speech recognition network error. Check your connection and try again.',
      )
    case 'aborted':
      return new VoiceServiceError('Speech recognition was aborted.')
    default:
      return new VoiceServiceError(
        'Speech recognition failed. Please try again.',
      )
  }
}

export class VoiceService {
  private recognition: SpeechRecognitionLike | null = null
  private active = false
  private intentionalStop = false

  startCall(handlers: VoiceCallHandlers): void {
    this.endCall()

    const Recognition = getSpeechRecognitionConstructor()
    if (!Recognition) {
      handlers.onError(
        new VoiceServiceError(
          'Speech recognition is not supported in this browser. Try Chrome or Edge.',
        ),
      )
      handlers.onStatus('disconnected')
      return
    }

    this.active = true
    this.intentionalStop = false
    handlers.onStatus('connecting')

    const recognition = new Recognition()
    this.recognition = recognition
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      if (!this.active) {
        return
      }
      handlers.onStatus('connected')
      handlers.onStatus('listening')
    }

    recognition.onresult = (event) => {
      if (!this.active) {
        return
      }

      let interim = ''
      let finalText = ''

      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const result = event.results[i]
        if (!result) {
          continue
        }
        const transcript = result[0]?.transcript ?? ''
        if (result.isFinal) {
          finalText += transcript
        } else {
          interim += transcript
        }
      }

      if (interim) {
        handlers.onInterim(interim.trim())
      }

      const trimmedFinal = finalText.trim()
      if (trimmedFinal) {
        handlers.onFinal(trimmedFinal)
      }
    }

    recognition.onerror = (event) => {
      if (!this.active) {
        return
      }

      // Browser fires "aborted" / "no-speech" in benign cases; ignore aborted on intentional stop.
      if (event.error === 'aborted' && this.intentionalStop) {
        return
      }

      if (event.error === 'no-speech') {
        return
      }

      this.active = false
      handlers.onError(mapRecognitionError(event.error))
      handlers.onStatus('disconnected')
    }

    recognition.onend = () => {
      if (!this.active || this.intentionalStop) {
        this.recognition = null
        if (this.intentionalStop) {
          handlers.onStatus('disconnected')
        }
        return
      }

      // Some browsers end continuous sessions; restart while still active.
      try {
        recognition.start()
      } catch {
        this.active = false
        this.recognition = null
        handlers.onStatus('disconnected')
      }
    }

    try {
      recognition.start()
    } catch {
      this.active = false
      this.recognition = null
      handlers.onError(
        new VoiceServiceError('Unable to start speech recognition. Please try again.'),
      )
      handlers.onStatus('disconnected')
    }
  }

  endCall(): void {
    this.intentionalStop = true
    this.active = false

    const recognition = this.recognition
    this.recognition = null

    if (!recognition) {
      return
    }

    recognition.onstart = null
    recognition.onresult = null
    recognition.onerror = null
    recognition.onend = null

    try {
      recognition.stop()
    } catch {
      try {
        recognition.abort()
      } catch {
        // Already stopped.
      }
    }
  }
}
