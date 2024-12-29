import { Suspense } from 'react'
import { Metadata } from 'next'
import { Layout } from '@/components/Layout'
import { AdvancedSearch } from '@/components/AdvancedSearch'
import { PerfumeList } from '@/components/PerfumeList'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export const metadata: Metadata = {
  title: 'Browse Perfumes',
  description: 'Explore our extensive collection of perfumes. Use our advanced search to find your perfect scent.',
}

export default function BrowsePage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-teal-800">Browse Perfumes</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-teal-700">Advanced Search</h2>
            <Suspense fallback={<LoadingSpinner />}>
              <AdvancedSearch />
            </Suspense>
          </div>
          
          <div className="md:col-span-3">
            <Suspense fallback={<LoadingSpinner />}>
              <PerfumeList />
            </Suspense>
          </div>
        </div>
      </div>
    </Layout>
  )
}

