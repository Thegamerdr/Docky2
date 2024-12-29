'use client'

import Image from 'next/image'
import { Star, TrendingUp, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface ComparisonCardProps {
  perfume: {
    name: string
    brand: string
    imageUrl: string
    price: number
    rating: number
    platform: string
    availability: string
    trending?: boolean
  }
}

export function ComparisonCard({ perfume }: ComparisonCardProps) {
  return (
    <Card className="w-full max-w-sm transform transition-all duration-300 hover:scale-105">
      <CardHeader className="relative">
        <div className="aspect-square relative">
          <Image
            src={perfume.imageUrl}
            alt={perfume.name}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
        {perfume.trending && (
          <Badge className="absolute top-2 right-2 bg-blue-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            Trending
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-1">{perfume.name}</h3>
        <p className="text-sm text-gray-500 mb-3">{perfume.brand}</p>
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 text-green-600 mr-1" />
            <span className="font-semibold">${perfume.price}</span>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span>{perfume.rating}/5</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {perfume.platform}
          </Badge>
          <span className={cn(
            "text-xs font-medium",
            perfume.availability === 'In Stock' ? 'text-green-600' : 'text-red-600'
          )}>
            {perfume.availability}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

