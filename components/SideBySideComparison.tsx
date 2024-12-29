import Image from 'next/image'
import { Star, Clock, Wind } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Perfume {
  id: string
  name: string
  brand: string
  price: number
  rating: number
  notes: string[]
  concentration: string
  longevity: string
  sillage: string
  description: string
  image: string
}

interface SideBySideComparisonProps {
  perfumes: Perfume[]
}

export function SideBySideComparison({ perfumes }: SideBySideComparisonProps) {
  const t = useTranslations('perfume')

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {perfumes.map((perfume) => (
        <Card key={perfume.id} className="bg-white rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{perfume.name}</CardTitle>
            <p className="text-gray-600">{perfume.brand}</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <Image src={perfume.image} alt={perfume.name} width={100} height={100} className="rounded-lg mr-4" />
              <div>
                <div className="flex items-center mb-2">
                  <Star className="text-yellow-400 w-5 h-5 mr-1" />
                  <span className="font-bold">{perfume.rating.toFixed(1)}</span>
                </div>
                <p className="font-bold">${perfume.price.toFixed(2)}</p>
              </div>
            </div>
            <p className="mb-4">{perfume.description}</p>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">{t('notes')}:</h3>
              <div className="flex flex-wrap gap-2">
                {perfume.notes.map((note, index) => (
                  <Badge key={index} variant="secondary">
                    {note}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <Clock className="text-blue-500 w-5 h-5 mr-2" />
                <span className="text-sm">{t('longevity')}: {perfume.longevity}</span>
              </div>
              <div className="flex items-center">
                <Wind className="text-blue-500 w-5 h-5 mr-2" />
                <span className="text-sm">{t('sillage')}: {perfume.sillage}</span>
              </div>
            </div>
            <Badge>{perfume.concentration}</Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

