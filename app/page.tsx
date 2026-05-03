'use client'

import { Github, MapPin, Mail, ExternalLink, Code2 } from 'lucide-react'
import { DiscordPresence } from '@/components/discord-presence'
import { Weather } from '@/components/weather'
import { Background } from '@/components/background'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

const ChromeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z" />
  </svg>
)

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
  </svg>
)

const techStack = [
  {
    name: 'JavaScript',
    svg: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    svg: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
      </svg>
    ),
  },
  {
    name: 'React',
    svg: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    svg: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
      </svg>
    ),
  },
  {
    name: 'Tailwind',
    svg: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    svg: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0 l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z" />
      </svg>
    ),
  },
]

const socials = [
  { href: 'https://github.com/NovaXen', label: 'NovaXen', Icon: Github },
  { href: 'https://x.com/NovaXen_', label: '@NovaXen_', Icon: XIcon },
  { href: 'https://discord.gg/fzKaVak2EJ', label: 'Discord Server', Icon: DiscordIcon },
  { href: 'mailto:Bread@Novatech.gg', label: 'Bread@Novatech.gg', Icon: Mail },
]

export default function Page() {
  const [mounted, setMounted] = useState(false)
  const [timeDigits, setTimeDigits] = useState<{ char: string; key: number }[]>([])
  const [dayText, setDayText] = useState('')
  const digitKeyRef = useRef(0)
  const prevDigitsRef = useRef<{ char: string; key: number }[]>([])

  useEffect(() => {
    setMounted(true)
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
      const dayNum = parseInt(day)
      const suffix =
        dayNum === 1 || dayNum === 21 || dayNum === 31
          ? 'st'
          : dayNum === 2 || dayNum === 22
          ? 'nd'
          : dayNum === 3 || dayNum === 23
          ? 'rd'
          : 'th'
      setDayText(`${weekday} ${day}${suffix}`)
      const currentTimeStr = timeStr.toUpperCase()
      const prevDigits = prevDigitsRef.current
      const newDigits = currentTimeStr.split('').map((char, i) => {
        const prevDigit = prevDigits[i]
        if (!prevDigit || char !== prevDigit.char) {
          digitKeyRef.current += 1
          return { char, key: digitKeyRef.current }
        }
        return { char, key: prevDigit.key }
      })
      prevDigitsRef.current = newDigits
      setTimeDigits(newDigits)
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: '#0e0d0c', color: '#ede8e3' }}>
      <Background />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10">
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <header
          className={`pt-28 pb-10 transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ borderBottom: '1px solid rgba(255,255,255,0.055)' }}
        >
          <div className="flex items-start justify-between flex-wrap gap-4 mb-2">
            <span
              className="text-[11px] tracking-[0.2em] uppercase font-medium"
              style={{ color: '#e8945a' }}
            >
              Developer &amp; Community Manager
            </span>
            <div
              className="flex items-center gap-2.5 font-code"
              style={{ fontSize: '11px', color: '#4a4540' }}
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3" />
                Cambridge, UK
              </span>
              <span style={{ color: '#2a2826' }}>·</span>
              {mounted && (
                <>
                  <span>{dayText}</span>
                  <span style={{ color: '#2a2826' }}>·</span>
                  <div className="flex">
                    {timeDigits.map((digit) => (
                      <span
                        key={digit.key}
                        style={{
                          animation:
                            digit.char !== ' ' && digit.char !== ':'
                              ? 'digitPop 0.3s ease-out'
                              : 'none',
                        }}
                      >
                        {digit.char}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <h1
            className="leading-[0.88] tracking-tight"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(4rem, 12vw, 9rem)',
            }}
          >
            Nova<span style={{ color: '#e8945a' }}>.</span>
          </h1>

          <p
            className="mt-5 text-base md:text-lg leading-relaxed max-w-lg"
            style={{ color: '#8a8078' }}
          >
            20yo developer from the UK, building small projects in my free time and
            working as a Community Manager.
          </p>
        </header>

        {/* ── Content grid ─────────────────────────────────────────────────── */}
        <div
          className={`mt-8 pb-20 grid lg:grid-cols-[1fr_320px] gap-8 items-start transition-all duration-700 delay-100 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Left column */}
          <div className="space-y-8">
            {/* Tech stack */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-3 h-3" style={{ color: '#4a4540' }} />
                <h2
                  className="text-[10px] tracking-[0.2em] uppercase font-medium"
                  style={{ color: '#4a4540' }}
                >
                  Tech Stack
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="group flex items-center gap-2 px-3 py-1.5 rounded-xl cursor-default transition-all duration-200"
                    style={{
                      background: '#161412',
                      border: '1px solid rgba(255,255,255,0.055)',
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
                    <span style={{ color: '#6b6560' }}>{tech.svg}</span>
                    <span className="text-sm" style={{ color: '#8a8078' }}>
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Social links */}
            <section style={{ borderTop: '1px solid rgba(255,255,255,0.055)', paddingTop: '1.75rem' }}>
              <h2
                className="text-[10px] tracking-[0.2em] uppercase font-medium mb-4"
                style={{ color: '#4a4540' }}
              >
                Links
              </h2>
              <div className="flex flex-wrap gap-2">
                {socials.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target={social.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="group flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{
                      background: '#161412',
                      border: '1px solid rgba(255,255,255,0.055)',
                      color: '#8a8078',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = 'rgba(232,148,90,0.3)'
                      el.style.background = '#1a1714'
                      el.style.color = '#ede8e3'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = 'rgba(255,255,255,0.055)'
                      el.style.background = '#161412'
                      el.style.color = '#8a8078'
                    }}
                  >
                    <social.Icon className="w-4 h-4 flex-shrink-0" />
                    {social.label}
                  </a>
                ))}
              </div>
            </section>

            {/* Featured project */}
            <section style={{ borderTop: '1px solid rgba(255,255,255,0.055)', paddingTop: '1.75rem' }}>
              <h2
                className="text-[10px] tracking-[0.2em] uppercase font-medium mb-4"
                style={{ color: '#4a4540' }}
              >
                Featured Project
              </h2>
              <a
                href="https://salad-tools.novatech.gg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-3 p-5 rounded-2xl transition-all duration-200 cursor-pointer"
                style={{
                  background: '#161412',
                  border: '1px solid rgba(255,255,255,0.055)',
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
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: '#e8945a' }}
                      />
                      <span
                        className="text-[10px] tracking-[0.15em] uppercase font-medium"
                        style={{ color: '#4a4540' }}
                      >
                        Live Site
                      </span>
                    </div>
                    <h3 className="text-base font-medium" style={{ color: '#ede8e3' }}>
                      Salad Tools
                    </h3>
                  </div>
                  <ExternalLink
                    className="w-4 h-4 flex-shrink-0 transition-all duration-200"
                    style={{ color: '#4a4540' }}
                  />
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#6b6560' }}>
                  A collection of tools built for Salad miners — including the Machine
                  Renamer, demand checker, and more. All in one place.
                </p>
                <div className="flex gap-2">
                  {['JavaScript', 'Web', 'Browser Extension'].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium"
                      style={{
                        background: 'rgba(232,148,90,0.08)',
                        color: '#e8945a',
                        border: '1px solid rgba(232,148,90,0.15)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            </section>
          </div>

          {/* Right sidebar */}
          <div
            className={`space-y-4 transition-all duration-700 delay-200 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <DiscordPresence />
            <Weather />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes digitPop {
          0% { transform: translateY(-3px); opacity: 0.4; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
