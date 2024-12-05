"use client"

import { useState, useEffect } from "react"
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
  { id: "google", name: "Google Shopping", connected: true },
  { id: "amazon", name: "Amazon", connected: true },
  { id: "alibaba", name: "Alibaba", connected: true },
  { id: "ebay", name: "eBay", connected: true },
  { id: "walmart", name: "Walmart", connected: true },
]

export function PlatformManager({ connectedPlatforms, setConnectedPlatforms }: PlatformManagerProps) {
  const [platforms, setPlatforms] = useState<Platform[]>(initialPlatforms)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setConnectedPlatforms(platforms.filter(p => p.connected).map(p => p.id))
  }, [platforms, setConnectedPlatforms])

  const togglePlatform = async (id: string) => {
    setIsLoading(true)
    try {
      setPlatforms(prev => 
        prev.map(p => 
          p.id === id ? { ...p, connected: !p.connected } : p
        )
      )
      toast({
        title: "Platform Updated",
        description: `${platforms.find(p => p.id === id)?.name} has been ${platforms.find(p => p.id === id)?.connected ? 'disconnected' : 'connected'}.`,
      })
    } catch (error) {
      console.error('Error toggling platform:', error)
      toast({
        title: "Error",
        description: "An error occurred while updating the platform.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
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
        {isLoading ? (
          <div className="flex justify-center items-center h-[120px]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
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
                    disabled={isLoading || platform.id === 'google'}
                  />
                </Badge>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={addNewPlatform}>
          <Plus className="mr-2 h-4 w-4" /> Add New Platform
        </Button>
      </CardFooter>
    </Card>
  )
}

