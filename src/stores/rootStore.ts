import { ChatStore } from './chatStore'
import { UiStore } from './uiStore'
import { VoiceStore } from './voiceStore'

export class RootStore {
  readonly chatStore: ChatStore
  readonly voiceStore: VoiceStore
  readonly uiStore: UiStore

  constructor() {
    this.chatStore = new ChatStore()
    this.voiceStore = new VoiceStore(this.chatStore)
    this.uiStore = new UiStore()

    this.chatStore.setComposerClearedHandler(() => {
      this.voiceStore.stopMic()
    })
    this.chatStore.initPersistence()
  }
}

export const rootStore = new RootStore()
