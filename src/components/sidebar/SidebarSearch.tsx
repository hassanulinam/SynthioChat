import { observer } from 'mobx-react'

import SearchIcon from '../../Icons/SearchIcon'
import CloseIcon from '../../Icons/CloseIcon'
import { useChatStore, useUiStore } from '../../stores/useStores'

import './SidebarSearch.css'

export const SidebarSearch = observer(function SidebarSearch() {
  const chatStore = useChatStore()
  const uiStore = useUiStore()
  const iconFill = uiStore.isDark ? '#a3a3a3' : '#737373'

  return (
    <div className="sidebar-search">
      <span className="sidebar-search-icon" aria-hidden="true">
        <SearchIcon fill={iconFill} size={16} />
      </span>
      <label className="sr-only" htmlFor="sidebar-chat-search">
        Search chats
      </label>
      <input
        id="sidebar-chat-search"
        className="sidebar-search-input"
        type="search"
        placeholder="Search chats…"
        value={chatStore.searchQuery}
        onChange={(event) => chatStore.setSearchQuery(event.target.value)}
      />
      {chatStore.searchQuery ? (
        <button
          type="button"
          className="sidebar-search-clear"
          aria-label="Clear search"
          onClick={() => chatStore.clearSearch()}
        >
          <CloseIcon fill={iconFill} size={12} />
        </button>
      ) : null}
    </div>
  )
})
