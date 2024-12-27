'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'

interface FilterOption {
  id: string
  label: string
  options: string[]
}

const filterOptions: FilterOption[] = [
  {
    id: 'category',
    label: 'Category',
    options: ['Floral', 'Woody', 'Oriental', 'Fresh', 'Citrus'],
  },
  {
    id: 'brand',
    label: 'Brand',
    options: ['Chanel', 'Dior', 'Gucci', 'Tom Ford', 'Jo Malone'],
  },
  {
    id: 'price',
    label: 'Price Range',
    options: ['Under $50', '$50-$100', '$100-$200', 'Over $200'],
  },
  {
    id: 'rating',
    label: 'Rating',
    options: ['4★ & Up', '3★ & Up', '2★ & Up'],
  },
]

export function FilterBar() {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({})

  const handleFilterSelect = (categoryId: string, option: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [categoryId]: [...(prev[categoryId] || []), option],
    }))
  }

  const removeFilter = (categoryId: string, option: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [categoryId]: prev[categoryId]?.filter(item => item !== option) || [],
    }))
  }

  const clearAllFilters = () => {
    setActiveFilters({})
  }

  return (
    <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 flex-wrap flex-1">
            {filterOptions.map((category) => (
              <DropdownMenu key={category.id}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-8">
                    {category.label}
                    <Filter className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {category.options.map((option) => (
                    <DropdownMenuItem
                      key={option}
                      onClick={() => handleFilterSelect(category.id, option)}
                      className="cursor-pointer"
                    >
                      {option}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>

          {Object.keys(activeFilters).length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="h-8"
            >
              Clear all
            </Button>
          )}
        </div>

        <AnimatePresence>
          {Object.keys(activeFilters).length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-wrap gap-2 mt-4"
            >
              {Object.entries(activeFilters).map(([categoryId, options]) =>
                options.map((option) => (
                  <Badge
                    key={`${categoryId}-${option}`}
                    variant="secondary"
                    className="h-8 px-3 flex items-center gap-1"
                  >
                    {option}
                    <button
                      onClick={() => removeFilter(categoryId, option)}
                      className="ml-1 hover:text-primary"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

