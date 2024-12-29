'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('error')

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{t('criticalError')}</h1>
            <p className="mb-4">{t('criticalErrorMessage')}</p>
            <Button onClick={reset}>{t('tryAgain')}</Button>
          </div>
        </div>
      </body>
    </html>
  )
}

