'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'

export function AuthStatus() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <Button disabled><Loader2 className="mr-2 h-4 w-4 animate-spin" />Loading...</Button>
  }

  if (status === "authenticated" && session?.user) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm">Signed in as {session.user.email}</span>
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
    )
  }

  return (
    <Button onClick={() => signIn()}>Sign in</Button>
  )
}

