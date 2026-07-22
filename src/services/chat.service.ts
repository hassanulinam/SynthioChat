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
  `Here is a focused answer with some **key takeaways**:

1. Start with the smallest useful slice
2. Validate assumptions early
3. Keep the feedback loop short

> Tip: Prefer *clarity* over clever wording when you draft the next prompt.

You can also use \`Shift+Enter\` for a new line in the composer.`,

  `Absolutely — here is a practical pattern you can reuse:

\`\`\`ts
async function sendPrompt(prompt: string) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  })

  if (!response.ok) {
    throw new Error('Request failed')
  }

  return response.json()
}
\`\`\`

**Why this works**

- Keeps request shaping in one place
- Surfaces failures early
- Stays easy to test

> “Make it work, make it right, make it fast.” — in that order.`,

  `Good question. Here is a compact checklist:

### Before you ship
- [ ] Confirm the user goal in one sentence
- [ ] Add one concrete example
- [ ] Cover the unhappy path

### Quick reference

| Step | Action | Outcome |
| --- | --- | --- |
| 1 | Clarify intent | Less rework |
| 2 | Prototype | Faster learning |
| 3 | Iterate | Better quality |

If something is still unclear, ask with **one** constraint at a time.`,

  `Here is a short plan with markdown you can skim quickly:

#### Approach
1. **Define** the success criteria
2. **Draft** a thin vertical slice
3. **Measure** with a real user path

\`\`\`bash
npm run build
npm run preview
\`\`\`

> Note: Keep the first version intentionally small. Expansion is cheaper than recovery.

Need more detail on any step? Ask and I will expand that section only.`,
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
