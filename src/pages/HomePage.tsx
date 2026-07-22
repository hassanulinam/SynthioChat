import { useState } from 'react'

import { ChatWindow } from '../components/chat/ChatWindow'
import { Sidebar } from '../components/sidebar/Sidebar'
import { AppLayout } from '../layouts/AppLayout'

export function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <AppLayout
      sidebar={
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      }
      main={<ChatWindow onOpenSidebar={() => setIsSidebarOpen(true)} />}
    />
  )
}
