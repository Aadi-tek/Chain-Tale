"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Lightbulb } from "lucide-react"

interface ContributionFormProps {
  requiredTag: string
  onSubmit: (sentence: string) => void
  isSubmitting?: boolean
}

export function ContributionForm({ requiredTag, onSubmit, isSubmitting = false }: ContributionFormProps) {
  const [sentence, setSentence] = useState("")
  const [wordCount, setWordCount] = useState(0)

  const handleSentenceChange = (value: string) => {
    setSentence(value)
    setWordCount(
      value
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length,
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (sentence.trim() && containsRequiredTag(sentence, requiredTag)) {
      onSubmit(sentence.trim())
      setSentence("")
      setWordCount(0)
    }
  }

  const containsRequiredTag = (text: string, tag: string): boolean => {
    const lowerText = text.toLowerCase()
    const lowerTag = tag.toLowerCase()
    return lowerText.includes(lowerTag)
  }

  const isTagIncluded = containsRequiredTag(sentence, requiredTag)
  const canSubmit = sentence.trim().length > 0 && isTagIncluded

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5 text-primary" />
          Add Your Sentence
        </CardTitle>
        <CardDescription>Continue the story by incorporating the required tag into your sentence</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="sentence">Your Contribution</Label>
              <div className="flex items-center gap-2">
                <Badge variant={isTagIncluded ? "default" : "destructive"} className="text-xs">
                  Must include: "{requiredTag}"
                </Badge>
              </div>
            </div>
            <Textarea
              id="sentence"
              placeholder={`Write your sentence here... (remember to include "${requiredTag}")`}
              value={sentence}
              onChange={(e) => handleSentenceChange(e.target.value)}
              rows={4}
              className={`resize-none ${!isTagIncluded && sentence.length > 0 ? "border-destructive" : ""}`}
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{wordCount} words</span>
              {!isTagIncluded && sentence.length > 0 && (
                <span className="text-destructive">Tag "{requiredTag}" not found</span>
              )}
            </div>
          </div>

          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <div className="text-sm">
                <p className="font-medium mb-1">Writing Tips:</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Build naturally on the previous sentence</li>
                  <li>• Use "{requiredTag}" creatively in your narrative</li>
                  <li>• Keep the story's tone and style consistent</li>
                </ul>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={!canSubmit || isSubmitting}>
            {isSubmitting ? "Adding to Story..." : "Add to Story"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
