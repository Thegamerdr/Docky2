'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { useToast } from '@/components/ui/use-toast'

interface SearchFilters {
  query: string
  brand: string
  notes: string[]
  minPrice: number
  maxPrice: number
}

const brands = ['All', 'Chanel', 'Dior', 'Tom Ford', 'Yves Saint Laurent']
const noteOptions = ['Floral', 'Woody', 'Citrus', 'Oriental', 'Fresh', 'Spicy']

export function AdvancedSearch() {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    brand: 'All',
    notes: [],
    minPrice: 0,
    maxPrice: 500,
  })
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleBrandChange = (value: string) => {
    setFilters({ ...filters, brand: value })
  }

  const handleNoteToggle = (note: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      notes: prevFilters.notes.includes(note)
        ? prevFilters.notes.filter((n) => n !== note)
        : [...prevFilters.notes, note],
    }))
  }

  const handlePriceChange = (values: number[]) => {
    setFilters({ ...filters, minPrice: values[0], maxPrice: values[1] })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log('Search filters:', filters)
    toast({
      title: "Search Applied",
      description: "Your search filters have been applied.",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="text"
          name="query"
          placeholder="Search perfumes..."
          value={filters.query}
          onChange={handleInputChange}
          data-testid="search-input"
        />
      </div>
      <div>
        <Select value={filters.brand} onValueChange={handleBrandChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select brand" />
          </SelectTrigger>
          <SelectContent>
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <p className="mb-2 font-medium">Notes</p>
        <div className="flex flex-wrap gap-2">
          {noteOptions.map((note) => (
            <Button
              key={note}
              type="button"
              variant={filters.notes.includes(note) ? "default" : "outline"}
              onClick={() => handleNoteToggle(note)}
              className="text-sm"
            >
              {note}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 font-medium">Price Range</p>
        <Slider
          min={0}
          max={500}
          step={10}
          value={[filters.minPrice, filters.maxPrice]}
          onValueChange={handlePriceChange}
        />
        <div className="flex justify-between mt-2 text-sm">
          <span>${filters.minPrice}</span>
          <span>${filters.maxPrice}</span>
        </div>
      </div>
      <Button type="submit" className="w-full" data-testid="search-button">
        <Search className="w-4 h-4 mr-2" />
        Search
      </Button>
    </form>
  )
}

