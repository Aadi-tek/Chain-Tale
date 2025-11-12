"use client"

import { useRouter } from "next/navigation"
import { SettingsForm } from "@/components/settings/settings-form"
import { PageHeader } from "@/components/layout/page-header"

export default function SettingsPage() {
  const router = useRouter()

  const handleSave = (settings: any) => {
    console.log("[v0] Settings saved:", settings)
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <main className="min-h-screen bg-background">
      <PageHeader title="Settings" description="Manage your account and preferences" />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <SettingsForm onSave={handleSave} onCancel={handleCancel} />
      </div>
    </main>
  )
}
