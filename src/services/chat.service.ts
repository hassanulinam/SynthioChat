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
  'That is a great question. Here is a **helpful** response based on what you shared.',
  'I understand. Let me walk through this:\n\n1. Clarify the goal\n2. Break it into steps\n3. Ship a small version first',
  'Thanks for the details. Next I would try:\n\n- Keep the prompt short\n- Add one concrete example\n- Iterate from there',
  'Absolutely. A concise tip: prefer *clear* wording over clever wording. You can also use `Shift+Enter` for a new line.',
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
