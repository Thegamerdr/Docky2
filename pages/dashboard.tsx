import { useSession } from 'next-auth/react'
import { useState, useTransition, Suspense } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PerfumeList } from '@/components/PerfumeList'
import { LoadingSpinner } from '@/components/LoadingSpinner'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const [searchTerm, setSearchTerm] = useState('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  if (status === 'loading') {
    return <LoadingSpinner />
  }

  if (status === 'unauthenticated') {
    router.push('/api/auth/signin')
    return null
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    startTransition(() => {
      // Perform search operation here
      console.log('Searching for:', value)
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {session?.user?.name}</h1>
      <Input
        type="text"
        placeholder="Search perfumes..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4"
      />
      {isPending && <p>Updating list...</p>}
      <Suspense fallback={<LoadingSpinner />}>
        <PerfumeList searchTerm={searchTerm} />
      </Suspense>
      <Button onClick={() => router.push('/api/auth/signout')}>Sign out</Button>
    </div>
  )
}

