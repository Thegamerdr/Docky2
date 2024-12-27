'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'
import { logger } from '@/utils/logger'
import { ErrorHandler } from '@/components/ErrorHandler'

export function AuthStatus() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <Button disabled><Loader2 className="mr-2 h-4 w-4 animate-spin" />Loading...</Button>
  }

  if (status === "unauthenticated") {
    return (
      <Button onClick={() => signIn()}>Sign in</Button>
    )
  }

  if (status === "authenticated" && session?.user) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm">Signed in as {session.user.email}</span>
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
    )
  }

  // If we reach here, something unexpected happened
  const error = new Error("Unexpected authentication state")
  logger.error("Unexpected authentication state in AuthStatus component", { status, session })
  return <ErrorHandler error={error} />
}

