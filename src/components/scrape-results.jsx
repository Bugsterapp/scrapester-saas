'use client'

import { Download, Copy } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import ReactMarkdown from 'react-markdown'

export function ScrapeResults({ data }) {
  const responseData = data.data;

  // Crear objeto JSON formateado para mostrar
  const jsonData = {
    url: responseData.url,
    metadata: responseData.metadata,
    timestamp: responseData.timestamp
  }

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'scapester-scrape-results.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Scrape Results</h2>
        <Button 
          variant="outline" 
          onClick={handleDownload}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download JSON
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <Tabs defaultValue="markdown" className="w-full">
            <TabsList>
              <TabsTrigger value="markdown">Markdown</TabsTrigger>
              <TabsTrigger value="json">JSON</TabsTrigger>
            </TabsList>
            <TabsContent value="markdown">
              <div className="relative">
                <div className="bg-secondary p-4 rounded-md overflow-x-auto">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown>{responseData.markdown}</ReactMarkdown>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => handleCopy(responseData.markdown)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="json">
              <div className="relative">
                <pre className="bg-secondary p-4 rounded-md overflow-x-auto">
                  <code className="text-sm font-mono">
                    {JSON.stringify(jsonData, null, 2)}
                  </code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => handleCopy(JSON.stringify(jsonData, null, 2))}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}