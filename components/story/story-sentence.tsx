"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import { UserPlus } from "lucide-react"
import { useState } from "react"

interface StorySentenceProps {
  sentence: string
  author: string
  authorAvatar?: string
  tag: string
  timestamp: Date
  isLatest?: boolean
}

export function StorySentence({ sentence, author, authorAvatar, tag, timestamp, isLatest }: StorySentenceProps) {
  const [isFriendAdded, setIsFriendAdded] = useState(false)

  const handleAddFriend = () => {
    // Add friend to localStorage
    const friends = JSON.parse(localStorage.getItem("friends") || "[]")
    if (!friends.some((f: any) => f.username === author)) {
      friends.push({ username: author, authorAvatar })
      localStorage.setItem("friends", JSON.stringify(friends))
      setIsFriendAdded(true)
      setTimeout(() => setIsFriendAdded(false), 2000)
    }
  }

  return (
    <div className={`p-4 rounded-lg border ${isLatest ? "bg-accent/20 border-accent" : "bg-card"}`}>
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src={authorAvatar || "/placeholder.svg"} alt={author} />
          <AvatarFallback>{author.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="font-medium text-sm">{author}</span>
            <span className="text-xs text-muted-foreground">{formatDistanceToNow(timestamp, { addSuffix: true })}</span>
            {isLatest && (
              <Badge variant="secondary" className="text-xs">
                Latest
              </Badge>
            )}
            <Button size="sm" variant="ghost" onClick={handleAddFriend} className="h-5 px-2 text-xs ml-auto">
              <UserPlus className="h-3 w-3 mr-1" />
              {isFriendAdded ? "Added!" : "Add Friend"}
            </Button>
          </div>
          <p className="text-foreground leading-relaxed">{sentence}</p>
          <div className="mt-2">
            <Badge variant="outline" className="text-xs">
              Next tag: {tag}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
