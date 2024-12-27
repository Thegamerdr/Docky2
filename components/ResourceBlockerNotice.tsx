'use client'

import { useState, useEffect } from 'react'
import { AlertCircle, X } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

export function ResourceBlockerNotice() {
  const [showNotice, setShowNotice] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const checkResourceBlocking = async () => {
      try {
        const response = await fetch('/_vercel/insights/script.js')
        if (!response.ok) {
          setShowNotice(true)
        }
      } catch (error) {
        setShowNotice(true)
      }
    }

    const hasDismissed = localStorage.getItem('resourceBlockerNoticeDismissed')
    if (!hasDismissed) {
      checkResourceBlocking()
    }
  }, [])

  const handleDismiss = () => {
    setDismissed(true)
    localStorage.setItem('resourceBlockerNoticeDismissed', 'true')
  }

  if (!showNotice || dismissed) return null

  return (
    <Alert variant="warning" className="m-4 relative">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Resource Blocker Detected</AlertTitle>
      <AlertDescription>
        Some resources are being blocked by your browser or extensions. This may affect site functionality. 
        Consider disabling your ad-blocker or adding our site to the allowlist for the best experience.
      </AlertDescription>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2"
        onClick={handleDismiss}
      >
        <X className="h-4 w-4" />
      </Button>
    </Alert>
  )
}

