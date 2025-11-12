"use client"

import { useRouter } from "next/navigation"
import { ArchivedStoryViewer } from "@/components/archive/archived-story-viewer"

interface ArchivedStoryPageProps {
  params: {
    id: string
  }
}

export default function ArchivedStoryPage({ params }: ArchivedStoryPageProps) {
  const router = useRouter()

  const handleBack = () => {
    router.push("/archive")
  }

  return <ArchivedStoryViewer storyId={params.id} onBack={handleBack} />
}
