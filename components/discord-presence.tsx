'use client'

import { useEffect, useState } from 'react'
import { Gamepad2, Music, Monitor, Smartphone, Globe } from 'lucide-react'

interface Activity {
  name: string
  type: number
  state?: string
  details?: string
  application_id?: string
  assets?: {
    large_image?: string
    large_text?: string
    small_image?: string
    small_text?: string
  }
  emoji?: {
    id?: string
    name: string
    animated?: boolean
  }
}

interface SpotifyData {
  album: string
  album_art_url: string
  artist: string
  song: string
  track_id: string
  timestamps: {
    start: number
    end: number
  }
}

interface LanyardData {
  discord_user: {
    username: string
    global_name: string
    avatar: string
    id: string
  }
  discord_status: 'online' | 'idle' | 'dnd' | 'offline'
  activities: Activity[]
  listening_to_spotify: boolean
  spotify?: SpotifyData
  active_on_discord_desktop: boolean
  active_on_discord_mobile: boolean
  active_on_discord_web: boolean
}

// Get activity image URL from various sources
const getActivityImage = (activity: Activity): string | null => {
  const image = activity.assets?.large_image
  if (!image) return null

  if (image.startsWith('spotify:')) {
    return `https://i.scdn.co/image/${image.slice(8)}`
  }
  if (image.startsWith('mp:external/')) {
    return `https://media.discordapp.net/external/${image.slice(12)}`
  }
  // Discord app asset
  if (activity.application_id) {
    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${image}.png`
  }
  return null
}

// Get custom status emoji URL
const getEmojiUrl = (emoji: Activity['emoji']): string | null => {
  if (!emoji?.id) return null
  const ext = emoji.animated ? 'gif' : 'png'
  return `https://cdn.discordapp.com/emojis/${emoji.id}.${ext}`
}

export function DiscordPresence() {
  const [data, setData] = useState<LanyardData | null>(null)
  const [spotifyProgress, setSpotifyProgress] = useState(0)
  const [spotifyElapsed, setSpotifyElapsed] = useState('')
  const [spotifyDuration, setSpotifyDuration] = useState('')

  useEffect(() => {
    const fetchPresence = async () => {
      try {
        const response = await fetch('https://api.lanyard.rest/v1/users/714702739908722742')
        const result = await response.json()
        if (result.success) {
          setData(result.data)
        }
      } catch (error) {
        console.error('Failed to fetch Lanyard data:', error)
      }
    }

    fetchPresence()
    const interval = setInterval(fetchPresence, 30000)
    return () => clearInterval(interval)
  }, [])

  // Spotify progress bar
  useEffect(() => {
    if (!data?.listening_to_spotify || !data?.spotify?.timestamps) {
      setSpotifyProgress(0)
      return
    }

    const updateProgress = () => {
      const now = Date.now()
      const { start, end } = data.spotify!.timestamps
      const duration = end - start
      const elapsed = now - start
      const progress = Math.min(Math.max((elapsed / duration) * 100, 0), 100)
      
      // Format time as m:ss
      const formatTime = (ms: number) => {
        const seconds = Math.floor(ms / 1000)
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
      }
      
      setSpotifyProgress(progress)
      setSpotifyElapsed(formatTime(Math.max(elapsed, 0)))
      setSpotifyDuration(formatTime(duration))
    }

    updateProgress()
    const interval = setInterval(updateProgress, 1000)
    return () => clearInterval(interval)
  }, [data?.listening_to_spotify, data?.spotify?.timestamps?.start])

  if (!data) {
    return (
      <div className="h-full p-6 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10">
        <div className="animate-pulse space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10" />
            <div className="space-y-2">
              <div className="h-4 bg-white/10 rounded w-24" />
              <div className="h-3 bg-white/10 rounded w-16" />
            </div>
          </div>
          <div className="h-3 bg-white/10 rounded w-3/4" />
        </div>
      </div>
    )
  }

  const statusColors = {
    online: 'bg-green-500',
    idle: 'bg-yellow-500',
    dnd: 'bg-red-500',
    offline: 'bg-zinc-500',
  }

  const statusGlow = {
    online: 'shadow-green-500/50',
    idle: 'shadow-yellow-500/50',
    dnd: 'shadow-red-500/50',
    offline: '',
  }

  const statusLabels = {
    online: 'Online',
    idle: 'Idle',
    dnd: 'Do Not Disturb',
    offline: 'Offline',
  }

  const currentActivity = data.activities.find(
    (activity) => activity.type === 0 || activity.type === 2
  )

  const customStatus = data.activities.find((activity) => activity.type === 4)

  // Get the activity image - prefer Spotify data if available
  const activityImage = data.listening_to_spotify && data.spotify
    ? data.spotify.album_art_url
    : currentActivity
      ? getActivityImage(currentActivity)
      : null

  const avatarUrl = data.discord_user.avatar
    ? `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.${data.discord_user.avatar.startsWith('a_') ? 'gif' : 'webp'}?size=128`
    : `https://cdn.discordapp.com/embed/avatars/${parseInt(data.discord_user.id) % 5}.png`

  return (
    <div className="h-full p-6 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-indigo-500/50 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/10 group">
      <div className="relative z-10 h-full flex flex-col">
        {/* Header with avatar and status */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-14 h-14 rounded-full ring-2 ring-white/10 group-hover:ring-indigo-500/30 transition-all"
            />
            <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full ${statusColors[data.discord_status]} ring-4 ring-[#0a0a0f] shadow-lg ${statusGlow[data.discord_status]}`}>
              {data.discord_status === 'online' && (
                <div className={`absolute inset-0 rounded-full ${statusColors[data.discord_status]} animate-ping opacity-75`} />
              )}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-bold text-white text-lg leading-tight">
                {data.discord_user.global_name || data.discord_user.username}
              </p>
              <span className="text-zinc-600">•</span>
              <span className="text-sm text-zinc-400">{statusLabels[data.discord_status]}</span>
              {data.active_on_discord_desktop && <span title="Desktop"><Monitor className="w-3.5 h-3.5 text-zinc-500" /></span>}
              {data.active_on_discord_mobile && <span title="Mobile"><Smartphone className="w-3.5 h-3.5" /></span>}
              {data.active_on_discord_web && <span title="Web"><Globe className="w-3.5 h-3.5 text-zinc-500" /></span>}
            </div>
            {customStatus?.state && (
              <p className="text-sm text-zinc-400 mt-1 italic flex items-center gap-1.5">
                {customStatus?.emoji && (
                  getEmojiUrl(customStatus.emoji) ? (
                    <img 
                      src={getEmojiUrl(customStatus.emoji)!} 
                      alt={customStatus.emoji.name}
                      className="w-4 h-4"
                    />
                  ) : (
                    <span>{customStatus.emoji.name}</span>
                  )
                )}
                "{customStatus.state}"
              </p>
            )}
          </div>
        </div>

        {/* Activity */}
        {currentActivity && (
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="flex gap-3 items-center">
              {/* Activity Image */}
              {activityImage && (
                <div className="flex-shrink-0 relative">
                  <img 
                    src={activityImage} 
                    alt="Activity"
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  {data.listening_to_spotify && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#1DB954] rounded-full flex items-center justify-center ring-2 ring-[#0a0a0f]">
                      <svg className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                    </div>
                  )}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {currentActivity.type === 0 ? (
                    <Gamepad2 className="w-3.5 h-3.5 text-green-400" />
                  ) : (
                    <Music className="w-3.5 h-3.5 text-[#1DB954]" />
                  )}
                  <span className="text-xs font-medium text-[#1DB954] uppercase tracking-wider">
                    {currentActivity.type === 0 ? 'Playing' : 'Listening to Spotify'}
                  </span>
                </div>
                {data.listening_to_spotify && data.spotify ? (
                  <>
                    <p className="font-semibold text-white truncate">{data.spotify.song}</p>
                    <p className="text-sm text-zinc-400 truncate">by {data.spotify.artist}</p>
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-white truncate">{currentActivity.name}</p>
                    {currentActivity.details && (
                      <p className="text-sm text-zinc-400 truncate">{currentActivity.details}</p>
                    )}
                    {currentActivity.state && (
                      <p className="text-sm text-zinc-500 truncate">{currentActivity.state}</p>
                    )}
                  </>
                )}
              </div>
            </div>
            {/* Spotify Progress Bar */}
            {data.listening_to_spotify && data.spotify && (
              <div className="mt-3">
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#1DB954] rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${spotifyProgress}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-zinc-500 font-mono">{spotifyElapsed}</span>
                  <span className="text-xs text-zinc-500 font-mono">{spotifyDuration}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Decorative glow */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  )
}
