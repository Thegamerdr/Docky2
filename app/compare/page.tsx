import { Metadata } from 'next'
import { Layout } from '@/components/Layout'
import { ComparisonContent } from '@/components/ComparisonContent'
import { getPerfumes } from '@/lib/api'

export async function generateMetadata({ searchParams }: { searchParams: { ids: string } }): Promise<Metadata> {
  const ids = searchParams.ids?.split(',') || []
  const perfumes = await getPerfumes(ids.join(','))
  const perfumeNames = perfumes.map(p => p.name).join(' vs ')

  return {
    title: `Compare: ${perfumeNames}`,
    description: `Side-by-side comparison of ${perfumeNames}. Compare scents, prices, and ratings to find your perfect fragrance.`,
    openGraph: {
      title: `Compare: ${perfumeNames} | PerfumeVS`,
      description: `Side-by-side comparison of ${perfumeNames}. Compare scents, prices, and ratings to find your perfect fragrance.`,
    },
  }
}

export default function ComparePage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Perfume Comparison</h1>
        <ComparisonContent />
      </div>
    </Layout>
  )
}

