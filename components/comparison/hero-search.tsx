'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function HeroSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="relative min-h-[50vh] flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-800 text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Compare Perfumes</h1>
      <p className="text-xl mb-8">Find and compare your favorite fragrances</p>
      <form onSubmit={handleSearch} className="w-full max-w-2xl flex gap-2">
        <Input
          type="text"
          placeholder="Search for perfumes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 text-black"
        />
        <Button type="submit">
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </form>
    </div>
  )
}

