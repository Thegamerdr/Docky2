'use client'

import { useEffect, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'
import { checkIntlSupport } from '@/lib/browserCheck'
import { useLocale } from 'next-intl'

export function IntlSupportWarning() {
  const [showWarning, setShowWarning] = useState(false)
  const locale = useLocale()

  useEffect(() => {
    const hasSupport = checkIntlSupport(locale)
    setShowWarning(!hasSupport)
  }, [locale])

  if (!showWarning) return null

  return (
    <Alert variant="warning" className="m-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Browser Compatibility Warning</AlertTitle>
      <AlertDescription>
        Your browser may not fully support all internationalization features.
        Some content might not display correctly. Please consider updating your browser.
      </AlertDescription>
    </Alert>
  )
}

