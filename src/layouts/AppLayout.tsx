import type { ReactNode } from 'react'

import './AppLayout.css'

interface AppLayoutProps {
  sidebar: ReactNode
  main: ReactNode
  voice: ReactNode
}

export function AppLayout({ sidebar, main, voice }: AppLayoutProps) {
  return (
    <div className="app-layout">
      {sidebar}
      <div className="app-layout-main">
        <div className="app-layout-chat">{main}</div>
        <div className="app-layout-voice">{voice}</div>
      </div>
    </div>
  )
}
