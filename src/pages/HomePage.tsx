import { useState } from 'react'

import { ChatWindow } from '../components/chat'
import { Sidebar } from '../components/sidebar/Sidebar'
import { AppLayout } from '../layouts/AppLayout'

export function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <AppLayout
      sidebar={
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      }
      main={
        <ChatWindow
          isSidebarOpen={isSidebarOpen}
          onExpandSidebar={() => setIsSidebarOpen(true)}
        />
      }
    />
  )
}
