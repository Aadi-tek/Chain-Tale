import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Clock } from "lucide-react"
import Link from "next/link"

interface IdeaRequest {
  id: string
  title: string
  description: string
  author: {
    username: string
    avatar?: string
  }
  tags: string[]
  responseCount: number
  createdAt: string
  status: "open" | "resolved"
}

interface IdeaRequestCardProps {
  request: IdeaRequest
}

export function IdeaRequestCard({ request }: IdeaRequestCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">
              <Link href={`/ideas/${request.id}`} className="hover:text-primary transition-colors">
                {request.title}
              </Link>
            </CardTitle>
            <p className="text-muted-foreground text-sm line-clamp-2">{request.description}</p>
          </div>
          <Badge variant={request.status === "open" ? "default" : "secondary"}>{request.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-3">
          {request.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Avatar className="h-5 w-5">
                <AvatarImage src={request.author.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-xs">{request.author.username.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{request.author.username}</span>
            </div>

            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{request.responseCount} responses</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{request.createdAt}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
