export type VoiceMode = 'idle' | 'mic' | 'audioChat'

export type VoiceStatus =
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'listening'
  | 'speaking'
  | 'processing'

export type AudioChatPhase = 'listening' | 'processing' | 'speaking'
