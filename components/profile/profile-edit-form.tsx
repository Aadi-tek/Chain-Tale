"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { X } from "lucide-react"

interface ProfileEditFormProps {
  user: {
    username: string
    email: string
    bio?: string
    favoriteGenres: string[]
  }
  onSave: (data: any) => void
  onCancel: () => void
}

export function ProfileEditForm({ user, onSave, onCancel }: ProfileEditFormProps) {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    bio: user.bio || "",
    favoriteGenres: user.favoriteGenres || [],
  })
  const [newGenre, setNewGenre] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.username.trim()) {
      setError("Username is required")
      return
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Valid email is required")
      return
    }

    onSave(formData)
  }

  const handleAddGenre = () => {
    if (newGenre.trim() && !formData.favoriteGenres.includes(newGenre)) {
      setFormData({
        ...formData,
        favoriteGenres: [...formData.favoriteGenres, newGenre],
      })
      setNewGenre("")
    }
  }

  const handleRemoveGenre = (genre: string) => {
    setFormData({
      ...formData,
      favoriteGenres: formData.favoriteGenres.filter((g) => g !== genre),
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Favorite Genres</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a genre"
                value={newGenre}
                onChange={(e) => setNewGenre(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddGenre()
                  }
                }}
              />
              <Button type="button" onClick={handleAddGenre} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.favoriteGenres.map((genre) => (
                <div
                  key={genre}
                  className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                >
                  {genre}
                  <button type="button" onClick={() => handleRemoveGenre(genre)} className="hover:text-primary/70">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="submit">Save Changes</Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
