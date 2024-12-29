import { Suspense } from 'react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { SignInForm } from '@/components/auth/SignInForm'

export default function SignInPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SignInForm />
    </Suspense>
  )
}

