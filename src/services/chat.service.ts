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
  `### HCP visit agenda (demo)

**Objectives**
1. Confirm the clinical need in this specialty setting
2. Align on **3 evidence-led messages**
3. Agree a clear follow-up

**Key messages**
- Mechanism and place in therapy (on-label framing only)
- Practical dosing / monitoring considerations
- What “good response” looks like in clinic

> **Caveat:** Demo content only — confirm against approved PI / ISI before any live engagement.

| Topic | HCP question | Suggested angle |
| --- | --- | --- |
| Efficacy | “Vs standard of care?” | Relative outcomes + study context |
| Safety | “What should I watch?” | Monitoring + escalation path |
| Access | “How do patients start?” | Support pathway overview |

**Next steps**
- Leave a one-page evidence summary
- Offer MSL follow-up for deep-dive questions`,

  `### Objection handling (science-first)

**Objection:** *“I already use the standard of care.”*

**Response frame**
1. Acknowledge current practice
2. Clarify the incremental clinical question
3. Share **conservative** evidence points
4. Invite questions without pressure

\`\`\`md
Acknowledge → Clarify need → Evidence → Invite dialogue
\`\`\`

**Talk track (short)**
> “Many specialists start there. The discussion is less about replacing care and more about which patients still have unmet need — happy to walk through the data with that lens.”

**Do / Don’t**
- **Do:** cite study populations and endpoints carefully
- **Don’t:** overstate superiority or off-label use

*Demo response — not approved promotional content.*`,

  `### Patient-support script (plain language)

Hi — thanks for speaking with us today. This call is to help you feel **confident and supported**, not to change your care plan.

**What we can cover**
- How to take your medicine as prescribed
- What side effects are more common
- When to contact your care team

> If something feels urgent or severe, contact your clinician or emergency services right away.

#### Simple titration reminder
1. Follow the schedule your clinician gave you
2. Use a daily reminder (phone alarm works well)
3. Write down questions before your next visit

**Supportive close**
“You’re not alone in this. If anything is confusing, call us back — we’ll walk through it together.”

*Educational demo only — not medical advice.*`,

  `### Medical Affairs FAQ draft (MLR-minded)

#### Q1. Where does this therapy fit?
**Draft answer:** Position by approved indication and studied population. Avoid comparative claims unless supported by labeled / approved materials.

#### Q2. What safety topics come up most?
- Common adverse reactions (label-aligned)
- Monitoring recommendations
- When to escalate to PV / medical information

> **Safety note:** Any suspected adverse event in a real workflow should follow your company’s AE reporting SOP.

### Evidence snapshot

| Domain | What to emphasize | Caution |
| --- | --- | --- |
| Efficacy | Primary endpoint + timeframe | Don’t extrapolate beyond study |
| Safety | Frequency + management | Don’t minimize rare events |
| Practical | Clinic workflow fit | Don’t invent access guarantees |

Need this shorter, more patient-friendly, or rewritten as an HCP role-play? Use the follow-up chips below.`,
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
