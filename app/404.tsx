import { Suspense } from 'react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { NotFoundContent } from '@/components/NotFoundContent'

export default function NotFoundPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NotFoundContent />
    </Suspense>
  )
}

