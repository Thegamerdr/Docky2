'use client'

import Link from 'next/link'
import { Home, Settings, BarChart2 } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                <Home className="mr-2" size={20} />
                Home
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                <BarChart2 className="mr-2" size={20} />
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/risc-config" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                <Settings className="mr-2" size={20} />
                RISC Configuration
              </Link>
            </li>
            <li>
              <Link href="/inventory" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                <BarChart2 className="mr-2" size={20} />
                Inventory
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

