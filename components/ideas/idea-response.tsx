"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThumbsUp, Clock } from "lucide-react"

interface IdeaResponse {
  id: string
  content: string
  author: {
    username: string
    avatar?: string
  }
  likes: number
  createdAt: string
  isLiked: boolean
}

interface IdeaResponseProps {
  response: IdeaResponse
  onLike: (responseId: string) => void
}

export function IdeaResponse({ response, onLike }: IdeaResponseProps) {
  return (
    <Card>
      <CardContent className="pt-4">
        <div className="flex gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={response.author.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-sm">{response.author.username.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-sm">{response.author.username}</span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{response.createdAt}</span>
              </div>
            </div>

            <p className="text-sm mb-3">{response.content}</p>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLike(response.id)}
              className={`h-8 px-2 ${response.isLiked ? "text-primary" : "text-muted-foreground"}`}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              {response.likes}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
