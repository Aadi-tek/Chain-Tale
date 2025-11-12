"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, BookOpen, Share2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface ArchivedStoryCardProps {
  id: string
  title: string
  excerpt: string
  completedAt: Date
  contributorCount: number
  sentenceCount: number
  tags: string[]
  onClick: () => void
}

export function ArchivedStoryCard({
  id,
  title,
  excerpt,
  completedAt,
  contributorCount,
  sentenceCount,
  tags,
  onClick,
}: ArchivedStoryCardProps) {
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    // TODO: Implement sharing functionality
    navigator.clipboard.writeText(`${window.location.origin}/archive/${id}`)
  }

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold line-clamp-1 mb-2">{title}</CardTitle>
            <CardDescription className="line-clamp-2">{excerpt}</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={handleShare} className="ml-2 shrink-0">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{tags.length - 3} more
            </Badge>
          )}
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDistanceToNow(completedAt, { addSuffix: true })}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{contributorCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{sentenceCount} sentences</span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="bg-transparent">
            Read Story
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
