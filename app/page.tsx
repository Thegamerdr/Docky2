"use client"

import { useState } from "react"
import { Header } from "./components/header"
import { Sidebar } from "./components/sidebar"
import { Dashboard } from "./components/dashboard"
import { PlatformManager } from "./components/platform-manager"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>(["amazon", "alibaba"])

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar connectedPlatforms={connectedPlatforms} />
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
          <PlatformManager 
            connectedPlatforms={connectedPlatforms} 
            setConnectedPlatforms={setConnectedPlatforms}
          />
          <Dashboard connectedPlatforms={connectedPlatforms} />
        </main>
      </div>
      <Toaster />
    </div>
  )
}

