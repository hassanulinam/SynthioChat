import { observer } from 'mobx-react'

import { useUiStore } from '../../stores/useStores'

import './ThemeToggle.css'

export const ThemeToggle = observer(function ThemeToggle() {
  const uiStore = useUiStore()

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={uiStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => uiStore.toggleTheme()}
    >
      <span
        className="icon-placeholder"
        data-icon={uiStore.isDark ? 'sun' : 'moon'}
        aria-hidden="true"
      />
      {/* icon-placeholder: theme */}
      <span>{uiStore.isDark ? 'Light mode' : 'Dark mode'}</span>
    </button>
  )
})
