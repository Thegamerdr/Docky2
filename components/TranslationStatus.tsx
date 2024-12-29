'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

interface TranslationProgress {
  locale: string
  progress: number
  totalStrings: number
  translatedStrings: number
}

export function TranslationStatus() {
  const [progress, setProgress] = useState<TranslationProgress[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTranslationStatus() {
      try {
        const response = await fetch('/api/translations/status')
        if (!response.ok) throw new Error('Failed to fetch translation status')
        const data = await response.json()
        setProgress(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load translation status')
      } finally {
        setLoading(false)
      }
    }

    fetchTranslationStatus()
  }, [])

  if (loading) return <div>Loading translation status...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Translation Progress</CardTitle>
      </CardHeader>
      <CardContent>
        {progress.map((locale) => (
          <div key={locale.locale} className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Badge>{locale.locale}</Badge>
                <span>{Math.round(locale.progress)}%</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {locale.translatedStrings} / {locale.totalStrings} strings
              </span>
            </div>
            <Progress value={locale.progress} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

