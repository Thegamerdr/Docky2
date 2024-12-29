'use client'

import { useFormatter } from 'next-intl'
import { Star, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useTypedTranslations } from '@/hooks/useTypedTranslations'

interface PerfumeCardProps {
  perfume: {
    name: string
    brand: string
    price: number
    rating: number
    releaseDate: string
    notes: Array<keyof IntlMessages['perfume']['notes']>
    reviews: number
  }
}

export function LocalizedPerfumeCard({ perfume }: PerfumeCardProps) {
  const t = useTypedTranslations('perfume')
  const format = useFormatter()

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <h3 className="text-lg font-semibold">{t('title')}</h3>
        <p className="text-sm text-muted-foreground">{perfume.brand}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>{format.number(perfume.rating, { maximumFractionDigits: 1 })}</span>
              <span className="text-sm text-muted-foreground">
                ({format.number(perfume.reviews)} {t('reviews')})
              </span>
            </div>
            <span className="font-bold">
              {format.number(perfume.price, {
                style: 'currency',
                currency: 'USD'
              })}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">
              {t('releasedOn', {
                date: format.date(new Date(perfume.releaseDate), {
                  year: 'numeric',
                  month: 'long'
                })
              })}
            </span>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">{t('notes')}</p>
            <div className="flex flex-wrap gap-2">
              {perfume.notes.map((note) => (
                <Badge key={note} variant="secondary">
                  {t(`notes.${note}`)}
                </Badge>
              ))}
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            {t('inStock', { count: 5 })}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

