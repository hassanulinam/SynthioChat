import { observer } from 'mobx-react'

import CloseIcon from '../../Icons/CloseIcon'
import { ThemeToggle } from '../common/ThemeToggle'
import { useUiStore } from '../../stores/useStores'

import { ChatList } from './ChatList'
import { NewChatButton } from './NewChatButton'
import { SidebarSearch } from './SidebarSearch'
import './Sidebar.css'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export const Sidebar = observer(function Sidebar({ isOpen, onClose }: SidebarProps) {
  const uiStore = useUiStore()
  const iconFill = uiStore.isDark ? '#ececec' : '#171717'

  const renderHeader = () => (
    <div className="sidebar-header">
      <p className="sidebar-brand">SynthioChat</p>
      <button
        type="button"
        className="sidebar-close"
        aria-label="Collapse sidebar"
        onClick={onClose}
      >
        <CloseIcon fill={iconFill} size={16} />
      </button>
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
        aria-hidden={!isOpen}
      >
        {renderHeader()}
        <div className="sidebar-actions">
          <SidebarSearch />
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
})
