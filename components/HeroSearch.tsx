'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getPerfumes } from '@/lib/api'

export function HeroSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const router = useRouter()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    if (value.length > 2) {
      const results = await getPerfumes(value)
      setSuggestions(results.slice(0, 5))
    } else {
      setSuggestions([])
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto pt-20 px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-blue-800">
          Find Your Perfect Scent Match
        </h1>
        <p className="text-xl text-blue-600 mb-4">
          Compare perfumes and discover your signature fragrance
        </p>
      </motion.div>

      <form onSubmit={handleSearch} className="relative" role="search">
        <label htmlFor="search-input" className="sr-only">Search perfumes</label>
        <Input
          id="search-input"
          type="text"
          placeholder="Search perfumes (e.g., 'Chanel No. 5' or 'floral scents')"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="w-full h-16 pl-12 pr-32 text-lg rounded-full border-2 border-blue-300 bg-white/80 backdrop-blur-sm focus:border-blue-500 focus:ring-blue-500 shadow-lg"
          aria-autocomplete="list"
          aria-controls="search-suggestions"
          aria-expanded={showSuggestions && suggestions.length > 0}
          data-testid="hero-search-input"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-6 h-6" aria-hidden="true" />
        <Button 
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 rounded-full px-6 py-2 text-lg font-semibold shadow-md"
          data-testid="hero-search-button"
        >
          Compare <Sparkles className="ml-2 w-5 h-5 inline-block" aria-hidden="true" />
        </Button>
      </form>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full mt-2 bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden z-50"
            id="search-suggestions"
            role="listbox"
          >
            {suggestions.map((perfume) => (
              <button
                key={perfume.id}
                onClick={() => {
                  setSearchQuery(perfume.name)
                  router.push(`/perfume/${perfume.id}`)
                }}
                className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center justify-between group"
                role="option"
              >
                <div>
                  <div className="font-medium text-blue-900">{perfume.name}</div>
                  <div className="text-sm text-blue-600">{perfume.brand}</div>
                </div>
                <Sparkles className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

