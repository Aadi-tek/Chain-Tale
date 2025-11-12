"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Edit, Calendar, Award, BookOpen, Users, TrendingUp, Zap, Target, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface UserProfileHeaderProps {
  user: {
    id: string
    username: string
    email: string
    avatar?: string
    bio?: string
    joinedAt: Date
    totalContributions: number
    storiesStarted: number
    storiesCompleted: number
    favoriteGenres: string[]
    weeklyStreak: number
    longestStreak: number
    averageWordsPerContribution: number
    totalWordsWritten: number
    lastActiveAt: Date
    level: number
    experiencePoints: number
    nextLevelXP: number
    achievements: string[]
    monthlyContributions: number
    weeklyContributions: number
  }
  isOwnProfile?: boolean
  onEditProfile?: () => void
}

export function UserProfileHeader({ user, isOwnProfile = false, onEditProfile }: UserProfileHeaderProps) {
  const levelProgress = (user.experiencePoints / user.nextLevelXP) * 100

  const getLevelBadgeColor = (level: number) => {
    if (level >= 20) return "bg-purple-100 text-purple-800 border-purple-200"
    if (level >= 15) return "bg-blue-100 text-blue-800 border-blue-200"
    if (level >= 10) return "bg-green-100 text-green-800 border-green-200"
    if (level >= 5) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    return "bg-gray-100 text-gray-800 border-gray-200"
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col items-center md:items-start">
            <div className="relative">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user.avatar || "/placeholder.svg?height=96&width=96"} alt={user.username} />
                <AvatarFallback className="text-2xl">{user.username.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <Badge className={`absolute -bottom-2 -right-2 ${getLevelBadgeColor(user.level)} font-bold`}>
                Lv.{user.level}
              </Badge>
            </div>
            {isOwnProfile && (
              <Button variant="outline" size="sm" onClick={onEditProfile}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>

          {/* User Details */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold">{user.username}</h1>
                  {user.weeklyStreak > 0 && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      {user.weeklyStreak} day streak
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {formatDistanceToNow(user.joinedAt, { addSuffix: true })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Active {formatDistanceToNow(user.lastActiveAt, { addSuffix: true })}</span>
                  </div>
                </div>
                {user.bio && <p className="text-muted-foreground mb-4 max-w-2xl">{user.bio}</p>}

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium">Level Progress</span>
                    <span className="text-muted-foreground">
                      {user.experiencePoints}/{user.nextLevelXP} XP
                    </span>
                  </div>
                  <Progress value={levelProgress} className="h-2" />
                </div>
              </div>
            </div>

            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <BookOpen className="h-4 w-4 text-primary mx-auto mb-1" />
                <div className="text-xl font-bold">{user.totalContributions}</div>
                <div className="text-xs text-muted-foreground">Total</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <TrendingUp className="h-4 w-4 text-green-600 mx-auto mb-1" />
                <div className="text-xl font-bold">{user.monthlyContributions}</div>
                <div className="text-xs text-muted-foreground">This Month</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <Users className="h-4 w-4 text-primary mx-auto mb-1" />
                <div className="text-xl font-bold">{user.storiesStarted}</div>
                <div className="text-xs text-muted-foreground">Started</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <Award className="h-4 w-4 text-primary mx-auto mb-1" />
                <div className="text-xl font-bold">{user.storiesCompleted}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <Target className="h-4 w-4 text-primary mx-auto mb-1" />
                <div className="text-xl font-bold">
                  {Math.round((user.storiesCompleted / user.storiesStarted) * 100) || 0}%
                </div>
                <div className="text-xs text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <Zap className="h-4 w-4 text-orange-500 mx-auto mb-1" />
                <div className="text-xl font-bold">{user.longestStreak}</div>
                <div className="text-xs text-muted-foreground">Best Streak</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-muted/30 rounded-lg p-3">
                <h4 className="text-sm font-medium mb-2">Writing Stats</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Words:</span>
                    <span className="font-medium">{user.totalWordsWritten.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg per Contribution:</span>
                    <span className="font-medium">{user.averageWordsPerContribution} words</span>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-3">
                <h4 className="text-sm font-medium mb-2">Recent Achievements</h4>
                <div className="flex flex-wrap gap-1">
                  {user.achievements.slice(0, 3).map((achievement) => (
                    <Badge key={achievement} variant="secondary" className="text-xs">
                      {achievement}
                    </Badge>
                  ))}
                  {user.achievements.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{user.achievements.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Favorite Genres */}
            {user.favoriteGenres.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Favorite Genres</h3>
                <div className="flex flex-wrap gap-1">
                  {user.favoriteGenres.map((genre) => (
                    <Badge key={genre} variant="secondary" className="text-xs">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
