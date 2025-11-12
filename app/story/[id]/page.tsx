"use client"

import { useRouter } from "next/navigation"
import { StoryViewer } from "@/components/story/story-viewer"

interface StoryPageProps {
  params: {
    id: string
  }
}

export default function StoryPage({ params }: StoryPageProps) {
  const router = useRouter()

  const handleBack = () => {
    router.push("/")
  }

  return <StoryViewer storyId={params.id} onBack={handleBack} />
}
