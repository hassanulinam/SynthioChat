import { ChatStore } from './chatStore'
import { VoiceStore } from './voiceStore'

export class RootStore {
  readonly chatStore: ChatStore
  readonly voiceStore: VoiceStore

  constructor() {
    this.chatStore = new ChatStore()
    this.voiceStore = new VoiceStore(this.chatStore)
    this.chatStore.initPersistence()
  }
}

export const rootStore = new RootStore()
