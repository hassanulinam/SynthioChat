import { observer } from 'mobx-react'

import PlusIcon from '../../../Icons/PlusIcon'
import { Button } from '../../common/Button'
import { useChatStore, useUiStore } from '../../../stores/useStores'

import './index.css'

interface NewChatButtonProps {
  onNavigate?: () => void
}

export const NewChatButton = observer(function NewChatButton({
  onNavigate,
}: NewChatButtonProps) {
  const chatStore = useChatStore()
  const uiStore = useUiStore()
  const iconFill = uiStore.isDark ? '#ececec' : '#171717'

  const renderIcon = () => <PlusIcon fill={iconFill} size={16} />

  return (
    <Button
      type="button"
      variant="ghost"
      className="new-chat-button"
      onClick={() => {
        chatStore.createChat()
        uiStore.showToast('New chat started')
        onNavigate?.()
      }}
    >
      {renderIcon()}
      New Chat
    </Button>
  )
})
