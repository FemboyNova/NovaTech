'use client'

import { useEffect, useState } from 'react'
import { Monitor, Smartphone, Globe } from 'lucide-react'

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

const getActivityImage = (activity: Activity): string | null => {
  const image = activity.assets?.large_image
  if (!image) return null
  if (image.startsWith('spotify:')) return `https://i.scdn.co/image/${image.slice(8)}`
  if (image.startsWith('mp:external/')) return `https://media.discordapp.net/external/${image.slice(12)}`
  if (activity.application_id) return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${image}.png`
  return null
}

const getEmojiUrl = (emoji: Activity['emoji']): string | null => {
  if (!emoji?.id) return null
  const ext = emoji.animated ? 'gif' : 'png'
  return `https://cdn.discordapp.com/emojis/${emoji.id}.${ext}`
}

const STATUS_COLORS: Record<string, string> = {
  online: '#4ade80',
  idle: '#facc15',
  dnd: '#f87171',
  offline: '#4a4540',
}

const STATUS_LABELS: Record<string, string> = {
  online: 'Online',
  idle: 'Idle',
  dnd: 'Do Not Disturb',
  offline: 'Offline',
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
        if (result.success) setData(result.data)
      } catch (error) {
        console.error('Failed to fetch Lanyard data:', error)
      }
    }
    fetchPresence()
    const interval = setInterval(fetchPresence, 30000)
    return () => clearInterval(interval)
  }, [])

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
      <div
        className="p-5 rounded-2xl animate-pulse"
        style={{ background: '#161412', border: '1px solid rgba(255,255,255,0.055)' }}
      >
        <div className="h-2 w-20 rounded mb-4" style={{ background: 'rgba(255,255,255,0.05)' }} />
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <div className="space-y-2 flex-1">
            <div className="h-3 rounded w-24" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <div className="h-2.5 rounded w-16" style={{ background: 'rgba(255,255,255,0.04)' }} />
          </div>
        </div>
        <div className="h-16 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }} />
      </div>
    )
  }

  const currentActivity = data.activities.find(
    (activity) => activity.type === 0 || activity.type === 2
  )
  const customStatus = data.activities.find((activity) => activity.type === 4)
  const activityImage =
    data.listening_to_spotify && data.spotify
      ? data.spotify.album_art_url
      : currentActivity
      ? getActivityImage(currentActivity)
      : null
  const avatarUrl = data.discord_user.avatar
    ? `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.${data.discord_user.avatar.startsWith('a_') ? 'gif' : 'webp'}?size=128`
    : `https://cdn.discordapp.com/embed/avatars/${parseInt(data.discord_user.id) % 5}.png`

  return (
    <div
      className="p-5 rounded-2xl transition-all duration-200"
      style={{ background: '#161412', border: '1px solid rgba(255,255,255,0.055)' }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,148,90,0.25)')
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.055)')
      }
    >
      {/* Section label */}
      <p
        className="text-[10px] tracking-[0.2em] uppercase font-medium mb-4"
        style={{ color: '#4a4540' }}
      >
        Discord Status
      </p>

      {/* Avatar + name */}
      <div className="flex items-center gap-3 mb-3">
        <div className="relative flex-shrink-0">
          <img
            src={avatarUrl}
            alt="Discord avatar"
            className="w-11 h-11 rounded-full"
          />
          <div
            className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full"
            style={{
              background: STATUS_COLORS[data.discord_status],
              boxShadow: `0 0 0 2px #161412`,
            }}
          >
            {data.discord_status === 'online' && (
              <div
                className="absolute inset-0 rounded-full animate-ping opacity-50"
                style={{ background: STATUS_COLORS[data.discord_status] }}
              />
            )}
          </div>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-medium truncate" style={{ color: '#ede8e3' }}>
              {data.discord_user.global_name || data.discord_user.username}
            </p>
            {data.active_on_discord_desktop && (
              <Monitor className="w-3 h-3 flex-shrink-0" style={{ color: '#4a4540' }} />
            )}
            {data.active_on_discord_mobile && (
              <Smartphone className="w-3 h-3 flex-shrink-0" style={{ color: '#4a4540' }} />
            )}
            {data.active_on_discord_web && (
              <Globe className="w-3 h-3 flex-shrink-0" style={{ color: '#4a4540' }} />
            )}
          </div>
          <p className="text-xs" style={{ color: '#6b6560' }}>
            {STATUS_LABELS[data.discord_status]}
          </p>
        </div>
      </div>

      {/* Custom status */}
      {customStatus?.state && (
        <p className="text-xs mb-3 flex items-center gap-1.5 italic" style={{ color: '#6b6560' }}>
          {customStatus.emoji &&
            (getEmojiUrl(customStatus.emoji) ? (
              <img
                src={getEmojiUrl(customStatus.emoji)!}
                alt={customStatus.emoji.name}
                className="w-3.5 h-3.5 flex-shrink-0"
              />
            ) : (
              <span>{customStatus.emoji.name}</span>
            ))}
          &ldquo;{customStatus.state}&rdquo;
        </p>
      )}

      {/* Activity */}
      {currentActivity && (
        <div
          className="p-3.5 rounded-xl"
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          <div className="flex gap-3 items-center">
            {activityImage && (
              <div className="relative flex-shrink-0">
                <img
                  src={activityImage}
                  alt="Activity"
                  className="w-14 h-14 rounded-lg object-cover"
                />
                {data.listening_to_spotify && (
                  <div
                    className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: '#1DB954', boxShadow: '0 0 0 2px #161412' }}
                  >
                    <svg className="w-2.5 h-2.5 text-black" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                  </div>
                )}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p
                className="text-[10px] uppercase tracking-[0.12em] mb-1 font-medium"
                style={{ color: data.listening_to_spotify ? '#1DB954' : '#6b6560' }}
              >
                {currentActivity.type === 0 ? 'Playing' : 'Listening to Spotify'}
              </p>
              {data.listening_to_spotify && data.spotify ? (
                <>
                  <p className="text-sm font-medium truncate" style={{ color: '#ede8e3' }}>
                    {data.spotify.song}
                  </p>
                  <p className="text-xs truncate mt-0.5" style={{ color: '#6b6560' }}>
                    by {data.spotify.artist}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium truncate" style={{ color: '#ede8e3' }}>
                    {currentActivity.name}
                  </p>
                  {currentActivity.details && (
                    <p className="text-xs truncate mt-0.5" style={{ color: '#6b6560' }}>
                      {currentActivity.details}
                    </p>
                  )}
                  {currentActivity.state && (
                    <p className="text-xs truncate" style={{ color: '#4a4540' }}>
                      {currentActivity.state}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Spotify progress bar */}
          {data.listening_to_spotify && data.spotify && (
            <div className="mt-3">
              <div
                className="h-px rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${spotifyProgress}%`, background: '#1DB954' }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span
                  className="text-[10px] font-code"
                  style={{ color: '#4a4540' }}
                >
                  {spotifyElapsed}
                </span>
                <span
                  className="text-[10px] font-code"
                  style={{ color: '#4a4540' }}
                >
                  {spotifyDuration}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
