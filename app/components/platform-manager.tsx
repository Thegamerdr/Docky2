"use client"

import { useState } from "react"
import { Plus, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"

type Platform = {
  id: string;
  name: string;
  connected: boolean;
}

type PlatformManagerProps = {
  connectedPlatforms: string[];
  setConnectedPlatforms: React.Dispatch<React.SetStateAction<string[]>>;
}

const initialPlatforms: Platform[] = [
  { id: "google", name: "Google Shopping", connected: false },
  { id: "amazon", name: "Amazon", connected: false },
  { id: "alibaba", name: "Alibaba", connected: false },
  { id: "ebay", name: "eBay", connected: false },
  { id: "walmart", name: "Walmart", connected: false },
]

export function PlatformManager({ connectedPlatforms, setConnectedPlatforms }: PlatformManagerProps) {
  const [platforms, setPlatforms] = useState<Platform[]>(initialPlatforms)
  const [isConnecting, setIsConnecting] = useState(false)
  const { toast } = useToast()

  const togglePlatform = async (id: string) => {
    setIsConnecting(true)
    try {
      if (id === 'google') {
        const response = await fetch('/api/google-shopping?query=perfume')
        if (!response.ok) {
          throw new Error('Failed to connect to Google Shopping API')
        }
        // If successful, update the platform state
        setPlatforms(prev => 
          prev.map(p => 
            p.id === id ? { ...p, connected: !p.connected } : p
          )
        )
        setConnectedPlatforms(prev => 
          
prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        )
        toast({
          title: "Platform Connected",
          description: `Google Shopping has been successfully connected.`,
        })
      } else {
        // For other platforms, we'll keep the mock connection for now
        await new Promise(resolve => setTimeout(resolve, 1000))
        setPlatforms(prev => 
          prev.map(p => 
            p.id === id ? { ...p, connected: !p.connected } : p
          )
        )
        setConnectedPlatforms(prev => 
          prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        )
        toast({
          title: "Platform Updated",
          description: `${platforms.find(p => p.id === id)?.name} has been ${connectedPlatforms.includes(id) ? 'disconnected' : 'connected'}.`,
        })
      }
    } catch (error) {
      console.error('Error connecting to platform:', error)
      toast({
        title: "Connection Failed",
        description: `Failed to connect to ${platforms.find(p => p.id === id)?.name}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const addNewPlatform = () => {
    const newPlatform = { id: `platform-${platforms.length + 1}`, name: `New Platform ${platforms.length + 1}`, connected: false }
    setPlatforms(prev => [...prev, newPlatform])
    toast({
      title: "New Platform Added",
      description: `${newPlatform.name} has been added to your platforms.`,
    })
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>E-commerce Platforms</CardTitle>
        <CardDescription>Manage your connected platforms</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[120px] w-full">
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <Badge
                key={platform.id}
                variant={platform.connected ? "default" : "outline"}
                className="flex items-center gap-1 cursor-pointer"
              >
                {platform.name}
                <Switch
                  checked={platform.connected}
                  onCheckedChange={() => togglePlatform(platform.id)}
                  disabled={isConnecting}
                />
                {isConnecting && <Loader2 className="h-4 w-4 animate-spin" />}
              </Badge>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={addNewPlatform}>
          <Plus className="mr-2 h-4 w-4" /> Add New Platform
        </Button>
      </CardFooter>
    </Card>
  )
}

