import { Suspense } from 'react'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import SearchInterface from '@/components/SearchInterface'
import { ResourceBlockerNotice } from '@/components/ResourceBlockerNotice'
import Loading from './loading'
import dynamic from 'next/dynamic'

const ClientHome = dynamic(() => import('@/components/ClientHome'), { 
  loading: () => <Loading />,
  ssr: false 
})

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <ClientHome>
        <div className="min-h-screen bg-background">
          <ResourceBlockerNotice />
          <Header />
          <Hero />
          <SearchInterface />
        </div>
      </ClientHome>
    </Suspense>
  )
}

