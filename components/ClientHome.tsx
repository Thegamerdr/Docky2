'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { ChevronRight, ChevronLeft, Home, Settings, BarChart2, MessageSquare, FileText, PenToolIcon as Tool } from 'lucide-react'
import { Button } from '@/components/ui/button'
import DebugChat from './DebugChat'
import Logs from './Logs'
import UtilitySettings from './UtilitySettings'
import Sidebar from './Sidebar'

export default function ClientHome({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDebugChatOpen, setIsDebugChatOpen] = useState(false)
  const [isLogsOpen, setIsLogsOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Toggle button */}
      <button
        className={`fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-56' : 'translate-x-0'
        }`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>

      {/* Main content */}
      <main className={`flex-1 p-8 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {children}

        {session && (
          <div className="mt-8 flex space-x-4">
            <Button onClick={() => setIsDebugChatOpen(true)}>
              <MessageSquare className="mr-2" size={20} />
              Debug Chat
            </Button>
            <Button onClick={() => setIsLogsOpen(true)}>
              <FileText className="mr-2" size={20} />
              Logs
            </Button>
            <Button onClick={() => setIsSettingsOpen(true)}>
              <Tool className="mr-2" size={20} />
              Utility Settings
            </Button>
          </div>
        )}
      </main>

      {isDebugChatOpen && (
        <DebugChat onClose={() => setIsDebugChatOpen(false)} />
      )}

      {isLogsOpen && (
        <Logs onClose={() => setIsLogsOpen(false)} />
      )}

      {isSettingsOpen && (
        <UtilitySettings onClose={() => setIsSettingsOpen(false)} />
      )}
    </div>
  )
}

