"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { UserProfileHeader } from "./user-profile-header"
import { UserContributions } from "./user-contributions"
import { UserStories } from "./user-stories"
import { UserFriends } from "./user-friends"
import { ProfileEditForm } from "./profile-edit-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock user data
const mockUser = {
  id: "user-1",
  username: "StoryWeaver",
  email: "storyweaver@example.com",
  avatar: "/placeholder.svg?height=96&width=96",
  bio: "Passionate storyteller who loves collaborative fiction. Always looking for the next great adventure in words!",
  joinedAt: new Date("2023-12-01"),
  totalContributions: 47,
  storiesStarted: 8,
  storiesCompleted: 12,
  favoriteGenres: ["Fantasy", "Sci-Fi", "Mystery", "Adventure"],
  weeklyStreak: 5,
  longestStreak: 12,
  averageWordsPerContribution: 28,
  totalWordsWritten: 1316,
  lastActiveAt: new Date("2024-01-22T10:30:00"),
  level: 7,
  experiencePoints: 2340,
  nextLevelXP: 3000,
  achievements: ["First Story", "Week Warrior", "Collaboration King", "Genre Explorer", "Speed Writer"],
  monthlyContributions: 12,
  weeklyContributions: 3,
}

const mockContributions = [
  {
    id: "contrib-1",
    storyId: "1",
    storyTitle: "The Mysterious Library",
    sentence: "As Emma stepped through the portal, she found herself in a world where books lived and breathed.",
    tag: "portal",
    timestamp: new Date("2024-01-20T14:30:00"),
    isArchived: false,
  },
  {
    id: "contrib-2",
    storyId: "archived-1",
    storyTitle: "Space Station Alpha",
    sentence: "The alien ambassador extended a crystalline hand in what appeared to be a gesture of peace.",
    tag: "peace",
    timestamp: new Date("2024-01-18T09:15:00"),
    isArchived: true,
  },
  {
    id: "contrib-3",
    storyId: "2",
    storyTitle: "Digital Dreams",
    sentence: "In this virtual realm, memories could be traded like currency and dreams had physical weight.",
    tag: "memory",
    timestamp: new Date("2024-01-16T16:45:00"),
    isArchived: false,
  },
]

const mockStartedStories = [
  {
    id: "1",
    title: "The Mysterious Library",
    excerpt: "The old library stood at the end of Maple Street, its windows glowing with an otherworldly light...",
    status: "active" as const,
    createdAt: new Date("2024-01-15"),
    contributorCount: 7,
    sentenceCount: 12,
    currentTag: "ancient",
  },
  {
    id: "archived-2",
    title: "The Time Traveler's Dilemma",
    excerpt: "With the temporal device crackling with energy, Marcus realized he had only one chance...",
    status: "archived" as const,
    createdAt: new Date("2024-01-10"),
    completedAt: new Date("2024-01-17"),
    contributorCount: 6,
    sentenceCount: 10,
  },
]

const mockContributedStories = [
  {
    id: "2",
    title: "Space Station Alpha",
    excerpt: "Commander Chen watched the Earth rotate slowly below as the alien ship approached...",
    status: "active" as const,
    createdAt: new Date("2024-01-12"),
    contributorCount: 12,
    sentenceCount: 15,
    currentTag: "communication",
  },
  {
    id: "archived-1",
    title: "Digital Dreams",
    excerpt: "In the virtual reality world, colors had flavors and sounds had textures...",
    status: "archived" as const,
    createdAt: new Date("2024-01-08"),
    completedAt: new Date("2024-01-15"),
    contributorCount: 9,
    sentenceCount: 12,
  },
]

interface UserProfileProps {
  userId: string
  isOwnProfile?: boolean
}

export function UserProfile({ userId, isOwnProfile = false }: UserProfileProps) {
  const router = useRouter()
  const [user, setUser] = useState(mockUser)
  const [isEditing, setIsEditing] = useState(false)

  const handleEditProfile = () => {
    setIsEditing(true)
  }

  const handleSaveProfile = (data: any) => {
    setUser({
      ...user,
      username: data.username,
      email: data.email,
      bio: data.bio,
      favoriteGenres: data.favoriteGenres,
    })
    setIsEditing(false)
  }

  const handleViewStory = (storyId: string, isArchived: boolean) => {
    if (isArchived) {
      router.push(`/archive/${storyId}`)
    } else {
      router.push(`/story/${storyId}`)
    }
  }

  if (isEditing && isOwnProfile) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <ProfileEditForm user={user} onSave={handleSaveProfile} onCancel={() => setIsEditing(false)} />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-8">
        <UserProfileHeader user={user} isOwnProfile={isOwnProfile} onEditProfile={handleEditProfile} />

        <Tabs defaultValue="activity" className="w-full">
          <TabsList>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <UserContributions contributions={mockContributions} onViewStory={handleViewStory} />
            <UserStories
              startedStories={mockStartedStories}
              contributedStories={mockContributedStories}
              onViewStory={handleViewStory}
            />
          </TabsContent>

          <TabsContent value="friends">
            <UserFriends userId={userId} isOwnProfile={isOwnProfile} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
