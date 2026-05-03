'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.055)',
        backgroundColor: 'rgba(14,13,12,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <div className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="text-xl transition-opacity duration-200 hover:opacity-80"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              color: '#e8945a',
            }}
          >
            Nova
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-3 py-1.5 text-sm font-medium transition-colors duration-200 rounded-lg"
                  style={{ color: isActive ? '#e8945a' : '#5a554f' }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = '#8a8078'
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = '#5a554f'
                  }}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-3 right-3 h-px rounded-full"
                      style={{ backgroundColor: '#e8945a', opacity: 0.6 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
