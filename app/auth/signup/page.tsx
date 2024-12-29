import { Suspense } from 'react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { SignUpForm } from '@/components/auth/SignUpForm'

export default function SignUpPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SignUpForm />
    </Suspense>
  )
}

