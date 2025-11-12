"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Users, Search, Trash2 } from "lucide-react"

interface Friend {
  id: string
  username: string
  avatar?: string
  status: "online" | "offline"
  lastSeen: Date
  mutualConnections: number
  favoriteGenres: string[]
}

interface UserFriendsProps {
  userId: string
  isOwnProfile?: boolean
}

const mockFriends: Friend[] = [
  {
    id: "friend-1",
    username: "NovelNinja",
    avatar: "/placeholder.svg?height=48&width=48",
    status: "online",
    lastSeen: new Date(),
    mutualConnections: 8,
    favoriteGenres: ["Fantasy", "Adventure"],
  },
  {
    id: "friend-2",
    username: "TaleSpinner",
    avatar: "/placeholder.svg?height=48&width=48",
    status: "offline",
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
    mutualConnections: 5,
    favoriteGenres: ["Mystery", "Thriller"],
  },
  {
    id: "friend-3",
    username: "StoryMaster",
    avatar: "/placeholder.svg?height=48&width=48",
    status: "online",
    lastSeen: new Date(),
    mutualConnections: 12,
    favoriteGenres: ["Sci-Fi", "Fantasy"],
  },
]

const mockSuggestedUsers = [
  {
    id: "suggest-1",
    username: "VerseVoyager",
    avatar: "/placeholder.svg?height=48&width=48",
    mutualConnections: 3,
    favoriteGenres: ["Fantasy"],
  },
  {
    id: "suggest-2",
    username: "PlotPioneer",
    avatar: "/placeholder.svg?height=48&width=48",
    mutualConnections: 2,
    favoriteGenres: ["Sci-Fi", "Adventure"],
  },
]

export function UserFriends({ userId, isOwnProfile = false }: UserFriendsProps) {
  const [friends, setFriends] = useState<Friend[]>(mockFriends)
  const [suggestedUsers, setSuggestedUsers] = useState(mockSuggestedUsers)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFriends = friends.filter((friend) => friend.username.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleAddFriend = (userId: string) => {
    const user = suggestedUsers.find((u) => u.id === userId)
    if (user) {
      setFriends([
        ...friends,
        {
          id: user.id,
          username: user.username,
          avatar: user.avatar,
          status: "offline",
          lastSeen: new Date(),
          mutualConnections: user.mutualConnections,
          favoriteGenres: user.favoriteGenres,
        },
      ])
      setSuggestedUsers(suggestedUsers.filter((u) => u.id !== userId))
    }
  }

  const handleRemoveFriend = (friendId: string) => {
    setFriends(friends.filter((f) => f.id !== friendId))
  }

  return (
    <div className="space-y-6">
      {/* Friends List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <div>
                <CardTitle>Friends</CardTitle>
                <CardDescription>{friends.length} connections</CardDescription>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search friends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredFriends.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchQuery ? "No friends found matching your search" : "No friends yet"}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.username} />
                        <AvatarFallback>{friend.username.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${
                          friend.status === "online" ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{friend.username}</div>
                      <div className="text-xs text-muted-foreground">
                        {friend.status === "online" ? "Online" : `Last seen ${friend.lastSeen.toLocaleDateString()}`}
                      </div>
                      <div className="flex gap-1 mt-1">
                        {friend.favoriteGenres.slice(0, 2).map((genre) => (
                          <Badge key={genre} variant="secondary" className="text-xs">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground text-center">
                      <div className="font-medium">{friend.mutualConnections}</div>
                      <div>mutual</div>
                    </div>
                  </div>
                  {isOwnProfile && (
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveFriend(friend.id)} className="ml-2">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Suggested Friends */}
      {isOwnProfile && suggestedUsers.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              <div>
                <CardTitle>Suggested Connections</CardTitle>
                <CardDescription>People you might know</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {suggestedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                      <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">{user.username}</div>
                      <div className="flex gap-1 mt-1">
                        {user.favoriteGenres.map((genre) => (
                          <Badge key={genre} variant="secondary" className="text-xs">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground text-center">
                      <div className="font-medium">{user.mutualConnections}</div>
                      <div>mutual</div>
                    </div>
                  </div>
                  <Button size="sm" onClick={() => handleAddFriend(user.id)} className="ml-2">
                    <UserPlus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
