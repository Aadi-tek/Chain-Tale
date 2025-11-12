"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, Tag, Zap, TrendingUp, Star } from "lucide-react"

interface StoryChainCardProps {
  id: string
  title: string
  lastSentence: string
  currentTag: string
  contributorCount: number
  timeRemaining: string
  category?: string
  difficulty?: string
  isHot?: boolean
  recentActivity?: string
  onClick: () => void
}

export function StoryChainCard({
  id,
  title,
  lastSentence,
  currentTag,
  contributorCount,
  timeRemaining,
  category = "general",
  difficulty = "beginner",
  isHot = false,
  recentActivity,
  onClick,
}: StoryChainCardProps) {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const isUrgent = timeRemaining.includes("1 day") || timeRemaining.includes("hours")

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer relative" onClick={onClick}>
      {isHot && (
        <div className="absolute top-2 right-2 z-10">
          <Badge variant="destructive" className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600">
            <Zap className="h-3 w-3" />
            Hot
          </Badge>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg font-semibold line-clamp-1 flex-1">{title}</CardTitle>
          <Badge variant="secondary" className="shrink-0">
            <Tag className="h-3 w-3 mr-1" />
            {currentTag}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">{lastSentence}</CardDescription>

        <div className="flex items-center gap-2 pt-2">
          <Badge variant="outline" className="text-xs capitalize">
            {category}
          </Badge>
          <Badge variant="outline" className={`text-xs capitalize ${getDifficultyColor(difficulty)}`}>
            <Star className="h-3 w-3 mr-1" />
            {difficulty}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{contributorCount}</span>
            </div>
            <div className={`flex items-center gap-1 ${isUrgent ? "text-red-600 font-medium" : ""}`}>
              <Clock className="h-4 w-4" />
              <span>{timeRemaining}</span>
            </div>
            {recentActivity && (
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs">{recentActivity}</span>
              </div>
            )}
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full bg-transparent hover:bg-primary hover:text-primary-foreground"
        >
          Continue Story
        </Button>
      </CardContent>
    </Card>
  )
}
