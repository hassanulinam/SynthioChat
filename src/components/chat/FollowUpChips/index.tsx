import { observer } from 'mobx-react'

import { FOLLOW_UP_PROMPTS, type FollowUpPrompt } from '../../../constants/prompts'
import { useChatStore } from '../../../stores/useStores'

import './index.css'

interface FollowUpChipsProps {
  onPrefill: (text: string) => void
}

export const FollowUpChips = observer(function FollowUpChips({
  onPrefill,
}: FollowUpChipsProps) {
  const chatStore = useChatStore()
  const messages = chatStore.activeMessages
  const lastMessage = messages[messages.length - 1]

  if (chatStore.isLoading || !lastMessage || lastMessage.role !== 'assistant') {
    return null
  }

  const renderChip = (followUp: FollowUpPrompt) => (
    <button
      key={followUp.id}
      type="button"
      className="follow-up-chip"
      onClick={() => onPrefill(followUp.prompt)}
    >
      {followUp.label}
    </button>
  )

  return (
    <div className="follow-up-chips" aria-label="Follow-up suggestions">
      {FOLLOW_UP_PROMPTS.map(renderChip)}
    </div>
  )
})
