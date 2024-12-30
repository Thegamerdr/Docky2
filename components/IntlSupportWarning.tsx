'use client'

import { useEffect, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'
import { checkIntlSupport } from '@/lib/browserCheck'
import { useLocale, useTranslations } from 'next-intl'

export function IntlSupportWarning() {
  const [showWarning, setShowWarning] = useState(false)
  const locale = useLocale()
  const t = useTranslations('intlSupport')

  useEffect(() => {
    const hasSupport = checkIntlSupport(locale)
    setShowWarning(!hasSupport)
  }, [locale])

  if (!showWarning) return null

  return (
    <Alert variant="default" className="m-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>{t('browserCompatibilityWarning')}</AlertTitle>
      <AlertDescription>
        {t('browserSupportMessage')}
      </AlertDescription>
    </Alert>
  )
}

