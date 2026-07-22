import { makeAutoObservable, runInAction } from 'mobx'

import { ACTIVE_SESSION_KEY, CHAT_SESSIONS_KEY } from '../constants/storageKeys'
import {
  ChatServiceError,
  sendMessage as sendChatMessage,
} from '../services/chat.service'
import type { ChatSession, Message } from '../types/chat.types'
import { truncateTitle } from '../utils/date'
import { createId } from '../utils/id'
import { readChatSessions, readStorage, writeStorage } from '../utils/storage'

/** Include this token in a message to exercise the chat error banner during demos. */
function shouldSimulateChatFailure(content: string): boolean {
  return content.toLowerCase().includes('force error')
}

export class ChatStore {
  sessions: ChatSession[] = []
  activeSessionId: string | null = null
  isLoading = false
  error: string | null = null
  composerText = ''
  private lastFailedContent: string | null = null
  private persistenceEnabled = false

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  get activeSession(): ChatSession | null {
    if (!this.activeSessionId) {
      return null
    }
    return this.sessions.find((session) => session.id === this.activeSessionId) ?? null
  }

  get activeMessages(): Message[] {
    return this.activeSession?.messages ?? []
  }

  get hasSessions(): boolean {
    return this.sessions.length > 0
  }

  initPersistence(): void {
    this.hydrateFromStorage()
    this.persistenceEnabled = true
  }

  setComposerText(text: string): void {
    this.composerText = text
  }

  createChat(): void {
    const now = new Date()
    const session: ChatSession = {
      id: createId(),
      title: 'New Chat',
      createdAt: now,
      updatedAt: now,
      messages: [],
    }

    this.sessions = [session, ...this.sessions]
    this.activeSessionId = session.id
    this.error = null
    this.lastFailedContent = null
    this.composerText = ''
    this.persist()
  }

  switchChat(sessionId: string): void {
    if (!this.sessions.some((session) => session.id === sessionId)) {
      return
    }

    this.activeSessionId = sessionId
    this.error = null
    this.lastFailedContent = null
    this.composerText = ''
    this.persist()
  }

  clearError(): void {
    this.error = null
  }

  receiveMessage(message: Message): void {
    const session = this.activeSession
    if (!session) {
      return
    }

    session.messages.push(message)
    session.updatedAt = new Date()
    this.persist()
  }

  async sendMessage(content?: string): Promise<Message | null> {
    const trimmed = (content ?? this.composerText).trim()
    if (!trimmed || this.isLoading) {
      return null
    }

    if (!this.activeSession) {
      this.createChat()
    }

    const session = this.activeSession
    if (!session) {
      return null
    }

    const userMessage: Message = {
      id: createId(),
      role: 'user',
      content: trimmed,
      createdAt: new Date(),
    }

    session.messages.push(userMessage)
    session.updatedAt = new Date()

    if (session.title === 'New Chat') {
      session.title = truncateTitle(trimmed)
    }

    this.composerText = ''
    this.isLoading = true
    this.error = null
    this.lastFailedContent = null
    this.persist()

    try {
      const assistantMessage = await sendChatMessage(session.id, trimmed, {
        simulateFailure: shouldSimulateChatFailure(trimmed),
      })
      runInAction(() => {
        this.receiveMessage(assistantMessage)
        this.isLoading = false
      })
      return assistantMessage
    } catch (err) {
      runInAction(() => {
        this.isLoading = false
        this.lastFailedContent = trimmed
        this.error =
          err instanceof ChatServiceError
            ? err.message
            : 'Something went wrong. Please try again.'
      })
      return null
    }
  }

  async retryLastMessage(): Promise<void> {
    if (!this.lastFailedContent || this.isLoading) {
      return
    }

    const content = this.lastFailedContent
    this.error = null
    this.lastFailedContent = null
    this.isLoading = true

    const session = this.activeSession
    if (!session) {
      this.isLoading = false
      return
    }

    try {
      const assistantMessage = await sendChatMessage(session.id, content)
      runInAction(() => {
        this.receiveMessage(assistantMessage)
        this.isLoading = false
      })
    } catch (err) {
      runInAction(() => {
        this.isLoading = false
        this.lastFailedContent = content
        this.error =
          err instanceof ChatServiceError
            ? err.message
            : 'Something went wrong. Please try again.'
      })
    }
  }

  private hydrateFromStorage(): void {
    const sessions = readChatSessions(CHAT_SESSIONS_KEY)
    if (!sessions) {
      return
    }

    const activeSessionId = readStorage<string>(ACTIVE_SESSION_KEY)
    this.sessions = sessions
    if (
      activeSessionId &&
      sessions.some((session) => session.id === activeSessionId)
    ) {
      this.activeSessionId = activeSessionId
    } else {
      this.activeSessionId = sessions[0]?.id ?? null
    }
    this.composerText = ''
  }

  private persist(): void {
    if (!this.persistenceEnabled) {
      return
    }

    writeStorage(CHAT_SESSIONS_KEY, this.sessions)
    writeStorage(ACTIVE_SESSION_KEY, this.activeSessionId)
  }
}
