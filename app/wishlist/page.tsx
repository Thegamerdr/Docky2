import { Suspense } from 'react'
import { Metadata } from 'next'
import { Layout } from '@/components/Layout'
import { WishlistContent } from '@/components/WishlistContent'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export const metadata: Metadata = {
  title: 'Your Wishlist',
  description: 'View and manage your saved perfumes. Compare your favorite scents and make informed decisions.',
}

export default function WishlistPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-teal-800">Your Wishlist</h1>
        <Suspense fallback={<LoadingSpinner />}>
          <WishlistContent />
        </Suspense>
      </div>
    </Layout>
  )
}

