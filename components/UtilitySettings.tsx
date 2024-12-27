'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface UtilitySettingsProps {
  onClose: () => void
}

export default function UtilitySettings({ onClose }: UtilitySettingsProps) {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [autoUpdate, setAutoUpdate] = useState(false)
  const [refreshRate, setRefreshRate] = useState('30')

  useEffect(() => {
    const savedSettings = localStorage.getItem('utilitySettings')
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings)
      setDarkMode(parsedSettings.darkMode)
      setNotifications(parsedSettings.notifications)
      setAutoUpdate(parsedSettings.autoUpdate)
      setRefreshRate(parsedSettings.refreshRate)
    }
  }, [])

  useEffect(() => {
    const settings = { darkMode, notifications, autoUpdate, refreshRate }
    localStorage.setItem('utilitySettings', JSON.stringify(settings))

    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode, notifications, autoUpdate, refreshRate])

  return (
    <Card className="fixed inset-y-0 right-0 w-96 z-50 flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex justify-between items-center">
          Utility Settings
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">Notifications</Label>
            <Switch
              id="notifications"
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-update">Auto Update</Label>
            <Switch
              id="auto-update"
              checked={autoUpdate}
              onCheckedChange={setAutoUpdate}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="refresh-rate">Refresh Rate (seconds)</Label>
            <Select value={refreshRate} onValueChange={setRefreshRate}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select refresh rate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 seconds</SelectItem>
                <SelectItem value="30">30 seconds</SelectItem>
                <SelectItem value="60">1 minute</SelectItem>
                <SelectItem value="300">5 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

