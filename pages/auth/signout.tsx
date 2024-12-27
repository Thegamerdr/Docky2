import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export default function SignOut() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="p-8 bg-card rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-6">Sign Out</h1>
        <p className="mb-6">Are you sure you want to sign out?</p>
        <Button onClick={() => signOut({ callbackUrl: '/' })}>
          Yes, Sign Out
        </Button>
      </div>
    </div>
  )
}

