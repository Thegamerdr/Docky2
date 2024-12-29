import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Layout } from '@/components/Layout'
import { HeroSearch } from '@/components/HeroSearch'

const DynamicFeaturedComparisons = dynamic(() => import('@/components/FeaturedComparisons'), {
  loading: () => <p>Loading comparisons...</p>,
})

const DynamicFeatures = dynamic(() => import('@/components/Features'), {
  loading: () => <p>Loading features...</p>,
})

export const metadata: Metadata = {
  title: 'PerfumeVS - Compare and Discover Fragrances',
  description: 'Find your perfect scent match with PerfumeVS. Compare perfumes side by side and discover new fragrances.',
  openGraph: {
    title: 'PerfumeVS - Compare and Discover Fragrances',
    description: 'Find your perfect scent match with PerfumeVS. Compare perfumes side by side and discover new fragrances.',
  },
}

export default function Home() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-100 via-purple-100 to-pink-100">
        <HeroSearch />
        <DynamicFeaturedComparisons />
        <DynamicFeatures />
      </div>
    </Layout>
  )
}

