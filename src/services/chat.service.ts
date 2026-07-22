import { createId } from '../utils/id'
import type { Message } from '../types/chat.types'

const CHAT_DELAY_MS = 1000

export class ChatServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ChatServiceError'
  }
}

export interface SendMessageOptions {
  /** When true, the mock request fails after the delay. */
  simulateFailure?: boolean
}

const MOCK_REPLIES = [
  'That is a great question. Here is a helpful response based on what you shared.',
  'I understand. Let me walk through this step by step.',
  'Thanks for the details. Here is what I would suggest next.',
  'Absolutely. Here is a concise answer to keep things moving.',
]

function pickReply(userContent: string): string {
  const index = userContent.length % MOCK_REPLIES.length
  return MOCK_REPLIES[index] ?? MOCK_REPLIES[0]
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export async function sendMessage(
  _sessionId: string,
  content: string,
  options: SendMessageOptions = {},
): Promise<Message> {
  await delay(CHAT_DELAY_MS)

  if (options.simulateFailure) {
    throw new ChatServiceError('Failed to get a response. Please try again.')
  }

  return {
    id: createId(),
    role: 'assistant',
    content: pickReply(content),
    createdAt: new Date(),
  }
}
