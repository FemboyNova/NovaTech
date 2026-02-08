'use client'

import { MapPin, Calendar } from 'lucide-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'

// Seeded random for consistent star positions
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

const generateStars = () =>
  [...Array(50)].map((_, i) => ({
    id: i,
    left: seededRandom(i * 1) * 100,
    top: seededRandom(i * 2 + 100) * 100,
    delay: seededRandom(i * 3 + 200) * 5,
    duration: 3 + seededRandom(i * 4 + 300) * 4,
  }))

const stars = generateStars()

const games = [
  { label: 'CS2', logo: 'https://cdn.cloudflare.steamstatic.com/apps/csgo/images/csgo_react/global/logo_cs_sm.svg' },
  { label: 'BeamNG.drive', logo: '/BeamNG-Logo.png' },
  { label: 'Stardew Valley', logo: '/Star-Logo.png' },
]

const experience = [
  {
    role: 'Community Manager',
    company: 'Team Nemesis',
    period: '04/2025 - Present',
    current: true,
    logo: '/Nemesis-Logo.png',
  },
  {
    role: 'Community Manager',
    company: 'Into The Breach',
    period: '08/2024 - 01/2025',
    current: false,
    logo: '/ITB-Logo.png',
  },
]

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-[120px] transition-all duration-1000 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 70%)',
            left: mousePosition.x - 300,
            top: mousePosition.y - 300,
          }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-violet-500/20 to-transparent rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-500/20 to-transparent rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
        
        {/* Floating Stars */}
        {mounted && (
          <div className="stars-container">
            {stars.map((star) => (
              <div
                key={star.id}
                className="star"
                style={{
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                  animationDelay: `${star.delay}s`,
                  animationDuration: `${star.duration}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <main className="relative z-10 mx-auto max-w-6xl px-4 py-8 pt-24 md:px-8 md:py-16 md:pt-24">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl md:text-6xl font-black tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 animate-gradient">
              About Me
            </span>
          </h1>
          <p className="text-lg text-zinc-400">
            Get to know me a little better
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(120px,auto)]">
          
          {/* Bio Card - Large */}
          <div 
            className={`md:col-span-2 row-span-2 group transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '0ms' }}
          >
            <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-pink-500/50 hover:scale-[1.02] hover:shadow-xl hover:shadow-pink-500/10">
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(45deg, transparent 40%, rgba(236,72,153,0.1) 50%, transparent 60%)', backgroundSize: '200% 200%', animation: 'shimmer 3s infinite' }} />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-pink-500/20 to-violet-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <h2 className="mb-4 text-3xl font-bold text-white">Hey there!</h2>
                  <div className="text-zinc-400 leading-relaxed text-lg">
                    <p>
                      I&apos;m Nova, 20yo from the UK. I code in my spare time on projects I find 
                      fun and also work as a Community Manager for Team Nemesis.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-4 text-sm text-zinc-500">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-pink-400" />
                    United Kingdom
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-cyan-400" />
                    20 years old
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Work Experience Card - Tall */}
          <div 
            className={`md:col-span-1 lg:col-span-2 row-span-2 group transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="relative h-full p-6 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-pink-500/50 hover:scale-[1.02] hover:shadow-xl hover:shadow-pink-500/10">
              <div className="relative z-10">
                <h2 className="mb-5 text-xl font-bold text-white">Work Experience</h2>
                <div className="space-y-3">
                  {experience.map((job, index) => (
                    <div
                      key={index}
                      className="relative rounded-xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 hover:border-pink-500/30 hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 cursor-default group/job"
                    >
                      {job.current && (
                        <span className="absolute top-3 right-3 rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">
                          Current
                        </span>
                      )}
                      <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-white/10 p-2 w-12 h-12 flex items-center justify-center overflow-hidden flex-shrink-0 group-hover/job:bg-white/20 transition-colors">
                          <Image
                            src={job.logo}
                            alt={job.company}
                            width={32}
                            height={32}
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-zinc-300 text-sm group-hover/job:text-white transition-colors">{job.role}</h3>
                          <p className="text-sm text-zinc-400 group-hover/job:text-zinc-300 transition-colors">{job.company}</p>
                          <p className="text-xs text-zinc-500 mt-0.5">{job.period}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Games Card - Wide */}
          <div 
            className={`md:col-span-2 lg:col-span-2 group transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="relative h-full p-6 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-pink-500/50 hover:scale-[1.02] hover:shadow-xl hover:shadow-pink-500/10">
              <div className="relative z-10">
                <h2 className="mb-4 text-xl font-bold text-white">Games I Play</h2>
                <div className="flex flex-wrap gap-3">
                  {games.map((game, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3 hover:bg-white/10 hover:border-cyan-500/30 hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 cursor-default group/game"
                    >
                      <div className="rounded-lg bg-white/10 p-1.5 w-9 h-9 flex items-center justify-center overflow-hidden group-hover/game:bg-white/20 transition-colors">
                        <Image
                          src={game.logo}
                          alt={game.label}
                          width={24}
                          height={24}
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                      <span className="font-medium text-zinc-300 text-sm group-hover/game:text-white transition-colors">{game.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .stars-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          animation: twinkle ease-in-out infinite, float ease-in-out infinite;
          box-shadow: 0 0 4px rgba(255,255,255,0.5);
        }
      `}</style>
    </div>
  )
}
