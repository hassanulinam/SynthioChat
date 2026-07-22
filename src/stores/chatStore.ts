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

function sessionHasActivity(session: ChatSession): boolean {
  return session.messages.length > 0
}

function matchesSearch(session: ChatSession, query: string): boolean {
  const normalized = query.trim().toLowerCase()
  if (!normalized) {
    return true
  }

  if (session.title.toLowerCase().includes(normalized)) {
    return true
  }

  return session.messages.some((message) =>
    message.content.toLowerCase().includes(normalized),
  )
}

export class ChatStore {
  sessions: ChatSession[] = []
  activeSessionId: string | null = null
  isLoading = false
  error: string | null = null
  composerText = ''
  searchQuery = ''
  private lastFailedContent: string | null = null
  private persistenceEnabled = false
  private onComposerCleared: (() => void) | null = null

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setComposerClearedHandler(handler: () => void): void {
    this.onComposerCleared = handler
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

  get filteredSessions(): ChatSession[] {
    return this.sessions.filter((session) => matchesSearch(session, this.searchQuery))
  }

  get pinnedSessions(): ChatSession[] {
    return this.filteredSessions.filter((session) => session.isPinned)
  }

  get unpinnedSessions(): ChatSession[] {
    return this.filteredSessions.filter((session) => !session.isPinned)
  }

  get hasSearchResults(): boolean {
    return this.filteredSessions.length > 0
  }

  initPersistence(): void {
    this.hydrateFromStorage()
    this.persistenceEnabled = true
  }

  setComposerText(text: string): void {
    this.composerText = text
  }

  setSearchQuery(query: string): void {
    this.searchQuery = query
  }

  clearSearch(): void {
    this.searchQuery = ''
  }

  createChat(): void {
    this.pruneEmptySessions()

    const now = new Date()
    const session: ChatSession = {
      id: createId(),
      title: 'New Chat',
      createdAt: now,
      updatedAt: now,
      messages: [],
      isPinned: false,
    }

    this.sessions = [session, ...this.sessions]
    this.activeSessionId = session.id
    this.error = null
    this.lastFailedContent = null
    this.composerText = ''
    // Empty chats are in-memory only until the first message.
  }

  switchChat(sessionId: string): void {
    if (!this.sessions.some((session) => session.id === sessionId)) {
      return
    }

    this.pruneEmptySessions(sessionId)
    this.activeSessionId = sessionId
    this.error = null
    this.lastFailedContent = null
    this.composerText = ''
    this.persist()
  }

  clearError(): void {
    this.error = null
  }

  renameChat(sessionId: string, title: string): boolean {
    const session = this.sessions.find((item) => item.id === sessionId)
    if (!session) {
      return false
    }

    const nextTitle = title.trim()
    if (!nextTitle) {
      return false
    }

    session.title = truncateTitle(nextTitle, 60)
    session.updatedAt = new Date()
    this.persist()
    return true
  }

  deleteChat(sessionId: string): boolean {
    const index = this.sessions.findIndex((item) => item.id === sessionId)
    if (index === -1) {
      return false
    }

    this.sessions = this.sessions.filter((item) => item.id !== sessionId)

    if (this.activeSessionId === sessionId) {
      this.activeSessionId = this.sessions[0]?.id ?? null
      this.composerText = ''
      this.error = null
      this.lastFailedContent = null
    }

    this.persist()
    return true
  }

  togglePinChat(sessionId: string): boolean {
    const session = this.sessions.find((item) => item.id === sessionId)
    if (!session) {
      return false
    }

    session.isPinned = !session.isPinned
    session.updatedAt = new Date()
    this.persist()
    return true
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
    this.onComposerCleared?.()

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

  private pruneEmptySessions(keepSessionId?: string | null): void {
    const keepId = keepSessionId ?? null
    this.sessions = this.sessions.filter(
      (session) => sessionHasActivity(session) || session.id === keepId,
    )
  }

  private hydrateFromStorage(): void {
    const sessions = readChatSessions(CHAT_SESSIONS_KEY)
    if (!sessions) {
      return
    }

    // Drop any empty chats that may have been saved by older builds.
    this.sessions = sessions.filter(sessionHasActivity)
    const activeSessionId = readStorage<string>(ACTIVE_SESSION_KEY)
    if (
      activeSessionId &&
      this.sessions.some((session) => session.id === activeSessionId)
    ) {
      this.activeSessionId = activeSessionId
    } else {
      this.activeSessionId = this.sessions[0]?.id ?? null
    }
    this.composerText = ''
  }

  private persist(): void {
    if (!this.persistenceEnabled) {
      return
    }

    const sessionsToSave = this.sessions.filter(sessionHasActivity)
    writeStorage(CHAT_SESSIONS_KEY, sessionsToSave)

    const activeStillSaved = sessionsToSave.some(
      (session) => session.id === this.activeSessionId,
    )
    writeStorage(
      ACTIVE_SESSION_KEY,
      activeStillSaved ? this.activeSessionId : (sessionsToSave[0]?.id ?? null),
    )
  }
}
