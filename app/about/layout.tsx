import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about NovaXen — 20-year-old developer and Community Manager for Team Nemesis, based in Cambridge, UK.',
  openGraph: {
    title: 'About NovaXen — NovaTech.gg',
    description:
      'Learn about NovaXen — 20-year-old developer and Community Manager for Team Nemesis, based in Cambridge, UK.',
    url: 'https://novatech.gg/about',
  },
  alternates: {
    canonical: 'https://novatech.gg/about',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
