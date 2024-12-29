import { Suspense } from 'react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { HomeContent } from '@/components/HomeContent'

export default function HomePage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HomeContent />
    </Suspense>
  )
}

