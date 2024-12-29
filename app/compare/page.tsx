import { Suspense } from 'react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ComparisonContent } from '@/components/ComparisonContent'

export default function ComparePage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ComparisonContent />
    </Suspense>
  )
}

