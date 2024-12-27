'use client'

import { ErrorHandler } from '@/components/ErrorHandler'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Critical Error</h1>
          <ErrorHandler error={error} reset={reset} />
        </div>
      </body>
    </html>
  )
}

