'use client'

import { Github, ExternalLink } from 'lucide-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Background } from '@/components/background'

const ChromeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z" />
  </svg>
)

const projects = [
  {
    index: '01',
    title: 'Salad Tools',
    description:
      'A collection of tools built for Salad miners — including the Machine Renamer, demand checker, and more. All in one place.',
    tech: ['JavaScript', 'Web', 'Browser Extension'],
    live: 'https://salad-tools.novatech.gg',
  },
  {
    index: '02',
    title: 'Salad Machine Renamer',
    description:
      'A utility tool for renaming and managing Salad machines. Makes it easy to organize and identify your salad rigs.',
    tech: ['JavaScript', 'Browser Extension'],
    github: 'https://github.com/NovaXen/Salad-Machine-Renamer',
    firefox: 'https://addons.mozilla.org/en-GB/firefox/addon/salad-machine-renamer/',
    chrome: 'https://chromewebstore.google.com/detail/apehjenffjjamcpghbahankhcheepkdn',
  },
  {
    index: '03',
    title: 'NovaTech Website',
    description:
      'My personal website built with Next.js, Tailwind CSS, and TypeScript. Features a clean dark theme with animated elements.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/NovaXen/NovaTech',
    live: 'https://novatech.gg',
  },
]

export default function ProjectsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: '#0e0d0c', color: '#ede8e3' }}>
      <Background />

      <main className="relative z-10 max-w-5xl mx-auto px-6 md:px-10">
        {/* ── Header ─────────────────────────────────────────────────────────── */}
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
            My Work
          </span>
          <h1
            className="leading-[0.88] tracking-tight"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(3rem, 9vw, 7rem)',
            }}
          >
            Projects<span style={{ color: '#e8945a' }}>.</span>
          </h1>
          <p className="mt-5 text-base md:text-lg leading-relaxed max-w-lg" style={{ color: '#8a8078' }}>
            A collection of things I&apos;ve built and contributed to.
          </p>
        </header>

        {/* ── Project list ────────────────────────────────────────────────────── */}
        <div className="mt-8 pb-20 space-y-4">
          {projects.map((project, i) => (
            <div
              key={project.index}
              className={`group p-6 rounded-2xl transition-all duration-700 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{
                background: '#161412',
                border: '1px solid rgba(255,255,255,0.055)',
                transitionDelay: `${i * 80 + 100}ms`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(232,148,90,0.3)'
                el.style.background = '#1a1714'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(255,255,255,0.055)'
                el.style.background = '#161412'
              }}
            >
              <div className="flex items-start gap-5">
                {/* Index number */}
                <span
                  className="text-4xl leading-none flex-shrink-0 select-none mt-0.5"
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontStyle: 'italic',
                    color: 'rgba(232,148,90,0.2)',
                  }}
                >
                  {project.index}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h2 className="text-lg font-medium" style={{ color: '#ede8e3' }}>
                      {project.title}
                    </h2>
                    {/* Action links */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg transition-all duration-200"
                        title="GitHub"
                        style={{ color: '#4a4540' }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement
                          el.style.color = '#ede8e3'
                          el.style.background = 'rgba(255,255,255,0.05)'
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement
                          el.style.color = '#4a4540'
                          el.style.background = 'transparent'
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      {project.firefox && (
                        <a
                          href={project.firefox}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg transition-all duration-200"
                          title="Firefox Add-on"
                          style={{ opacity: 0.45 }}
                          onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLElement).style.opacity = '1')
                          }
                          onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLElement).style.opacity = '0.45')
                          }
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Image
                            src="/Firefox.svg"
                            alt="Firefox"
                            width={16}
                            height={16}
                            className="object-contain"
                            unoptimized
                          />
                        </a>
                      )}
                      {project.chrome && (
                        <a
                          href={project.chrome}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg transition-all duration-200"
                          title="Chrome Extension"
                          style={{ color: '#4a4540' }}
                          onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLElement
                            el.style.color = '#ede8e3'
                            el.style.background = 'rgba(255,255,255,0.05)'
                          }}
                          onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLElement
                            el.style.color = '#4a4540'
                            el.style.background = 'transparent'
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ChromeIcon className="w-4 h-4" />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg transition-all duration-200"
                          title="Live Site"
                          style={{ color: '#4a4540' }}
                          onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLElement
                            el.style.color = '#e8945a'
                            el.style.background = 'rgba(232,148,90,0.08)'
                          }}
                          onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLElement
                            el.style.color = '#4a4540'
                            el.style.background = 'transparent'
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#6b6560' }}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          color: '#6b6560',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
