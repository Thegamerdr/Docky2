import { Suspense } from 'react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { DashboardContent } from '@/components/DashboardContent'

export default function DashboardPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DashboardContent />
    </Suspense>
  )
}

