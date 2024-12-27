import { SessionDebugger } from '@/components/SessionDebugger'
import { AuthWrapper } from '@/components/AuthWrapper'

export default function DebugPage() {
  return (
    <AuthWrapper>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Session Debug Page</h1>
        <SessionDebugger />
      </div>
    </AuthWrapper>
  )
}

