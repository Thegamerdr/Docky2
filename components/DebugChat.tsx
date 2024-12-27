'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { X, Send, Code, Bug, Trash, ChevronUp, ChevronDown, Globe, ExternalLink, Copy, FileIcon, FolderIcon, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/hooks/use-media-query'

// ... (previous interfaces remain unchanged)

export default function DebugChat({ onClose }: DebugChatProps) {
  // ... (previous state and functions remain unchanged)

  const renderMessage = (message: Message) => {
    const content = message.content.split('```')
    return (
      <div className="message-container space-y-2">
        <div className="text-xs text-muted-foreground">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
        {content.map((part, index) => {
          if (index % 2 === 1) {
            // Code block
            const [lang, ...code] = part.split('\n')
            const codeContent = code.join('\n')
            return (
              <div key={index} className="relative group">
                <pre 
                  className="bg-muted p-4 rounded-md overflow-x-auto cursor-pointer"
                  onClick={() => handleCodeClick(codeContent)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-xs text-muted-foreground">{lang || 'text'}</div>
                    <div className="space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleCodeExecution(codeContent)
                        }}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation()
                          copyToClipboard(codeContent)
                        }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <code>{codeContent}</code>
                </pre>
              </div>
            )
          } else {
            return part && <div key={index} className="whitespace-pre-wrap">{part}</div>
          }
        })}
      </div>
    )
  }

  const renderFileTree = (items: FileItem[], depth = 0) => {
    return (
      <ul className={cn("space-y-1", depth > 0 && "ml-4")}>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            {item.type === 'folder' ? (
              <FolderIcon className="h-4 w-4" />
            ) : (
              <FileIcon className="h-4 w-4" />
            )}
            <div
              className="cursor-pointer hover:text-blue-500"
              onClick={() => setSelectedFile(item)}
            >
              {item.name}
            </div>
          </li>
        ))}
      </ul>
    )
  }

  // ... (rest of the component remains unchanged)
}

