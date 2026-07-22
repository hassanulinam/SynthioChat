import { useState, type FormEvent, type KeyboardEvent, type MouseEvent } from 'react'
import { observer } from 'mobx-react'

import type { ChatSession } from '../../types/chat.types'
import { useChatStore, useUiStore } from '../../stores/useStores'

import './ChatItem.css'

interface ChatItemProps {
  session: ChatSession
}

export const ChatItem = observer(function ChatItem({ session }: ChatItemProps) {
  const chatStore = useChatStore()
  const uiStore = useUiStore()
  const isActive = chatStore.activeSessionId === session.id
  const [isEditing, setIsEditing] = useState(false)
  const [draftTitle, setDraftTitle] = useState(session.title)

  const beginRename = (event: MouseEvent) => {
    event.stopPropagation()
    setDraftTitle(session.title)
    setIsEditing(true)
  }

  const commitRename = () => {
    const renamed = chatStore.renameChat(session.id, draftTitle)
    if (renamed) {
      uiStore.showToast('Chat renamed')
    }
    setIsEditing(false)
  }

  const handleRenameKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      commitRename()
    }
    if (event.key === 'Escape') {
      event.preventDefault()
      setIsEditing(false)
      setDraftTitle(session.title)
    }
  }

  const handleDelete = (event: MouseEvent) => {
    event.stopPropagation()
    const confirmed = window.confirm(`Delete “${session.title}”?`)
    if (!confirmed) {
      return
    }
    const deleted = chatStore.deleteChat(session.id)
    if (deleted) {
      uiStore.showToast('Chat deleted')
    }
  }

  if (isEditing) {
    return (
      <form
        className="chat-item chat-item--editing"
        onSubmit={(event: FormEvent) => {
          event.preventDefault()
          commitRename()
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <label className="sr-only" htmlFor={`rename-${session.id}`}>
          Rename chat
        </label>
        <input
          id={`rename-${session.id}`}
          className="chat-item-rename-input"
          value={draftTitle}
          autoFocus
          onChange={(event) => setDraftTitle(event.target.value)}
          onKeyDown={handleRenameKeyDown}
          onBlur={commitRename}
        />
      </form>
    )
  }

  return (
    <div className={`chat-item-row${isActive ? ' chat-item-row--active' : ''}`}>
      <button
        type="button"
        className={`chat-item${isActive ? ' chat-item--active' : ''}`}
        onClick={() => chatStore.switchChat(session.id)}
        aria-current={isActive ? 'true' : undefined}
      >
        <span className="chat-item-title">{session.title}</span>
      </button>
      <div className="chat-item-actions">
        <button
          type="button"
          className="chat-item-action"
          aria-label={`Rename ${session.title}`}
          onClick={beginRename}
        >
          <span className="icon-placeholder" data-icon="rename" aria-hidden="true" />
          {/* icon-placeholder: rename */}
        </button>
        <button
          type="button"
          className="chat-item-action"
          aria-label={`Delete ${session.title}`}
          onClick={handleDelete}
        >
          <span className="icon-placeholder" data-icon="delete" aria-hidden="true" />
          {/* icon-placeholder: delete */}
        </button>
      </div>
    </div>
  )
})
