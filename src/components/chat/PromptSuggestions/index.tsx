import { observer } from 'mobx-react'

import {
  getStarterPrompts,
  type StarterPrompt,
} from '../../../constants/prompts'
import { useChatStore, useUiStore, useVoiceStore } from '../../../stores/useStores'

import './index.css'

interface PromptSuggestionsProps {
  onPrefill: (text: string) => void
}

export const PromptSuggestions = observer(function PromptSuggestions({
  onPrefill,
}: PromptSuggestionsProps) {
  const chatStore = useChatStore()
  const uiStore = useUiStore()
  const voiceStore = useVoiceStore()

  if (
    chatStore.activeMessages.length > 0 ||
    chatStore.isLoading ||
    voiceStore.isAudioChatActive
  ) {
    return null
  }

  const prompts = getStarterPrompts(uiStore.activeRole)

  const handleSelect = (prompt: StarterPrompt) => {
    if (prompt.kind === 'audio') {
      voiceStore.startAudioChat()
      return
    }

    onPrefill(prompt.prompt)
  }

  const renderChip = (prompt: StarterPrompt) => (
    <button
      key={prompt.id}
      type="button"
      className={`prompt-suggestion-chip${
        prompt.kind === 'audio' ? ' prompt-suggestion-chip--audio' : ''
      }`}
      onClick={() => handleSelect(prompt)}
    >
      <span className="prompt-suggestion-title">{prompt.title}</span>
    </button>
  )

  return (
    <div className="prompt-suggestions" aria-label="Suggested prompts">
      {prompts.map(renderChip)}
    </div>
  )
})
