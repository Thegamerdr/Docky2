import { useState, useEffect } from 'react'
import { PerfumeCard } from '@/components/PerfumeCard'

interface Perfume {
  id: string
  name: string
  brand: string
  price: number
}

export function PerfumeList({ searchTerm }: { searchTerm: string }) {
  const [perfumes, setPerfumes] = useState<Perfume[]>([])

  useEffect(() => {
    // In a real application, this would be an API call
    const fetchPerfumes = async () => {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setPerfumes([
        { id: '1', name: 'Chanel No. 5', brand: 'Chanel', price: 99 },
        { id: '2', name: 'J'adore', brand: 'Dior', price: 89 },
        { id: '3', name: 'Black Opium', brand: 'Yves Saint Laurent', price: 79 },
      ].filter(perfume => 
        perfume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        perfume.brand.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    }

    fetchPerfumes()
  }, [searchTerm])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {perfumes.map(perfume => (
        <PerfumeCard key={perfume.id} perfume={perfume} />
      ))}
    </div>
  )
}

