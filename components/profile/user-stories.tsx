"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Users, Calendar, ExternalLink } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface UserStory {
  id: string
  title: string
  excerpt: string
  status: "active" | "archived"
  createdAt: Date
  completedAt?: Date
  contributorCount: number
  sentenceCount: number
  currentTag?: string
}

interface UserStoriesProps {
  startedStories: UserStory[]
  contributedStories: UserStory[]
  onViewStory: (storyId: string, isArchived: boolean) => void
}

export function UserStories({ startedStories, contributedStories, onViewStory }: UserStoriesProps) {
  const renderStoryCard = (story: UserStory) => (
    <div key={story.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium line-clamp-1">{story.title}</h4>
            <Badge variant={story.status === "active" ? "default" : "secondary"} className="text-xs">
              {story.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{story.excerpt}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => onViewStory(story.id, story.status === "archived")}>
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>
            {story.status === "active"
              ? formatDistanceToNow(story.createdAt, { addSuffix: true })
              : `Completed ${formatDistanceToNow(story.completedAt!, { addSuffix: true })}`}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          <span>{story.contributorCount} contributors</span>
        </div>
        <div className="flex items-center gap-1">
          <BookOpen className="h-3 w-3" />
          <span>{story.sentenceCount} sentences</span>
        </div>
        {story.currentTag && (
          <Badge variant="outline" className="text-xs">
            Next: {story.currentTag}
          </Badge>
        )}
      </div>
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Your Stories
        </CardTitle>
        <CardDescription>Stories you've started and contributed to</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="started" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="started">Started ({startedStories.length})</TabsTrigger>
            <TabsTrigger value="contributed">Contributed ({contributedStories.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="started" className="mt-4">
            {startedStories.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No stories started</h3>
                <p className="text-muted-foreground">Be the first to start a new story chain!</p>
              </div>
            ) : (
              <div className="space-y-4">{startedStories.map(renderStoryCard)}</div>
            )}
          </TabsContent>

          <TabsContent value="contributed" className="mt-4">
            {contributedStories.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No contributions yet</h3>
                <p className="text-muted-foreground">Join existing story chains to see them here!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {contributedStories.slice(0, 10).map(renderStoryCard)}
                {contributedStories.length > 10 && (
                  <div className="text-center pt-4">
                    <Button variant="outline">View All ({contributedStories.length})</Button>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
