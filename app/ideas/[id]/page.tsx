"use client"

import type React from "react"

import { useState } from "react"
import { PageHeader } from "@/components/layout/page-header"
import { IdeaResponse } from "@/components/ideas/idea-response"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, MessageCircle, CheckCircle } from "lucide-react"

// Mock data
const mockIdeaRequest = {
  id: "idea-1",
  title: "Need help with a fantasy story ending",
  description:
    "I'm writing a fantasy story about a young wizard who discovers they're the chosen one, but I'm stuck on how to end it without being too cliché. Looking for creative ideas!\n\nThe story follows Aria, a 16-year-old who lives in a small village. She discovers she has magical powers when her village is attacked by dark creatures. Throughout the story, she learns she's the prophesied chosen one who must defeat the Dark Lord.\n\nI want an ending that feels satisfying but not predictable. Any suggestions?",
  author: {
    username: "FantasyWriter",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  tags: ["fantasy", "ending", "wizard", "creative"],
  responseCount: 12,
  createdAt: "2 hours ago",
  status: "open" as const,
}

const mockResponses = [
  {
    id: "response-1",
    content:
      "What if Aria realizes that the 'Dark Lord' is actually her future self from a timeline where she failed? She has to choose between defeating herself or finding a way to heal the trauma that created the darkness.",
    author: {
      username: "PlotTwister",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    likes: 8,
    createdAt: "1 hour ago",
    isLiked: false,
  },
  {
    id: "response-2",
    content:
      "Consider having Aria discover that being the 'chosen one' was a lie created by the village elders to give her confidence. Her real power comes from her genuine desire to protect others, not from prophecy.",
    author: {
      username: "CharacterExpert",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    likes: 12,
    createdAt: "45 minutes ago",
    isLiked: true,
  },
  {
    id: "response-3",
    content:
      "Maybe the Dark Lord isn't evil at all, but is trying to prevent an even greater catastrophe. Aria has to choose between following the prophecy or trusting her enemy to save everyone.",
    author: {
      username: "StoryWeaver",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    likes: 5,
    createdAt: "30 minutes ago",
    isLiked: false,
  },
]

export default function IdeaRequestPage({ params }: { params: { id: string } }) {
  const [responses, setResponses] = useState(mockResponses)
  const [newResponse, setNewResponse] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLike = (responseId: string) => {
    setResponses(
      responses.map((response) =>
        response.id === responseId
          ? {
              ...response,
              isLiked: !response.isLiked,
              likes: response.isLiked ? response.likes - 1 : response.likes + 1,
            }
          : response,
      ),
    )
  }

  const handleSubmitResponse = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newResponse.trim()) return

    setIsSubmitting(true)

    // TODO: Implement actual submission logic
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const response = {
      id: `response-${Date.now()}`,
      content: newResponse,
      author: {
        username: "CurrentUser",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      likes: 0,
      createdAt: "just now",
      isLiked: false,
    }

    setResponses([...responses, response])
    setNewResponse("")
    setIsSubmitting(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Idea Request" description="Help a fellow writer with their creative challenge" />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Original Request */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-xl mb-3">{mockIdeaRequest.title}</CardTitle>
                <div className="flex flex-wrap gap-1 mb-4">
                  {mockIdeaRequest.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <Badge variant={mockIdeaRequest.status === "open" ? "default" : "secondary"}>
                {mockIdeaRequest.status === "open" ? (
                  <>
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Open
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Resolved
                  </>
                )}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none mb-4">
              <p className="whitespace-pre-line">{mockIdeaRequest.description}</p>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={mockIdeaRequest.author.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs">{mockIdeaRequest.author.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{mockIdeaRequest.author.username}</span>
              </div>

              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{mockIdeaRequest.createdAt}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Responses */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Responses ({responses.length})</h2>

          {responses.map((response) => (
            <IdeaResponse key={response.id} response={response} onLike={handleLike} />
          ))}
        </div>

        {/* Add Response */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Share Your Ideas</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitResponse} className="space-y-4">
              <Textarea
                value={newResponse}
                onChange={(e) => setNewResponse(e.target.value)}
                placeholder="Share your creative ideas and suggestions..."
                rows={4}
                required
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Posting..." : "Post Response"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
