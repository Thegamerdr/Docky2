import Image from 'next/image'
import { Star, Clock, Wind } from 'lucide-react'
import { Perfume } from '@/lib/mockData'
import { ReviewSection } from '@/components/ReviewSection'

interface PerfumeComparisonProps {
  perfumes: Perfume[]
}

export function PerfumeComparison({ perfumes }: PerfumeComparisonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {perfumes.map((perfume) => (
        <div key={perfume.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Image src={perfume.image} alt={perfume.name} width={100} height={100} className="rounded-lg mr-4" />
            <div>
              <h2 className="text-2xl font-bold">{perfume.name}</h2>
              <p className="text-gray-600">{perfume.brand}</p>
            </div>
          </div>
          <p className="mb-4">{perfume.description}</p>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Notes:</h3>
            <div className="flex flex-wrap gap-2">
              {perfume.notes.map((note, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                  {note}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center">
              <Clock className="text-blue-500 w-5 h-5 mr-2" />
              <span className="text-sm">{perfume.longevity}</span>
            </div>
            <div className="flex items-center">
              <Wind className="text-blue-500 w-5 h-5 mr-2" />
              <span className="text-sm">{perfume.sillage}</span>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Star className="text-yellow-400 w-5 h-5 mr-1" />
              <span>{perfume.rating.toFixed(1)}</span>
            </div>
            <span className="font-bold">${perfume.price.toFixed(2)}</span>
          </div>
          <ReviewSection reviews={perfume.reviews} />
        </div>
      ))}
    </div>
  )
}

