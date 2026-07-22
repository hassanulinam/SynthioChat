import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type MouseEvent,
} from 'react'
import { observer } from 'mobx-react'

import EditPencilIcon from '../../Icons/EditPencilIcon'
import MoreDotsIcon from '../../Icons/MoreDotsIcon'
import PinIcon from '../../Icons/PinIcon'
import TrashIcon from '../../Icons/TrashIcon'
import UnpinIcon from '../../Icons/UnpinIcon'
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const iconFill = uiStore.isDark ? '#ececec' : '#171717'

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [isMenuOpen])

  const beginRename = () => {
    setDraftTitle(session.title)
    setIsEditing(true)
    setIsMenuOpen(false)
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

  const handleDelete = () => {
    setIsMenuOpen(false)
    const confirmed = window.confirm(`Delete “${session.title}”?`)
    if (!confirmed) {
      return
    }
    const deleted = chatStore.deleteChat(session.id)
    if (deleted) {
      uiStore.showToast('Chat deleted')
    }
  }

  const handleTogglePin = (event: MouseEvent) => {
    event.stopPropagation()
    const toggled = chatStore.togglePinChat(session.id)
    if (toggled) {
      uiStore.showToast(session.isPinned ? 'Chat pinned' : 'Chat unpinned')
    }
  }

  const renderRenameForm = () => (
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

  const renderPinBadge = () => {
    if (!session.isPinned) {
      return null
    }

    return (
      <span className="chat-item-pin-badge" aria-hidden="true">
        <PinIcon fill={iconFill} size={12} />
      </span>
    )
  }

  const renderSessionButton = () => (
    <button
      type="button"
      className={`chat-item${isActive ? ' chat-item--active' : ''}`}
      onClick={() => chatStore.switchChat(session.id)}
      aria-current={isActive ? 'true' : undefined}
    >
      {renderPinBadge()}
      <span className="chat-item-title">{session.title}</span>
    </button>
  )

  const renderPinButton = () => (
    <button
      type="button"
      className="chat-item-action"
      aria-label={session.isPinned ? `Unpin ${session.title}` : `Pin ${session.title}`}
      onClick={handleTogglePin}
    >
      {session.isPinned ? (
        <UnpinIcon fill={iconFill} size={16} />
      ) : (
        <PinIcon fill={iconFill} size={16} />
      )}
    </button>
  )

  const renderMoreButton = () => (
    <button
      type="button"
      className="chat-item-action"
      aria-label={`More options for ${session.title}`}
      aria-haspopup="menu"
      aria-expanded={isMenuOpen}
      onClick={(event) => {
        event.stopPropagation()
        setIsMenuOpen((open) => !open)
      }}
    >
      <MoreDotsIcon fill={iconFill} size={16} />
    </button>
  )

  const renderMenu = () => {
    if (!isMenuOpen) {
      return null
    }

    return (
      <div className="chat-item-menu" role="menu">
        <button
          type="button"
          className="chat-item-menu-item"
          role="menuitem"
          onClick={(event) => {
            event.stopPropagation()
            beginRename()
          }}
        >
          <EditPencilIcon fill={iconFill} size={16} />
          Rename
        </button>
        <button
          type="button"
          className="chat-item-menu-item chat-item-menu-item--danger"
          role="menuitem"
          onClick={(event) => {
            event.stopPropagation()
            handleDelete()
          }}
        >
          <TrashIcon fill="#b91c1c" size={16} />
          Delete
        </button>
      </div>
    )
  }

  const renderActions = () => (
    <div className="chat-item-actions" ref={menuRef}>
      {renderPinButton()}
      {renderMoreButton()}
      {renderMenu()}
    </div>
  )

  if (isEditing) {
    return renderRenameForm()
  }

  return (
    <div
      className={`chat-item-row${isActive ? ' chat-item-row--active' : ''}${
        isMenuOpen ? ' chat-item-row--menu-open' : ''
      }`}
    >
      {renderSessionButton()}
      {renderActions()}
    </div>
  )
})
