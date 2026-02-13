'use client'

import { Github, ExternalLink } from 'lucide-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const ChromeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z"/>
  </svg>
)

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

const projects = [
  {
    title: 'Salad Machine Renamer',
    description: 'A utility tool for renaming and managing Salad machines. Makes it easy to organize and identify your salad rigs.',
    tech: ['JavaScript', 'Browser Extension'],
    github: 'https://github.com/FemboyNova/Salad-Machine-Renamer',
    firefox: 'https://addons.mozilla.org/en-GB/firefox/addon/salad-machine-renamer/',
    chrome: 'https://chromewebstore.google.com/detail/apehjenffjjamcpghbahankhcheepkdn',
  },
  {
    title: 'NovaTech Website',
    description: 'My personal website built with Next.js, Tailwind CSS, and TypeScript. Features a sleek dark theme with animated elements.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/FemboyNova/NovaTech',
    live: 'https://novatech.gg',
  },
]

export default function ProjectsPage() {
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
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-x-hidden">
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
      <main className="relative z-10 mx-auto max-w-6xl px-4 py-8 pt-24 md:px-8 md:py-16 md:pt-24 overflow-visible">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl md:text-6xl font-black tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 animate-gradient">
              Projects
            </span>
          </h1>
          <p className="text-lg text-zinc-400">
            A collection of things I&apos;ve built and contributed to
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group transition-all duration-700 hover:scale-[1.02] hover:-translate-y-1 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-full p-6 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 transition-all duration-300 hover:border-pink-500/50 hover:shadow-xl hover:shadow-pink-500/10 cursor-default">
                <div className="relative z-10">
                  <h3 className="mb-2 text-xl font-bold text-white">{project.title}</h3>
                  <p className="mb-4 text-sm text-zinc-400 leading-relaxed">{project.description}</p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-end">
                    <div className="flex items-center gap-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                        title="GitHub"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                      {project.firefox && (
                        <a
                          href={project.firefox}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg p-2 transition-colors hover:bg-white/5 group/firefox"
                          title="Firefox Add-on"
                        >
                          <Image
                            src="/Firefox.svg"
                            alt="Firefox"
                            width={20}
                            height={20}
                            className="opacity-60 group-hover/firefox:opacity-100 transition-opacity"
                            unoptimized
                          />
                        </a>
                      )}
                      {project.chrome && (
                        <a
                          href={project.chrome}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-blue-400"
                          title="Chrome Extension"
                        >
                          <ChromeIcon className="h-5 w-5" />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                          title="Live Demo"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>npm 
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
