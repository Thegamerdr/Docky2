'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'

interface FileEditorProps {
  onClose: () => void
  initialContent: string
  filePath: string
  onSave: (content: string) => void
}

export default function FileEditor({ onClose, initialContent, filePath, onSave }: FileEditorProps) {
  const [content, setContent] = useState(initialContent)
  const { toast } = useToast()

  const handleSave = () => {
    onSave(content)
    toast({
      title: 'File Saved',
      description: `Changes to ${filePath} have been saved.`,
    })
  }

  return (
    <Card className="fixed inset-y-0 right-0 w-96 z-50 flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex justify-between items-center">
          Editing: {filePath}
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-grow mb-4"
        />
        <Button onClick={handleSave}>Save Changes</Button>
      </CardContent>
    </Card>
  )
}

