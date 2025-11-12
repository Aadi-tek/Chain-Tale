"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"

interface NewStoryFormProps {
  onSubmit: (title: string, seedSentence: string, tag: string) => void
  onCancel: () => void
}

export function NewStoryForm({ onSubmit, onCancel }: NewStoryFormProps) {
  const [title, setTitle] = useState("")
  const [seedSentence, setSeedSentence] = useState("")
  const [tag, setTag] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim() && seedSentence.trim() && tag.trim()) {
      onSubmit(title.trim(), seedSentence.trim(), tag.trim())
      setTitle("")
      setSeedSentence("")
      setTag("")
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5 text-primary" />
          <CardTitle>Start a New Story Chain</CardTitle>
        </div>
        <CardDescription>
          Begin a collaborative story with a seed sentence and tag for the next contributor
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Story Title</Label>
            <Input
              id="title"
              placeholder="Give your story a compelling title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seedSentence">Opening Sentence</Label>
            <Textarea
              id="seedSentence"
              placeholder="Write the first sentence of your story..."
              value={seedSentence}
              onChange={(e) => setSeedSentence(e.target.value)}
              rows={3}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tag">Next Tag</Label>
            <Input
              id="tag"
              placeholder="Enter a tag for the next contributor to build upon..."
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              The next contributor must include this word or concept in their sentence
            </p>
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="submit" className="flex-1">
              Start Story Chain
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
