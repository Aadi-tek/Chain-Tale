import { UserProfile } from "@/components/profile/user-profile"

interface UserProfilePageProps {
  params: {
    userId: string
  }
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
  return <UserProfile userId={params.userId} isOwnProfile={false} />
}
