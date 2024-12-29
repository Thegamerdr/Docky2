'use client'

import { useState, useEffect, useCallback } from 'react'
import { PerfumeCard } from '@/components/PerfumeCard'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useToast } from '@/components/ui/use-toast'
import { useInView } from 'react-intersection-observer'
import { ErrorHandler } from '@/components/ErrorHandler'
import { logger } from '@/utils/logger'

interface Perfume {
  id: string
  name: string
  brand: string
  price?: number
  rating?: number
  notes?: string[]
  concentration?: string
  image?: string
}

const ITEMS_PER_PAGE = 12

export function PerfumeList() {
  const [perfumes, setPerfumes] = useState<Perfume[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [selectedPerfumes, setSelectedPerfumes] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const { toast } = useToast()

  const { ref, inView } = useInView({
    threshold: 0,
  })

  const fetchPerfumes = useCallback(async () => {
    try {
      const response = await fetch(`/api/perfumes?page=${page}&limit=${ITEMS_PER_PAGE}`)
      if (!response.ok) {
        throw new Error('Failed to fetch perfumes')
      }
      const data = await response.json()
      setPerfumes(prevPerfumes => [...prevPerfumes, ...data])
      setHasMore(data.length === ITEMS_PER_PAGE)
      setPage(prevPage => prevPage + 1)
    } catch (error) {
      logger.error('Error fetching perfumes:', error)
      setError(error instanceof Error ? error : new Error('An unknown error occurred'))
      toast({
        title: "Error",
        description: "Failed to load perfumes. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [page, toast])

  useEffect(() => {
    fetchPerfumes()
  }, [fetchPerfumes])

  useEffect(() => {
    if (inView && hasMore) {
      fetchPerfumes()
    }
  }, [inView, hasMore, fetchPerfumes])

  const togglePerfumeSelection = (perfumeId: string) => {
    setSelectedPerfumes(prev =>
      prev.includes(perfumeId)
        ? prev.filter(id => id !== perfumeId)
        : [...prev, perfumeId]
    )
  }

  if (isLoading && perfumes.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return <ErrorHandler error={error} />
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {perfumes.map(perfume => (
          <PerfumeCard
            key={perfume.id}
            perfume={perfume}
            isSelected={selectedPerfumes.includes(perfume.id)}
            onSelect={() => togglePerfumeSelection(perfume.id)}
          />
        ))}
      </div>
      {hasMore && (
        <div ref={ref} className="flex justify-center mt-8">
          <LoadingSpinner />
        </div>
      )}
      {selectedPerfumes.length > 0 && (
        <div className="mt-6 text-center">
          <Link href={`/compare?ids=${selectedPerfumes.join(',')}`} passHref>
            <Button className="bg-teal-500 hover:bg-teal-600 text-white">
              Compare Selected ({selectedPerfumes.length})
            </Button>
          </Link>
        </div>
      )}
    </>
  )
}

