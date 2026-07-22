import { observer } from 'mobx-react'

import {
  AUDIENCE_ROLES,
  EMPTY_STATE_GREETING,
} from '../../../constants/prompts'
import { useUiStore, useVoiceStore } from '../../../stores/useStores'
import { Button } from '../../common/Button'
import { EmptyState } from '../../common/EmptyState'

import './index.css'

export const ChatEmptyState = observer(function ChatEmptyState() {
  const uiStore = useUiStore()
  const voiceStore = useVoiceStore()

  const renderRoleChips = () => (
    <div className="chat-empty-roles" role="group" aria-label="Audience role">
      {AUDIENCE_ROLES.map((role) => {
        const isActive = uiStore.activeRole === role.id
        return (
          <button
            key={role.id}
            type="button"
            className={`chat-empty-role-chip${
              isActive ? ' chat-empty-role-chip--active' : ''
            }`}
            aria-pressed={isActive}
            onClick={() => uiStore.setActiveRole(role.id)}
          >
            {role.label}
          </button>
        )
      })}
    </div>
  )

  const renderAudioCta = () => (
    <Button
      type="button"
      variant="secondary"
      onClick={() => voiceStore.startAudioChat()}
    >
      Try Audio chat
    </Button>
  )

  return (
    <div className="message-list message-list--empty">
      <EmptyState
        title={EMPTY_STATE_GREETING.title}
        description={EMPTY_STATE_GREETING.description}
        action={
          <div className="chat-empty-actions">
            {renderRoleChips()}
            {renderAudioCta()}
          </div>
        }
      />
    </div>
  )
})
