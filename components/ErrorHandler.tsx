'use client'

import { useState } from 'react'
import { AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface ErrorHandlerProps {
  error: Error | null
  reset?: () => void
}

export function ErrorHandler({ error, reset }: ErrorHandlerProps) {
  const [showDetails, setShowDetails] = useState(false)

  const handleReset = () => {
    if (reset) {
      reset()
    } else {
      window.location.reload()
    }
  }

  const getErrorDetails = () => {
    if (!error) return "An unknown error occurred."
    if (error instanceof Error) {
      if (error.message.includes("Cannot destructure property 'data' of '(0 , a.useSession)(...)'")) {
        return "There was an issue with the user session. Please try logging out and logging back in."
      }
      if (error.message.includes("Cannot read properties of undefined (reading 'message')")) {
        return "An unexpected error occurred. Our team has been notified and is working on a solution."
      }
      return error.message
    }
    return "An unexpected error occurred."
  }

  if (!error) return null

  return (
    <Alert variant="destructive" className="my-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error Occurred</AlertTitle>
      <AlertDescription>
        <p>{getErrorDetails()}</p>
        <div className="mt-4">
          <Button onClick={handleReset} variant="secondary" className="mr-2">
            Try Again
          </Button>
          <Button
            onClick={() => setShowDetails(!showDetails)}
            variant="outline"
            className="flex items-center"
          >
            {showDetails ? 'Hide' : 'Show'} Details
            {showDetails ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
          </Button>
        </div>
        {showDetails && error instanceof Error && error.stack && (
          <pre className="mt-4 p-4 bg-muted text-muted-foreground rounded-md overflow-auto">
            {error.stack}
          </pre>
        )}
      </AlertDescription>
    </Alert>
  )
}

