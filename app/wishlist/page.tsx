import { Suspense } from 'react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { WishlistContent } from '@/components/WishlistContent'

export default function WishlistPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <WishlistContent />
    </Suspense>
  )
}
