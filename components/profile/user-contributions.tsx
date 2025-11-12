"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, ExternalLink } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Contribution {
  id: string
  storyId: string
  storyTitle: string
  sentence: string
  tag: string
  timestamp: Date
  isArchived: boolean
}

interface UserContributionsProps {
  contributions: Contribution[]
  onViewStory: (storyId: string, isArchived: boolean) => void
}

export function UserContributions({ contributions, onViewStory }: UserContributionsProps) {
  const recentContributions = contributions.slice(0, 10)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Recent Contributions
        </CardTitle>
        <CardDescription>Your latest additions to collaborative stories</CardDescription>
      </CardHeader>
      <CardContent>
        {recentContributions.length === 0 ? (
          <div className="text-center py-8">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No contributions yet</h3>
            <p className="text-muted-foreground">Start contributing to stories to see your activity here!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentContributions.map((contribution) => (
              <div key={contribution.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium line-clamp-1 mb-1">{contribution.storyTitle}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDistanceToNow(contribution.timestamp, { addSuffix: true })}</span>
                      {contribution.isArchived && (
                        <Badge variant="outline" className="text-xs">
                          Archived
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewStory(contribution.storyId, contribution.isArchived)}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm mb-2 line-clamp-2">{contribution.sentence}</p>
                <Badge variant="secondary" className="text-xs">
                  Tag: {contribution.tag}
                </Badge>
              </div>
            ))}
            {contributions.length > 10 && (
              <div className="text-center pt-4">
                <Button variant="outline">View All Contributions ({contributions.length})</Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
