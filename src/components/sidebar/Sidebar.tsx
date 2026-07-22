import { IconButton } from '../common/IconButton'
import { ThemeToggle } from '../common/ThemeToggle'

import { ChatList } from './ChatList'
import { NewChatButton } from './NewChatButton'
import './Sidebar.css'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const renderHeader = () => (
    <div className="sidebar-header">
      <p className="sidebar-brand">SynthioChat</p>
      <IconButton
        label="Close menu"
        className="sidebar-close"
        onClick={onClose}
      >
        <span
          className="icon-placeholder"
          data-icon="close"
          aria-hidden="true"
        />
        {/* icon-placeholder: close */}
      </IconButton>
    </div>
  )

  return (
    <>
      <div
        className={`sidebar-backdrop${isOpen ? ' sidebar-backdrop--open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`sidebar${isOpen ? ' sidebar--open' : ''}`}
        aria-label="Chat sidebar"
      >
        {renderHeader()}
        <div className="sidebar-actions">
          <NewChatButton />
        </div>
        <div className="sidebar-list">
          <ChatList />
        </div>
        <div className="sidebar-footer">
          <ThemeToggle />
        </div>
      </aside>
    </>
  )
}
