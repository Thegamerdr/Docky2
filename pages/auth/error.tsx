import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'

export default function AuthError() {
  const router = useRouter()
  const { error } = router.query

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="p-8 bg-card rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-6">Authentication Error</h1>
        <p className="mb-6">
          {error === 'AccessDenied'
            ? 'You do not have permission to sign in.'
            : 'An error occurred during authentication.'}
        </p>
        <Button onClick={() => router.push('/')}>
          Return to Home
        </Button>
      </div>
    </div>
  )
}

