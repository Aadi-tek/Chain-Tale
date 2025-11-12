"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StorySentence } from "../story/story-sentence"
import { ArrowLeft, Calendar, Users, BookOpen, Share2, Download } from "lucide-react"

// Mock archived story data
const mockArchivedStory = {
  id: "archived-1",
  title: "The Mysterious Library",
  createdAt: new Date("2024-01-15"),
  completedAt: new Date("2024-01-22"),
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
    {
      id: "5",
      sentence:
        "The ancient tomes whispered secrets of forgotten realms as Emma walked deeper into the magical library.",
      author: "David Kim",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      tag: "discovery",
      timestamp: new Date("2024-01-17T11:20:00"),
    },
    {
      id: "6",
      sentence:
        "Her discovery of a glowing book titled 'The Chronicles of Tomorrow' would change everything she thought she knew about reality.",
      author: "Maria Santos",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      tag: "transformation",
      timestamp: new Date("2024-01-18T15:45:00"),
    },
    {
      id: "7",
      sentence:
        "As the transformation began, Emma realized she was no longer just a reader, but had become part of the story itself.",
      author: "James Wilson",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      tag: "ending",
      timestamp: new Date("2024-01-19T09:30:00"),
    },
  ],
}

interface ArchivedStoryViewerProps {
  storyId: string
  onBack: () => void
}

export function ArchivedStoryViewer({ storyId, onBack }: ArchivedStoryViewerProps) {
  const [story] = useState(mockArchivedStory)

  const contributorCount = new Set(story.sentences.map((s) => s.author)).size
  const allTags = story.sentences.map((s) => s.tag)

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/archive/${storyId}`)
  }

  const handleDownload = () => {
    const storyText = story.sentences.map((s, i) => `${i + 1}. ${s.sentence} (by ${s.author})`).join("\n\n")

    const fullText = `${story.title}\n\nCompleted: ${story.completedAt.toLocaleDateString()}\nContributors: ${contributorCount}\n\n${storyText}`

    const blob = new Blob([fullText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${story.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Archives
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">Archived</Badge>
                  <Badge variant="secondary">Completed Story</Badge>
                </div>
                <CardTitle className="text-2xl mb-2">{story.title}</CardTitle>
                <CardDescription>
                  Started {story.createdAt.toLocaleDateString()} • Completed {story.completedAt.toLocaleDateString()}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
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
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm">7 days duration</span>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Story Tags:</h4>
              <div className="flex flex-wrap gap-1">
                {allTags.map((tag, index) => (
                  <Badge key={`${tag}-${index}`} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Complete Story */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Complete Story</h2>

        {story.sentences.map((sentence, index) => (
          <StorySentence key={sentence.id} {...sentence} isLatest={false} />
        ))}

        <Card className="bg-accent/10 border-accent">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-accent-foreground">
              <BookOpen className="h-4 w-4" />
              <span className="font-medium text-sm">Story Complete</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              This story chain was completed on {story.completedAt.toLocaleDateString()} and has been archived for
              posterity.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
