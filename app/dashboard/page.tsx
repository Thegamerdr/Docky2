import dynamic from 'next/dynamic'
import Loading from './loading'
import { ErrorHandler } from '@/components/ErrorHandler'

const DashboardClient = dynamic(() => import('@/components/DashboardClient'), {
  loading: () => <Loading />,
  ssr: false
})

export default function Dashboard() {
  return (
    <ErrorHandler error={null}>
      <DashboardClient />
    </ErrorHandler>
  )
}

