import { Star } from 'lucide-react'
import { Review } from '@/lib/mockData'

interface ReviewSectionProps {
  reviews: Review[]
}

export function ReviewSection({ reviews }: ReviewSectionProps) {
  return (
    <div>
      <h3 className="font-semibold mb-2">User Reviews:</h3>
      {reviews.map((review) => (
        <div key={review.id} className="border-t border-gray-200 py-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">{review.username}</span>
            <div className="flex items-center">
              <Star className="text-yellow-400 w-4 h-4 mr-1" />
              <span>{review.rating}</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">{review.comment}</p>
          <span className="text-xs text-gray-400">{review.date}</span>
        </div>
      ))}
    </div>
  )
}

