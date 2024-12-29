import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, DollarSign } from 'lucide-react'

interface Perfume {
  id: string
  name: string
  brand: string
  price?: number
  rating?: number
  concentration?: string
  image?: string
}

interface PerfumeCardProps {
  perfume: Perfume
  isSelected: boolean
  onSelect: () => void
  actionLabel?: string
}

export function PerfumeCard({ perfume, isSelected, onSelect, actionLabel = "Select" }: PerfumeCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Card className={`transition-all duration-300 ${isSelected ? 'ring-2 ring-teal-500' : ''}`} data-testid="perfume-card">
      <CardContent className="p-4">
        <div className="relative h-48 mb-4">
          <Image
            src={perfume.image || "/placeholder.svg?height=200&width=200"}
            alt={`${perfume.name} by ${perfume.brand}`}
            layout="fill"
            objectFit="cover"
            className={`rounded-lg transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" aria-hidden="true" />
          )}
        </div>
        <h3 className="text-lg font-semibold mb-1 text-teal-800" data-testid="perfume-name">{perfume.name}</h3>
        <p className="text-sm text-teal-600 mb-2">{perfume.brand}</p>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 text-teal-500 mr-1" aria-hidden="true" />
            <span className="font-semibold text-teal-700">
              {perfume.price ? `$${perfume.price.toFixed(2)}` : 'Price not available'}
            </span>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" aria-hidden="true" />
            <span className="text-teal-700" aria-label={`Rating: ${perfume.rating ? perfume.rating.toFixed(1) : 'Not rated'} out of 5`}>
              {perfume.rating ? perfume.rating.toFixed(1) : 'N/A'}
            </span>
          </div>
        </div>
        {perfume.concentration && (
          <Badge variant="outline" className="mb-2">
            {perfume.concentration}
          </Badge>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={onSelect}
          variant={isSelected ? "secondary" : "default"}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white"
          aria-pressed={isSelected}
        >
          {actionLabel}
        </Button>
      </CardFooter>
    </Card>
  )
}

