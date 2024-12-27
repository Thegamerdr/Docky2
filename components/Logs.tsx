'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { X, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { io, Socket } from 'socket.io-client'

interface LogsProps {
  onClose: () => void
}

interface LogEntry {
  message: string
  timestamp?: string
}

export default function Logs({ onClose }: LogsProps) {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [isReconnecting, setIsReconnecting] = useState(false)
  const logsEndRef = useRef<HTMLDivElement>(null)
  const socketRef = useRef<Socket | null>(null)
  const { toast } = useToast()

  const connectSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect()
    }

    setIsReconnecting(true)

    socketRef.current = io({
      path: '/api/socketio',
      addTrailingSlash: false,
    })

    socketRef.current.on('connect', () => {
      console.log('Connected to WebSocket')
      setIsConnected(true)
      setIsReconnecting(false)
      toast({
        title: 'Connected',
        description: 'Successfully connected to log stream.',
      })
    })

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from WebSocket')
      setIsConnected(false)
      toast({
        title: 'Disconnected',
        description: 'Lost connection to log stream. Attempting to reconnect...',
        variant: 'destructive',
      })
    })

    socketRef.current.on('connect_error', (error) => {
      console.error('Connection error:', error)
      setIsReconnecting(false)
      toast({
        title: 'Connection Error',
        description: `Failed to connect: ${error.message}`,
        variant: 'destructive',
      })
    })

    socketRef.current.on('log', (logData: string) => {
      console.log('Received log:', logData)
      try {
        const parsedLog: LogEntry = JSON.parse(logData)
        setLogs(prevLogs => [...prevLogs, parsedLog])
      } catch (error) {
        console.error('Error parsing log data:', error)
      }
    })
  }, [toast])

  useEffect(() => {
    connectSocket()

    return () => {
      console.log('Cleaning up WebSocket connection...')
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [connectSocket])

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  const handleReconnect = () => {
    connectSocket()
  }

  return (
    <Card className="fixed inset-y-0 right-0 w-96 z-50 flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex justify-between items-center">
          Live Logs {isConnected ? '(Connected)' : '(Disconnected)'}
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto">
        {logs.length === 0 ? (
          <div>No logs received yet. Waiting for data...</div>
        ) : (
          logs.map((log, index) => (
            <div key={index} className="mb-2 text-sm font-mono">
              {log.timestamp && `[${log.timestamp}] `}{log.message}
            </div>
          ))
        )}
        <div ref={logsEndRef} />
      </CardContent>
      {!isConnected && (
        <div className="p-4 border-t">
          <Button 
            onClick={handleReconnect} 
            className="w-full"
            disabled={isReconnecting}
          >
            {isReconnecting ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Reconnecting...
              </>
            ) : (
              'Reconnect'
            )}
          </Button>
        </div>
      )}
    </Card>
  )
}

