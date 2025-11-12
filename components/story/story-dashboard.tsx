"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StoryChainCard } from "./story-chain-card"
import { NewStoryForm } from "./new-story-form"
import { Search, Plus, BookOpen, TrendingUp, Clock, Users, Zap } from "lucide-react"

// Mock data for demonstration
const mockStoryChains = [
  {
    id: "1",
    title: "The Mysterious Library",
    lastSentence:
      "As Sarah pushed open the heavy wooden door, she noticed the books were whispering secrets to each other in the moonlight.",
    currentTag: "ancient",
    contributorCount: 7,
    timeRemaining: "3 days left",
    category: "fantasy",
    difficulty: "beginner",
    isHot: true,
    recentActivity: "2 hours ago",
  },
  {
    id: "2",
    title: "Space Station Alpha",
    lastSentence: "Commander Chen watched the Earth rotate slowly below as the alien ship approached their position.",
    currentTag: "communication",
    contributorCount: 12,
    timeRemaining: "5 days left",
    category: "sci-fi",
    difficulty: "intermediate",
    isHot: true,
    recentActivity: "1 hour ago",
  },
  {
    id: "3",
    title: "The Time Traveler's Dilemma",
    lastSentence:
      "With the temporal device crackling with energy, Marcus realized he had only one chance to fix the timeline.",
    currentTag: "consequence",
    contributorCount: 4,
    timeRemaining: "1 day left",
    category: "sci-fi",
    difficulty: "advanced",
    isHot: false,
    recentActivity: "4 hours ago",
  },
  {
    id: "4",
    title: "Digital Dreams",
    lastSentence: "In the virtual reality world, colors had flavors and sounds had textures that defied all logic.",
    currentTag: "reality",
    contributorCount: 9,
    timeRemaining: "6 days left",
    category: "cyberpunk",
    difficulty: "intermediate",
    isHot: false,
    recentActivity: "6 hours ago",
  },
  {
    id: "5",
    title: "The Last Garden",
    lastSentence: "Maya discovered a hidden garden that held the key to Earth's future in a world without nature.",
    currentTag: "hope",
    contributorCount: 6,
    timeRemaining: "4 days left",
    category: "dystopian",
    difficulty: "beginner",
    isHot: false,
    recentActivity: "8 hours ago",
  },
  {
    id: "6",
    title: "Midnight Express",
    lastSentence: "The train that appeared only at midnight carried passengers to destinations in dreams.",
    currentTag: "journey",
    contributorCount: 3,
    timeRemaining: "2 days left",
    category: "fantasy",
    difficulty: "beginner",
    isHot: false,
    recentActivity: "12 hours ago",
  },
]

const categories = ["all", "fantasy", "sci-fi", "cyberpunk", "dystopian", "mystery", "romance"]
const difficulties = ["all", "beginner", "intermediate", "advanced"]

export function StoryDashboard() {
  const router = useRouter()
  const [showNewStoryForm, setShowNewStoryForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [storyChains, setStoryChains] = useState(mockStoryChains)
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [activeTab, setActiveTab] = useState("all")

  const filteredStories = storyChains
    .filter((story) => {
      const matchesSearch =
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.currentTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.category.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = categoryFilter === "all" || story.category === categoryFilter
      const matchesDifficulty = difficultyFilter === "all" || story.difficulty === difficultyFilter

      if (activeTab === "hot") return matchesSearch && matchesCategory && matchesDifficulty && story.isHot
      if (activeTab === "ending-soon")
        return matchesSearch && matchesCategory && matchesDifficulty && story.timeRemaining.includes("1 day")
      if (activeTab === "new")
        return matchesSearch && matchesCategory && matchesDifficulty && story.contributorCount <= 3

      return matchesSearch && matchesCategory && matchesDifficulty
    })
    .sort((a, b) => {
      if (sortBy === "recent") return new Date(a.recentActivity).getTime() - new Date(b.recentActivity).getTime()
      if (sortBy === "contributors") return b.contributorCount - a.contributorCount
      if (sortBy === "ending-soon") {
        const aTime = Number.parseInt(a.timeRemaining.split(" ")[0])
        const bTime = Number.parseInt(b.timeRemaining.split(" ")[0])
        return aTime - bTime
      }
      if (sortBy === "alphabetical") return a.title.localeCompare(b.title)
      return 0
    })

  const handleNewStory = (title: string, seedSentence: string, tag: string) => {
    const newStory = {
      id: Date.now().toString(),
      title,
      lastSentence: seedSentence,
      currentTag: tag,
      contributorCount: 1,
      timeRemaining: "7 days left",
      category: "fantasy",
      difficulty: "beginner",
      isHot: false,
      recentActivity: "just now",
    }
    setStoryChains([newStory, ...storyChains])
    setShowNewStoryForm(false)
  }

  const handleStoryClick = (storyId: string) => {
    router.push(`/story/${storyId}`)
  }

  const hotStories = storyChains.filter((story) => story.isHot)
  const endingSoonStories = storyChains.filter((story) => story.timeRemaining.includes("1 day"))
  const newStories = storyChains.filter((story) => story.contributorCount <= 3)

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Story Chains</h1>
            <p className="text-muted-foreground">Collaborate on creative stories with the community</p>
          </div>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Active Stories</span>
            </div>
            <p className="text-2xl font-bold mt-1">{storyChains.length}</p>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Hot Stories</span>
            </div>
            <p className="text-2xl font-bold mt-1">{hotStories.length}</p>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium">Ending Soon</span>
            </div>
            <p className="text-2xl font-bold mt-1">{endingSoonStories.length}</p>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Contributors</span>
            </div>
            <p className="text-2xl font-bold mt-1">
              {storyChains.reduce((sum, story) => sum + story.contributorCount, 0)}
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search stories, tags, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty === "all" ? "All Levels" : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="contributors">Most Contributors</SelectItem>
                  <SelectItem value="ending-soon">Ending Soon</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={() => setShowNewStoryForm(true)} className="shrink-0">
                <Plus className="h-4 w-4 mr-2" />
                Start New Story
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* New Story Form */}
      {showNewStoryForm && (
        <div className="mb-8">
          <NewStoryForm onSubmit={handleNewStory} onCancel={() => setShowNewStoryForm(false)} />
        </div>
      )}

      {/* Story Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            All Stories ({storyChains.length})
          </TabsTrigger>
          <TabsTrigger value="hot" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Hot ({hotStories.length})
          </TabsTrigger>
          <TabsTrigger value="ending-soon" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Ending Soon ({endingSoonStories.length})
          </TabsTrigger>
          <TabsTrigger value="new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New ({newStories.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredStories.map((story) => (
              <StoryChainCard key={story.id} {...story} onClick={() => handleStoryClick(story.id)} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hot" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredStories.map((story) => (
              <StoryChainCard key={story.id} {...story} onClick={() => handleStoryClick(story.id)} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ending-soon" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredStories.map((story) => (
              <StoryChainCard key={story.id} {...story} onClick={() => handleStoryClick(story.id)} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="new" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredStories.map((story) => (
              <StoryChainCard key={story.id} {...story} onClick={() => handleStoryClick(story.id)} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredStories.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No stories found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || categoryFilter !== "all" || difficultyFilter !== "all"
              ? "Try adjusting your search terms or filters"
              : "Be the first to start a story chain!"}
          </p>
          {!searchQuery && (
            <Button onClick={() => setShowNewStoryForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Start New Story
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
