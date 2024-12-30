import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import Button from '@/components/Button'
import { Loader2 } from 'lucide-react'
import Card from '@/components/ui/card'

interface AuthWrapperProps {
  children: ReactNode
  requireAuth?: boolean
}

const LOADING_TEXT = "Loading...";
const SIGN_IN_PROMPT = "You need to be signed in to view this page";
const SIGN_IN_BUTTON_TEXT = "Sign In";

export function AuthWrapper({ children, requireAuth = false }: AuthWrapperProps) {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (requireAuth && status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router, requireAuth])

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2 text-lg">{LOADING_TEXT}</span>
      </div>
    )
  }

  if (requireAuth && status === 'unauthenticated') {
    return (
      <Card className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl mb-4">
          {SIGN_IN_PROMPT}
        </p>
        <Button onClick={() => router.push('/auth/signin')}>
          {SIGN_IN_BUTTON_TEXT}
        </Button>
      </Card>
    )
  }

  return <>{children}</>
}

