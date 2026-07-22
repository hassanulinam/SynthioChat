import { observer } from 'mobx-react'

import { Button } from '../common/Button'
import { useChatStore, useUiStore } from '../../stores/useStores'

export const NewChatButton = observer(function NewChatButton() {
  const chatStore = useChatStore()
  const uiStore = useUiStore()

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
      New Chat
    </Button>
  )
})
