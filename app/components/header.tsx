import Link from "next/link"
import { Bell, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <Link href="/" className="text-2xl font-bold">
        Perfume Analyzer
      </Link>
      <div className="flex items-center space-x-4">
        <form className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search perfumes..."
            className="pl-8 w-64"
          />
        </form>
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
      </div>
    </header>
  )
}

