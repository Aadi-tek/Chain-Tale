"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Bell, Lock, Palette, User } from "lucide-react"

interface UserSettings {
  email: string
  password: string
  newPassword: string
  confirmPassword: string
  emailNotifications: boolean
  storyNotifications: boolean
  friendRequests: boolean
  theme: "light" | "dark" | "auto"
  language: "en" | "es" | "fr"
}

interface SettingsFormProps {
  onSave?: (settings: UserSettings) => void
  onCancel?: () => void
}

export function SettingsForm({ onSave, onCancel }: SettingsFormProps) {
  const [settings, setSettings] = useState<UserSettings>({
    email: "storyweaver@example.com",
    password: "",
    newPassword: "",
    confirmPassword: "",
    emailNotifications: true,
    storyNotifications: true,
    friendRequests: true,
    theme: "auto",
    language: "en",
  })

  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleInputChange = (field: keyof UserSettings, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async (tab: string) => {
    setIsSaving(true)
    setMessage(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 800))

      if (tab === "security" && settings.newPassword) {
        if (settings.newPassword !== settings.confirmPassword) {
          setMessage({ type: "error", text: "New passwords do not match" })
          setIsSaving(false)
          return
        }
        if (settings.newPassword.length < 6) {
          setMessage({ type: "error", text: "Password must be at least 6 characters" })
          setIsSaving(false)
          return
        }
      }

      setMessage({ type: "success", text: `${tab} settings saved successfully` })
      onSave?.(settings)

      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage({ type: "error", text: "Failed to save settings. Please try again." })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="w-full max-w-2xl">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
        </TabsList>

        {/* Account Settings Tab */}
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={isSaving}
                />
              </div>

              {message && (
                <div
                  className={`p-3 rounded-md text-sm ${
                    message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button onClick={() => handleSave("account")} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
                {onCancel && (
                  <Button variant="outline" onClick={onCancel} disabled={isSaving}>
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your password and security options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  placeholder="Enter your current password"
                  value={settings.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  disabled={isSaving}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Enter a new password"
                  value={settings.newPassword}
                  onChange={(e) => handleInputChange("newPassword", e.target.value)}
                  disabled={isSaving}
                />
                <p className="text-xs text-muted-foreground">At least 6 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your new password"
                  value={settings.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  disabled={isSaving}
                />
              </div>

              {message && (
                <div
                  className={`p-3 rounded-md text-sm ${
                    message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button onClick={() => handleSave("security")} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Update Password"}
                </Button>
                {onCancel && (
                  <Button variant="outline" onClick={onCancel} disabled={isSaving}>
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="email-notif">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive email updates about your activity</p>
                </div>
                <Switch
                  id="email-notif"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
                  disabled={isSaving}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="story-notif">Story Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when stories you contributed to are updated
                  </p>
                </div>
                <Switch
                  id="story-notif"
                  checked={settings.storyNotifications}
                  onCheckedChange={(checked) => handleInputChange("storyNotifications", checked)}
                  disabled={isSaving}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="friend-notif">Friend Requests</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications for new friend requests</p>
                </div>
                <Switch
                  id="friend-notif"
                  checked={settings.friendRequests}
                  onCheckedChange={(checked) => handleInputChange("friendRequests", checked)}
                  disabled={isSaving}
                />
              </div>

              {message && (
                <div
                  className={`p-3 rounded-md text-sm ${
                    message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button onClick={() => handleSave("notifications")} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Preferences"}
                </Button>
                {onCancel && (
                  <Button variant="outline" onClick={onCancel} disabled={isSaving}>
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings Tab */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize how Chain-Tale looks for you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>Theme</Label>
                <div className="space-y-2">
                  {[
                    { value: "light" as const, label: "Light" },
                    { value: "dark" as const, label: "Dark" },
                    { value: "auto" as const, label: "Auto (System)" },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center gap-2">
                      <input
                        type="radio"
                        id={`theme-${option.value}`}
                        name="theme"
                        value={option.value}
                        checked={settings.theme === option.value}
                        onChange={(e) => handleInputChange("theme", e.target.value)}
                        disabled={isSaving}
                        className="h-4 w-4"
                      />
                      <Label htmlFor={`theme-${option.value}`} className="font-normal cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="language">Language</Label>
                <select
                  id="language"
                  value={settings.language}
                  onChange={(e) => handleInputChange("language", e.target.value as "en" | "es" | "fr")}
                  disabled={isSaving}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
              </div>

              {message && (
                <div
                  className={`p-3 rounded-md text-sm ${
                    message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button onClick={() => handleSave("appearance")} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Preferences"}
                </Button>
                {onCancel && (
                  <Button variant="outline" onClick={onCancel} disabled={isSaving}>
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
