import { observer } from 'mobx-react'

import PlusIcon from '../../Icons/PlusIcon'
import { Button } from '../common/Button'
import { useChatStore, useUiStore } from '../../stores/useStores'

export const NewChatButton = observer(function NewChatButton() {
  const chatStore = useChatStore()
  const uiStore = useUiStore()
  const iconFill = uiStore.isDark ? '#ececec' : '#171717'

  return (
    <Button
      type="button"
      variant="ghost"
      className="new-chat-button"
      onClick={() => {
        chatStore.createChat()
        uiStore.showToast('New chat started')
      }}
    >
      <PlusIcon fill={iconFill} size={16} />
      New Chat
    </Button>
  )
})
