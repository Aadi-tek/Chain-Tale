"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StorySentence } from "./story-sentence"
import { ContributionForm } from "./contribution-form"
import { ArrowLeft, Clock, Users, BookOpen, Share2 } from "lucide-react"

// Mock story data with category
const mockStory = {
  id: "1",
  title: "The Mysterious Library",
  category: "mystery",
  difficulty: "beginner",
  createdAt: new Date("2024-01-15"),
  expiresAt: new Date("2024-01-22"),
  sentences: [
    {
      id: "1",
      sentence: "The old library stood at the end of Maple Street, its windows glowing with an otherworldly light.",
      author: "Sarah Chen",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      tag: "mysterious",
      timestamp: new Date("2024-01-15T10:00:00"),
    },
    {
      id: "2",
      sentence:
        "As Emma approached the mysterious building, she noticed the books inside seemed to be moving on their own.",
      author: "Mike Rodriguez",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      tag: "whispers",
      timestamp: new Date("2024-01-15T14:30:00"),
    },
    {
      id: "3",
      sentence:
        "She pressed her ear to the door and heard faint whispers calling her name from within the ancient walls.",
      author: "Alex Thompson",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      tag: "courage",
      timestamp: new Date("2024-01-16T09:15:00"),
    },
    {
      id: "4",
      sentence:
        "Summoning her courage, Emma pushed open the heavy wooden door and stepped into a world where stories came alive.",
      author: "Lisa Park",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      tag: "ancient",
      timestamp: new Date("2024-01-16T16:45:00"),
    },
  ],
}

interface StoryViewerProps {
  storyId: string
  onBack: () => void
}

export function StoryViewer({ storyId, onBack }: StoryViewerProps) {
  const [story, setStory] = useState(mockStory)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentTag = story.sentences[story.sentences.length - 1]?.tag || ""
  const timeRemaining = Math.ceil((story.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  const contributorCount = new Set(story.sentences.map((s) => s.author)).size

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      mystery: "bg-purple-100 text-purple-800",
      romantic: "bg-pink-100 text-pink-800",
      suspense: "bg-red-100 text-red-800",
      thriller: "bg-orange-100 text-orange-800",
      fantasy: "bg-blue-100 text-blue-800",
      "sci-fi": "bg-cyan-100 text-cyan-800",
      adventure: "bg-green-100 text-green-800",
      drama: "bg-indigo-100 text-indigo-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  const handleContribution = async (sentence: string) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newSentence = {
      id: Date.now().toString(),
      sentence,
      author: "You", // In real app, this would be the current user
      authorAvatar: "/placeholder.svg?height=32&width=32",
      tag: "mystery", // In real app, user would specify the next tag
      timestamp: new Date(),
    }

    setStory((prev) => ({
      ...prev,
      sentences: [...prev.sentences, newSentence],
    }))

    setIsSubmitting(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Stories
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{story.title}</CardTitle>
                <CardDescription>
                  A collaborative story chain • Started {story.createdAt.toLocaleDateString()}
                </CardDescription>
                <div className="flex gap-2 mt-3">
                  <Badge className={`capitalize ${getCategoryColor(story.category)}`}>{story.category}</Badge>
                  <Badge variant="outline" className="capitalize">
                    {story.difficulty}
                  </Badge>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm">{contributorCount} contributors</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="text-sm">{story.sentences.length} sentences</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm">{timeRemaining} days remaining</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Story Content */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Story Chain</h2>
            <Badge variant="secondary">Next tag: {currentTag}</Badge>
          </div>

          {story.sentences.map((sentence, index) => (
            <StorySentence key={sentence.id} {...sentence} isLatest={index === story.sentences.length - 1} />
          ))}
        </div>

        {/* Contribution Form */}
        <div className="lg:col-span-1">
          <ContributionForm requiredTag={currentTag} onSubmit={handleContribution} isSubmitting={isSubmitting} />
        </div>
      </div>
    </div>
  )
}
