'use client'

import { useTranslations, useFormatter } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export function InternationalizationDemo() {
  const t = useTranslations('demo')
  const format = useFormatter()
  const now = new Date()
  const items = ['HTML', 'CSS', 'JavaScript']

  return (
    <div className="space-y-6 rtl:space-y-reverse">
      <Card>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Pluralization */}
          <section>
            <h3 className="font-semibold mb-2">{t('pluralization.title')}</h3>
            <p>{t('pluralization.items', { count: 0 })}</p>
            <p>{t('pluralization.items', { count: 1 })}</p>
            <p>{t('pluralization.items', { count: 2 })}</p>
          </section>

          <Separator />

          {/* Date Formatting */}
          <section>
            <h3 className="font-semibold mb-2">{t('dateTime.title')}</h3>
            <p>
              {format.dateTime(now, {
                dateStyle: 'full',
                timeStyle: 'long',
              })}
            </p>
            <p>
              {format.relativeTime(now, {
                numeric: 'auto',
              })}
            </p>
          </section>

          <Separator />

          {/* Number Formatting */}
          <section>
            <h3 className="font-semibold mb-2">{t('numbers.title')}</h3>
            <p>
              {format.number(1234567.89, {
                style: 'currency',
                currency: 'EUR',
              })}
            </p>
            <p>
              {format.number(0.7, {
                style: 'percent',
              })}
            </p>
          </section>

          <Separator />

          {/* List Formatting */}
          <section>
            <h3 className="font-semibold mb-2">{t('lists.title')}</h3>
            <p>
              {format.list(items, {
                type: 'conjunction',
              })}
            </p>
          </section>

          {/* Text Direction */}
          <section>
            <h3 className="font-semibold mb-2">{t('direction.title')}</h3>
            <div className="space-y-2">
              <p className="text-start">{t('direction.start')}</p>
              <p className="text-end">{t('direction.end')}</p>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}

