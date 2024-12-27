import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { fetchPerfumes } from '@/lib/api'
import { PerfumeData } from '@/types/perfume'

export function useAuthenticatedData() {
  const [perfumes, setPerfumes] = useState<PerfumeData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/api/auth/signin')
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      if (status === 'authenticated') {
        try {
          const data = await fetchPerfumes()
          setPerfumes(data)
        } catch (err) {
          setError(err instanceof Error ? err : new Error('An error occurred'))
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchData()
  }, [status])

  return { session, status, perfumes, isLoading, error }
}

