"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArchivedStoryCard } from "./archived-story-card"
import { Search, Archive, Filter, Calendar, X, Tag, User, BookOpen } from "lucide-react"

// Mock archived stories data
const mockArchivedStories = [
  {
    id: "archived-1",
    title: "The Mysterious Library",
    excerpt: "The old library stood at the end of Maple Street, its windows glowing with an otherworldly light...",
    completedAt: new Date("2024-01-22"),
    contributorCount: 7,
    sentenceCount: 8,
    tags: ["mysterious", "whispers", "courage", "ancient", "discovery", "transformation", "ending"],
    authors: ["MysteryWriter", "BookLover", "StoryWeaver", "TaleTeller", "WordSmith", "PlotMaster", "NarrativeNinja"],
  },
  {
    id: "archived-2",
    title: "Space Station Alpha",
    excerpt: "Commander Chen watched the Earth rotate slowly below as the alien ship approached their position...",
    completedAt: new Date("2024-01-20"),
    contributorCount: 12,
    sentenceCount: 15,
    tags: ["space", "communication", "alien", "diplomacy", "technology", "peace"],
    authors: [
      "SciFiExplorer",
      "CosmicTales",
      "StarWriter",
      "GalaxyGuide",
      "SpaceStory",
      "AlienAuthor",
      "TechTeller",
      "FutureFiction",
      "StellarScribe",
      "OrbitWriter",
      "NebulaNovel",
      "VoidVerse",
    ],
  },
  {
    id: "archived-3",
    title: "The Time Traveler's Dilemma",
    excerpt:
      "With the temporal device crackling with energy, Marcus realized he had only one chance to fix the timeline...",
    completedAt: new Date("2024-01-18"),
    contributorCount: 6,
    sentenceCount: 10,
    tags: ["time", "consequence", "paradox", "choice", "sacrifice", "redemption"],
    authors: ["TimeKeeper", "ChronoWriter", "TemporalTales", "ParadoxPen", "TimeTwister", "ClockworkChronicle"],
  },
  {
    id: "archived-4",
    title: "Digital Dreams",
    excerpt: "In the virtual reality world, colors had flavors and sounds had textures that defied all logic...",
    completedAt: new Date("2024-01-15"),
    contributorCount: 9,
    sentenceCount: 12,
    tags: ["virtual", "reality", "senses", "digital", "consciousness", "awakening"],
    authors: [
      "VRVisionary",
      "DigitalDreamer",
      "CyberScribe",
      "VirtualVerse",
      "TechTales",
      "PixelPoet",
      "CodeChronicle",
      "DataDrama",
      "NetNarrative",
    ],
  },
  {
    id: "archived-5",
    title: "The Last Garden",
    excerpt:
      "In a world where nature had all but disappeared, Maya discovered a hidden garden that held the key to Earth's future...",
    completedAt: new Date("2024-01-12"),
    contributorCount: 8,
    sentenceCount: 11,
    tags: ["nature", "hope", "environment", "growth", "future", "restoration"],
    authors: [
      "EcoWriter",
      "GreenTales",
      "NatureNarrator",
      "EarthEpic",
      "GardenGuide",
      "FloralFiction",
      "BotanicalBard",
      "WildWriter",
    ],
  },
  {
    id: "archived-6",
    title: "Midnight Express",
    excerpt:
      "The train that only appeared at midnight carried passengers to destinations that existed only in dreams...",
    completedAt: new Date("2024-01-10"),
    contributorCount: 5,
    sentenceCount: 9,
    tags: ["midnight", "journey", "dreams", "mystery", "destination", "magic"],
    authors: ["NightWriter", "DreamWeaver", "MidnightMuse", "TrainTales", "JourneyJournal"],
  },
]

const allTags = Array.from(new Set(mockArchivedStories.flatMap((story) => story.tags))).sort()
const allAuthors = Array.from(new Set(mockArchivedStories.flatMap((story) => story.authors))).sort()

export function StoryArchives() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [filterBy, setFilterBy] = useState("all")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([])
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [dateRange, setDateRange] = useState("all")

  const filteredAndSortedStories = mockArchivedStories
    .filter((story) => {
      const matchesSearch =
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        story.authors.some((author) => author.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesTags = selectedTags.length === 0 || selectedTags.every((tag) => story.tags.includes(tag))
      const matchesAuthors =
        selectedAuthors.length === 0 || selectedAuthors.some((author) => story.authors.includes(author))

      let matchesDateRange = true
      if (dateRange === "week") {
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        matchesDateRange = story.completedAt > weekAgo
      } else if (dateRange === "month") {
        const monthAgo = new Date()
        monthAgo.setMonth(monthAgo.getMonth() - 1)
        matchesDateRange = story.completedAt > monthAgo
      }

      if (filterBy === "all") return matchesSearch && matchesTags && matchesAuthors && matchesDateRange
      if (filterBy === "recent")
        return (
          matchesSearch &&
          matchesTags &&
          matchesAuthors &&
          matchesDateRange &&
          story.completedAt > new Date("2024-01-15")
        )
      if (filterBy === "popular")
        return matchesSearch && matchesTags && matchesAuthors && matchesDateRange && story.contributorCount >= 8

      return matchesSearch && matchesTags && matchesAuthors && matchesDateRange
    })
    .sort((a, b) => {
      if (sortBy === "recent") return b.completedAt.getTime() - a.completedAt.getTime()
      if (sortBy === "oldest") return a.completedAt.getTime() - b.completedAt.getTime()
      if (sortBy === "contributors") return b.contributorCount - a.contributorCount
      if (sortBy === "length") return b.sentenceCount - a.sentenceCount
      if (sortBy === "alphabetical") return a.title.localeCompare(b.title)
      return 0
    })

  const handleStoryClick = (storyId: string) => {
    router.push(`/archive/${storyId}`)
  }

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag))
  }

  const addAuthor = (author: string) => {
    if (!selectedAuthors.includes(author)) {
      setSelectedAuthors([...selectedAuthors, author])
    }
  }

  const removeAuthor = (author: string) => {
    setSelectedAuthors(selectedAuthors.filter((a) => a !== author))
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedTags([])
    setSelectedAuthors([])
    setDateRange("all")
    setFilterBy("all")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Archive className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Story Archives</h1>
            <p className="text-muted-foreground">Explore completed collaborative stories from our community</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <Archive className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Archived Stories</span>
            </div>
            <p className="text-2xl font-bold mt-1">{mockArchivedStories.length}</p>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">This Month</span>
            </div>
            <p className="text-2xl font-bold mt-1">4</p>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Total Sentences</span>
            </div>
            <p className="text-2xl font-bold mt-1">
              {mockArchivedStories.reduce((sum, story) => sum + story.sentenceCount, 0)}
            </p>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Unique Authors</span>
            </div>
            <p className="text-2xl font-bold mt-1">{allAuthors.length}</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search stories, tags, authors, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Advanced
              </Button>
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stories</SelectItem>
                  <SelectItem value="recent">Recent</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="contributors">Most Contributors</SelectItem>
                  <SelectItem value="length">Longest Stories</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {showAdvancedFilters && (
            <div className="bg-muted/50 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Advanced Filters</h3>
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Clear All
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {/* Date Range Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Date Range</label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="week">Past Week</SelectItem>
                      <SelectItem value="month">Past Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tag Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Filter by Tags</label>
                  <Select onValueChange={addTag}>
                    <SelectTrigger>
                      <SelectValue placeholder="Add tag filter" />
                    </SelectTrigger>
                    <SelectContent>
                      {allTags
                        .filter((tag) => !selectedTags.includes(tag))
                        .map((tag) => (
                          <SelectItem key={tag} value={tag}>
                            <div className="flex items-center gap-2">
                              <Tag className="h-3 w-3" />
                              {tag}
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Author Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Filter by Authors</label>
                  <Select onValueChange={addAuthor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Add author filter" />
                    </SelectTrigger>
                    <SelectContent>
                      {allAuthors
                        .filter((author) => !selectedAuthors.includes(author))
                        .map((author) => (
                          <SelectItem key={author} value={author}>
                            <div className="flex items-center gap-2">
                              <User className="h-3 w-3" />
                              {author}
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedTags.length > 0 || selectedAuthors.length > 0) && (
                <div className="space-y-2">
                  {selectedTags.length > 0 && (
                    <div>
                      <span className="text-sm font-medium">Tags: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedTags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {tag}
                            <button onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedAuthors.length > 0 && (
                    <div>
                      <span className="text-sm font-medium">Authors: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedAuthors.map((author) => (
                          <Badge key={author} variant="secondary" className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {author}
                            <button onClick={() => removeAuthor(author)} className="ml-1 hover:text-destructive">
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Results Summary */}
      {(searchQuery || selectedTags.length > 0 || selectedAuthors.length > 0 || dateRange !== "all") && (
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredAndSortedStories.length} of {mockArchivedStories.length} stories
        </div>
      )}

      {/* Archived Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAndSortedStories.map((story) => (
          <ArchivedStoryCard key={story.id} {...story} onClick={() => handleStoryClick(story.id)} />
        ))}
      </div>

      {filteredAndSortedStories.length === 0 && (
        <div className="text-center py-12">
          <Archive className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No archived stories found</h3>
          <p className="text-muted-foreground">
            {searchQuery || selectedTags.length > 0 || selectedAuthors.length > 0
              ? "Try adjusting your search terms or filters"
              : "Check back later for completed stories!"}
          </p>
        </div>
      )}
    </div>
  )
}
