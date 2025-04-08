"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BottomNav } from "@/components/bottom-nav"
import { ArtistSelect } from "@/components/artist-select"
import { EraSelect } from "@/components/era-select"
import { MoodSelect } from "@/components/mood-select"
import { SparkleIcon } from "@/components/sparkle-icon"
import { PlaylistIcon } from "@/components/custom-icons"

interface Artist {
  id: string
  name: string
  images?: { url: string; height: number; width: number }[]
}

export default function CreatePlaylistPage() {
  const router = useRouter()
  const [selectedArtists, setSelectedArtists] = useState<Artist[]>([])
  const [selectedEras, setSelectedEras] = useState<string[]>([])
  const [selectedMoods, setSelectedMoods] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleCreatePlaylist = () => {
    if (selectedArtists.length === 0 || selectedEras.length === 0 || selectedMoods.length === 0) return

    setIsLoading(true)
    // Navigate to results page with query params
    const artistNames = selectedArtists.map((a) => a.name).join(",")
    router.push(
      `/create-playlist/results?artists=${encodeURIComponent(artistNames)}&eras=${encodeURIComponent(selectedEras.join(","))}&moods=${encodeURIComponent(selectedMoods.join(","))}`,
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#151515]">
      <header className="p-4">
        <h1 className="text-xl font-bold">Create Playlist</h1>
      </header>

      <main className="flex-1 px-4 pb-32">
        <div className="max-w-md mx-auto">
          <div className="gradient-card rounded-xl p-6 mb-6 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <SparkleIcon className="h-6 w-6 text-white/20" />
            </div>
            <div className="absolute bottom-4 left-4">
              <SparkleIcon className="h-6 w-6 text-white/20" />
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <SparkleIcon className="h-6 w-6 text-white/20" />
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full music-icon-bg flex items-center justify-center mb-4">
                <PlaylistIcon className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-bold mb-2 text-white">The Playlist Wizard</h2>
              <p className="text-sm text-white/90">
                Let's find the perfect soundtrack for your vibe. Choose your artists, era, and mood, and let the music
                flow.
              </p>
              <div className="mt-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <ArtistSelect selectedArtists={selectedArtists} onArtistChange={setSelectedArtists} />

            <EraSelect selectedEras={selectedEras} onEraChange={setSelectedEras} />

            <MoodSelect selectedMoods={selectedMoods} onMoodChange={setSelectedMoods} />

            <Button
              className="w-full gradient-button hover:opacity-90 text-white"
              onClick={handleCreatePlaylist}
              disabled={
                selectedArtists.length === 0 || selectedEras.length === 0 || selectedMoods.length === 0 || isLoading
              }
            >
              {isLoading ? "Creating..." : "Create Playlist"}
            </Button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
