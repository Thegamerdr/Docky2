'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('error')

  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-8">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{t('errorOccurred')}</AlertTitle>
        <AlertDescription>
          <p className="mb-4">{t('tryAgainMessage')}</p>
          <Button onClick={reset} variant="secondary">
            {t('tryAgain')}
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  )
}

