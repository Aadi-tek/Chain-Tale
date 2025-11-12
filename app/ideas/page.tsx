import { NewIdeaRequestForm } from "@/components/ideas/new-idea-request-form"
import { IdeaRequestCard } from "@/components/ideas/idea-request-card"
import { PageHeader } from "@/components/layout/page-header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter } from "lucide-react"

// Mock data
const mockIdeaRequests = [
  {
    id: "idea-1",
    title: "Need help with a fantasy story ending",
    description:
      "I'm writing a fantasy story about a young wizard who discovers they're the chosen one, but I'm stuck on how to end it without being too cliché. Looking for creative ideas!",
    author: {
      username: "FantasyWriter",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    tags: ["fantasy", "ending", "wizard", "creative"],
    responseCount: 12,
    createdAt: "2 hours ago",
    status: "open" as const,
  },
  {
    id: "idea-2",
    title: "Character development for a mystery novel",
    description:
      "I have a detective character but they feel flat. What are some ways to make them more interesting and three-dimensional?",
    author: {
      username: "MysteryMaven",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    tags: ["mystery", "character", "detective"],
    responseCount: 8,
    createdAt: "5 hours ago",
    status: "open" as const,
  },
  {
    id: "idea-3",
    title: "Dialogue tips for romance scenes",
    description: "I struggle with writing natural-sounding romantic dialogue. Any tips or examples of what works well?",
    author: {
      username: "RomanceReader",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    tags: ["romance", "dialogue", "tips"],
    responseCount: 15,
    createdAt: "1 day ago",
    status: "resolved" as const,
  },
]

const popularTags = ["fantasy", "mystery", "romance", "character", "plot", "dialogue", "ending", "beginning"]

export default function IdeasPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Idea Help"
        description="Get writing help from the community or share your expertise with fellow writers"
      />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search idea requests..." className="pl-10" />
            </div>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Popular Tags */}
          <div>
            <h3 className="text-sm font-medium mb-3">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-muted">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Idea Requests */}
          <div className="space-y-4">
            {mockIdeaRequests.map((request) => (
              <IdeaRequestCard key={request.id} request={request} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <NewIdeaRequestForm />

          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-medium mb-2">Community Guidelines</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Be respectful and constructive</li>
              <li>• Provide specific, actionable advice</li>
              <li>• Use relevant tags for better visibility</li>
              <li>• Mark requests as resolved when helped</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
