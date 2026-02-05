'use client'

import { useEffect, useState } from 'react'
import { Clock, Gamepad2, Music } from 'lucide-react'

interface LanyardData {
  discord_user: {
    username: string
    global_name: string
    avatar: string
    id: string
  }
  discord_status: 'online' | 'idle' | 'dnd' | 'offline'
  activities: Array<{
    name: string
    type: number
    state?: string
    details?: string
    assets?: {
      large_image?: string
      large_text?: string
      small_image?: string
      small_text?: string
    }
  }>
}

export function DiscordPresence() {
  const [data, setData] = useState<LanyardData | null>(null)
  const [time, setTime] = useState('')

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

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      
      const weekday = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London',
        weekday: 'long',
      }).format(now)
      
      const day = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London',
        day: 'numeric',
      }).format(now)
      
      const timeStr = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(now)
      
      // Add ordinal suffix to day
      const dayNum = parseInt(day)
      const suffix = dayNum === 1 || dayNum === 21 || dayNum === 31 ? 'st'
        : dayNum === 2 || dayNum === 22 ? 'nd'
        : dayNum === 3 || dayNum === 23 ? 'rd'
        : 'th'
      
      setTime(`${weekday} ${day}${suffix} ${timeStr.toUpperCase()}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

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

  const avatarUrl = data.discord_user.avatar
    ? `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.${data.discord_user.avatar.startsWith('a_') ? 'gif' : 'webp'}?size=128`
    : `https://cdn.discordapp.com/embed/avatars/${parseInt(data.discord_user.id) % 5}.png`

  return (
    <div className="h-full p-6 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-indigo-500/30 group">
      <div className="relative z-10 h-full flex flex-col">
        {/* Header with avatar and status */}
        <div className="flex items-center gap-4 mb-5">
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
            <p className="font-bold text-white text-lg leading-tight">
              {data.discord_user.global_name || data.discord_user.username}
            </p>
            <p className="text-sm text-zinc-400">
              {statusLabels[data.discord_status]}
            </p>
          </div>
        </div>

        {/* Activity */}
        {currentActivity && (
          <div className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/5 mb-4">
            <div className="flex items-center gap-2 mb-2">
              {currentActivity.type === 0 ? (
                <Gamepad2 className="w-4 h-4 text-green-400" />
              ) : (
                <Music className="w-4 h-4 text-green-400" />
              )}
              <span className="text-xs font-medium text-green-400 uppercase tracking-wider">
                {currentActivity.type === 0 ? 'Playing' : 'Listening'}
              </span>
            </div>
            <p className="font-semibold text-white truncate">{currentActivity.name}</p>
            {currentActivity.details && (
              <p className="text-sm text-zinc-400 truncate mt-1">{currentActivity.details}</p>
            )}
            {currentActivity.state && (
              <p className="text-sm text-zinc-500 truncate">{currentActivity.state}</p>
            )}
          </div>
        )}

        {/* Local Time */}
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-white/5">
            <Clock className="w-4 h-4 text-zinc-400" />
          </div>
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider">Local Time</p>
            <p className="text-lg font-mono font-bold text-white tabular-nums">{time}</p>
          </div>
        </div>
      </div>
      
      {/* Decorative glow */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  )
}
