export class TtsServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'TtsServiceError'
  }
}

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

export function cancelSpeech(): void {
  if (!isSpeechSynthesisSupported()) {
    return
  }
  window.speechSynthesis.cancel()
}

export function speakText(text: string): Promise<void> {
  if (!isSpeechSynthesisSupported()) {
    return Promise.reject(
      new TtsServiceError('Text-to-speech is not supported in this browser.'),
    )
  }

  const trimmed = text.trim()
  if (!trimmed) {
    return Promise.resolve()
  }

  cancelSpeech()

  return new Promise((resolve, reject) => {
    const utterance = new SpeechSynthesisUtterance(trimmed)
    utterance.lang = 'en-US'
    utterance.rate = 1

    utterance.onend = () => resolve()
    utterance.onerror = () => {
      reject(new TtsServiceError('Unable to read the response aloud.'))
    }

    window.speechSynthesis.speak(utterance)
  })
}
