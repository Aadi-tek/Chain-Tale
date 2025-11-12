import { UserProfile } from "@/components/profile/user-profile"

export default function ProfilePage() {
  return <UserProfile userId="current-user" isOwnProfile={true} />
}
