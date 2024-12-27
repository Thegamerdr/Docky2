'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface LiveCodeEditorProps {
  initialCode: string
  onCodeChange: (code: string) => void
}

export default function LiveCodeEditor({ initialCode, onCodeChange }: LiveCodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [preview, setPreview] = useState('')

  useEffect(() => {
    updatePreview(code)
  }, [code])

  const updatePreview = (newCode: string) => {
    try {
      const previewElement = document.createElement('div')
      previewElement.innerHTML = newCode
      setPreview(previewElement.innerHTML)
      onCodeChange(newCode)
    } catch (error) {
      console.error('Error updating preview:', error)
      setPreview('<p>Error rendering preview</p>')
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <Textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="font-mono text-sm h-48"
        placeholder="Enter HTML code here..."
      />
      <Card>
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div dangerouslySetInnerHTML={{ __html: preview }} />
        </CardContent>
      </Card>
    </div>
  )
}

