import { Suspense } from 'react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { BrowseContent } from '@/components/BrowseContent'

export default function BrowsePage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BrowseContent />
    </Suspense>
  )
}

