import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Projects by NovaXen — including Salad Tools, Salad Machine Renamer, and more open-source work at NovaTech.gg.',
  openGraph: {
    title: 'Projects — NovaTech.gg',
    description:
      'Projects by NovaXen — including Salad Tools, Salad Machine Renamer, and more open-source work at NovaTech.gg.',
    url: 'https://novatech.gg/projects',
  },
  alternates: {
    canonical: 'https://novatech.gg/projects',
  },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
