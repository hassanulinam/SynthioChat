import { toDate } from './date'
import type { ChatSession, Message } from '../types/chat.types'

function reviveMessage(raw: Message): Message {
  return {
    ...raw,
    createdAt: toDate(raw.createdAt),
  }
}

function reviveSession(raw: ChatSession): ChatSession {
  return {
    ...raw,
    createdAt: toDate(raw.createdAt),
    updatedAt: toDate(raw.updatedAt),
    messages: Array.isArray(raw.messages) ? raw.messages.map(reviveMessage) : [],
  }
}

export function readStorage<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) {
      return null
    }
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function writeStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore quota / private-mode failures; app stays usable in-memory.
  }
}

export function readChatSessions(key: string): ChatSession[] | null {
  const data = readStorage<ChatSession[]>(key)
  if (!data || !Array.isArray(data)) {
    return null
  }

  try {
    return data.map(reviveSession)
  } catch {
    return null
  }
}
