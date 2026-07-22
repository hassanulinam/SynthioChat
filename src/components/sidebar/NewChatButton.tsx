import { observer } from 'mobx-react'

import { Button } from '../common/Button'
import { useChatStore } from '../../stores/useStores'

export const NewChatButton = observer(function NewChatButton() {
  const chatStore = useChatStore()

  return (
    <Button
      type="button"
      variant="ghost"
      className="new-chat-button"
      onClick={() => chatStore.createChat()}
    >
      New Chat
    </Button>
  )
})
