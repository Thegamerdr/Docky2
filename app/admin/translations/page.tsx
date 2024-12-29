import { Metadata } from 'next'
import { TranslationStatus } from '@/components/TranslationStatus'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Globe, Upload, Download, RefreshCw } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Translation Management',
  description: 'Manage and monitor translation progress for the application'
}

export default function TranslationsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Translation Management</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" onClick={() => window.open('https://crowdin.com/project/perfume-marketplace', '_blank')}>
              <Globe className="mr-2 h-4 w-4" />
              Open Crowdin Project
            </Button>
            <Button className="w-full" onClick={() => fetch('/api/translations/sync')}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Sync Translations
            </Button>
            <Button className="w-full" onClick={() => fetch('/api/translations/upload')}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Source Files
            </Button>
            <Button className="w-full" onClick={() => fetch('/api/translations/download')}>
              <Download className="mr-2 h-4 w-4" />
              Download Translations
            </Button>
          </CardContent>
        </Card>

        <TranslationStatus />
      </div>
    </div>
  )
}

