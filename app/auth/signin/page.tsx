'use client'

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="p-8 bg-card rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <Button onClick={() => signIn('google', { callbackUrl: '/' })}>
          Sign in with Google
        </Button>
      </div>
    </div>
  )
}

