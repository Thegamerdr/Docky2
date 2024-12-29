'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { SideBySideComparison } from '@/components/SideBySideComparison'
import { getPerfumes } from '@/lib/api'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useToast } from '@/components/ui/use-toast'

export function ComparisonContent() {
  const [perfumes, setPerfumes] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const t = useTranslations('compare')
  const { toast } = useToast()

  useEffect(() => {
    const fetchPerfumes = async () => {
      const perfumeIds = searchParams.get('ids')?.split(',') || []
      if (perfumeIds.length > 0) {
        try {
          const fetchedPerfumes = await getPerfumes(perfumeIds.join(','))
          setPerfumes(fetchedPerfumes)
        } catch (error) {
          console.error('Error fetching perfumes:', error)
          toast({
            title: "Error",
            description: "Failed to load perfumes for comparison. Please try again.",
            variant: "destructive",
          })
        }
      }
      setIsLoading(false)
    }

    fetchPerfumes()
  }, [searchParams, toast])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <LoadingSpinner />
      </div>
    )
  }

  if (perfumes.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">{t('noPerfumesSelected')}</h2>
        <p>{t('selectPerfumesPrompt')}</p>
      </div>
    )
  }

  return <SideBySideComparison perfumes={perfumes} />
}

