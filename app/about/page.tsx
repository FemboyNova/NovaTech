'use client'

import { MapPin, Calendar, Briefcase } from 'lucide-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Background } from '@/components/background'

const games = [
  {
    label: 'CS2',
    logo: 'https://cdn.cloudflare.steamstatic.com/apps/csgo/images/csgo_react/global/logo_cs_sm.svg',
  },
  { label: 'BeamNG.drive', logo: '/BeamNG-Logo.png' },
  { label: 'Stardew Valley', logo: '/Star-Logo.png' },
]

const experience = [
  {
    role: 'Community Manager',
    company: 'Team Nemesis',
    period: '04/2025 – Present',
    current: true,
    logo: '/Nemesis-Logo.png',
  },
  {
    role: 'Community Manager',
    company: 'Into The Breach',
    period: '08/2024 – 01/2025',
    current: false,
    logo: '/ITB-Logo.png',
  },
]

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: '#0e0d0c', color: '#ede8e3' }}>
      <Background />

      <main className="relative z-10 max-w-5xl mx-auto px-6 md:px-10">
        {/* ── Header ────────────────────────────────────────────────────────── */}
        <header
          className={`pt-28 pb-10 transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ borderBottom: '1px solid rgba(255,255,255,0.055)' }}
        >
          <span
            className="text-[11px] tracking-[0.2em] uppercase font-medium block mb-2"
            style={{ color: '#e8945a' }}
          >
            About Me
          </span>
          <h1
            className="leading-[0.88] tracking-tight"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(3rem, 9vw, 7rem)',
            }}
          >
            Hey there<span style={{ color: '#e8945a' }}>.</span>
          </h1>
          <p className="mt-5 text-base md:text-lg leading-relaxed max-w-lg" style={{ color: '#8a8078' }}>
            Get to know me a little better.
          </p>
        </header>

        {/* ── Content ───────────────────────────────────────────────────────── */}
        <div className="mt-8 pb-20 space-y-8">
          {/* Bio + Experience row */}
          <div
            className={`grid md:grid-cols-2 gap-6 transition-all duration-700 delay-100 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Bio */}
            <div
              className="p-6 rounded-2xl"
              style={{ background: '#161412', border: '1px solid rgba(255,255,255,0.055)' }}
            >
              <h2
                className="text-[10px] tracking-[0.2em] uppercase font-medium mb-5"
                style={{ color: '#4a4540' }}
              >
                Bio
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: '#8a8078' }}>
                I&apos;m Nova, 20 years old from the UK. I code in my spare time on projects I
                find fun and also work as a Community Manager for Team Nemesis.
              </p>
              <div
                className="flex flex-wrap gap-3 pt-5"
                style={{ borderTop: '1px solid rgba(255,255,255,0.055)' }}
              >
                <span
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm"
                  style={{
                    background: 'rgba(232,148,90,0.08)',
                    border: '1px solid rgba(232,148,90,0.15)',
                    color: '#e8945a',
                  }}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  United Kingdom
                </span>
                <span
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm"
                  style={{
                    background: 'rgba(232,148,90,0.08)',
                    border: '1px solid rgba(232,148,90,0.15)',
                    color: '#e8945a',
                  }}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  20 years old
                </span>
              </div>
            </div>

            {/* Work Experience */}
            <div
              className="p-6 rounded-2xl"
              style={{ background: '#161412', border: '1px solid rgba(255,255,255,0.055)' }}
            >
              <div className="flex items-center gap-2 mb-5">
                <Briefcase className="w-3 h-3" style={{ color: '#4a4540' }} />
                <h2
                  className="text-[10px] tracking-[0.2em] uppercase font-medium"
                  style={{ color: '#4a4540' }}
                >
                  Work Experience
                </h2>
              </div>
              <div className="space-y-3">
                {experience.map((job, index) => (
                  <div
                    key={index}
                    className="relative flex items-center gap-4 p-4 rounded-xl transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(255,255,255,0.04)',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = 'rgba(232,148,90,0.2)'
                      el.style.background = 'rgba(232,148,90,0.04)'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = 'rgba(255,255,255,0.04)'
                      el.style.background = 'rgba(255,255,255,0.025)'
                    }}
                  >
                    {job.current && (
                      <span
                        className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-medium font-code"
                        style={{
                          background: 'rgba(74,222,128,0.1)',
                          color: '#4ade80',
                          border: '1px solid rgba(74,222,128,0.2)',
                        }}
                      >
                        Current
                      </span>
                    )}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0"
                      style={{ background: 'rgba(255,255,255,0.06)' }}
                    >
                      <Image
                        src={job.logo}
                        alt={job.company}
                        width={28}
                        height={28}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium" style={{ color: '#ede8e3' }}>
                        {job.role}
                      </p>
                      <p className="text-sm" style={{ color: '#8a8078' }}>
                        {job.company}
                      </p>
                      <p className="text-xs mt-0.5 font-code" style={{ color: '#4a4540' }}>
                        {job.period}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Games */}
          <div
            className={`p-6 rounded-2xl transition-all duration-700 delay-200 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ background: '#161412', border: '1px solid rgba(255,255,255,0.055)' }}
          >
            <h2
              className="text-[10px] tracking-[0.2em] uppercase font-medium mb-5"
              style={{ color: '#4a4540' }}
            >
              Games I Play
            </h2>
            <div className="flex flex-wrap gap-3">
              {games.map((game, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-default transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.04)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'rgba(232,148,90,0.25)'
                    el.style.background = 'rgba(232,148,90,0.04)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'rgba(255,255,255,0.04)'
                    el.style.background = 'rgba(255,255,255,0.025)'
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  >
                    <Image
                      src={game.logo}
                      alt={game.label}
                      width={22}
                      height={22}
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <span className="text-sm font-medium" style={{ color: '#8a8078' }}>
                    {game.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
