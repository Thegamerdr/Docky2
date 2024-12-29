import { Suspense } from 'react'
import { Metadata } from 'next'
import { Layout } from '@/components/Layout'
import { ComparisonContent } from '@/components/ComparisonContent'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export const metadata: Metadata = {
  title: 'Compare Perfumes',
  description: 'Compare different perfumes side by side',
}

export default function ComparePage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Perfume Comparison</h1>
        <Suspense fallback={<LoadingSpinner />}>
          <ComparisonContent />
        </Suspense>
      </div>
    </Layout>
  )
}

