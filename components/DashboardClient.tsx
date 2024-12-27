'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { fetchPerfumes } from '@/lib/api'
import { PerfumeData } from '@/types/perfume'
import ClientHome from './ClientHome'
import { useToast } from '@/components/ui/use-toast'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { LoadingState } from '@/components/LoadingState'
import { ErrorHandler } from '@/components/ErrorHandler'

export default function DashboardClient() {
  const [perfumes, setPerfumes] = useState<PerfumeData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin')
    } else if (status === 'authenticated') {
      loadData()
    }
  }, [status, router])

  async function loadData(query?: string) {
    try {
      setIsLoading(true)
      setError(null)
      const data = await fetchPerfumes(query)
      setPerfumes(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch perfume data'))
      toast({
        title: 'Error',
        description: 'Failed to fetch perfume data',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    loadData(searchQuery)
  }

  if (status === 'loading') {
    return <LoadingState />
  }

  if (status === 'unauthenticated') {
    return null // The useEffect will redirect to sign in
  }

  return (
    <ClientHome>
      <h1 className="text-3xl font-bold mb-8">Perfume Marketplace Dashboard</h1>
      
      {session && session.user && (
        <p className="mb-4">Welcome, {session.user.name || session.user.email}</p>
      )}
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search perfumes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit">Search</Button>
        </div>
      </form>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <Skeleton className="h-48 w-full mb-4" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          ))}
        </div>
      ) : error ? (
        <ErrorHandler error={error} />
      ) : perfumes.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-xl font-semibold">No perfumes available</p>
          <p className="text-muted-foreground mt-2">Try adjusting your search or check back later for updates.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {perfumes.map((perfume) => (
            <div key={perfume.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="relative h-48 mb-4">
                <Image
                  src={perfume.image}
                  alt={perfume.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2">{perfume.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">By {perfume.brand}</p>
              <p className="text-lg font-bold mb-2">${perfume.price.toFixed(2)}</p>
              <div className="flex items-center mb-2">
                <span className="text-yellow-400 mr-1">★</span>
                <span>{perfume.rating.toFixed(1)}</span>
              </div>
              <p className="text-sm mb-2">{perfume.description}</p>
              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-1">Notes:</h3>
                <div className="flex flex-wrap gap-1">
                  {perfume.notes.map((note, index) => (
                    <span key={index} className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </ClientHome>
  )
}

