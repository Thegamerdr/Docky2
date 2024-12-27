'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'

export function SessionDebugger() {
  const sessionInfo = useSession()

  useEffect(() => {
    console.log('Session Info:', sessionInfo)
  }, [sessionInfo])

  const handleRefreshSession = async () => {
    try {
      await sessionInfo.update()
      toast({
        title: "Session Refreshed",
        description: "Your session has been successfully refreshed.",
      })
    } catch (error) {
      console.error('Failed to refresh session:', error)
      toast({
        title: "Refresh Failed",
        description: "Failed to refresh your session. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Session Debugger</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="bg-muted p-4 rounded-md overflow-auto max-h-60">
          {JSON.stringify(sessionInfo, null, 2)}
        </pre>
        <div className="mt-4 flex justify-between">
          <Button onClick={handleRefreshSession}>Refresh Session</Button>
          <Button variant="outline" onClick={() => console.log('Current Session:', sessionInfo)}>
            Log Session to Console
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

