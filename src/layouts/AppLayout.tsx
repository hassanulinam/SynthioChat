import type { ReactNode } from 'react'

import './AppLayout.css'

interface AppLayoutProps {
  sidebar: ReactNode
  main: ReactNode
}

export function AppLayout({ sidebar, main }: AppLayoutProps) {
  return (
    <div className="app-layout">
      {sidebar}
      <div className="app-layout-main">{main}</div>
    </div>
  )
}
