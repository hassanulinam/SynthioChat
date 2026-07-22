import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react'
import { observer } from 'mobx-react'

import ExpandRightIcon from '../../Icons/ExpandRightIcon'
import { ThemeToggle } from '../common/ThemeToggle'
import { useUiStore } from '../../stores/useStores'

import { ChatList } from './ChatList'
import { NewChatButton } from './NewChatButton'
import { SidebarSearch } from './SidebarSearch'
import './Sidebar.css'

interface SidebarProps {
  isOpen: boolean
  width: number
  isResizing: boolean
  onClose: () => void
  onResizeStart: (event: ReactPointerEvent<HTMLDivElement>) => void
}

export const Sidebar = observer(function Sidebar({
  isOpen,
  width,
  isResizing,
  onClose,
  onResizeStart,
}: SidebarProps) {
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
        <span className="sidebar-collapse-icon">
          <ExpandRightIcon fill={iconFill} size={16} />
        </span>
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
        className={`sidebar${isOpen ? ' sidebar--open' : ''}${
          isResizing ? ' sidebar--resizing' : ''
        }`}
        aria-label="Chat sidebar"
        aria-hidden={!isOpen}
        style={
          {
            '--sidebar-width': `${width}px`,
          } as CSSProperties
        }
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
        {isOpen ? (
          <div
            className="sidebar-resize-handle"
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize sidebar"
            onPointerDown={onResizeStart}
          />
        ) : null}
      </aside>
    </>
  )
})
