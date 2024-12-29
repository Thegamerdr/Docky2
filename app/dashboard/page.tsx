import { Suspense } from 'react'
import { Metadata } from 'next'
import { Layout } from '@/components/Layout'
import DashboardClient from '@/components/DashboardClient'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Manage your perfume collection and preferences',
}

export default function DashboardPage() {
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <DashboardClient />
      </Suspense>
    </Layout>
  )
}

