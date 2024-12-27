'use client'

import { useEffect } from 'react'
import { ErrorHandler } from '@/components/ErrorHandler'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
    // Here you could send the error to an error tracking service
  }, [error])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
      <ErrorHandler error={error} reset={reset} />
    </div>
  )
}

