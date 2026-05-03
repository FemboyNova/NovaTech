import React from "react"
import type { Metadata } from 'next'

import './globals.css'
import { Navigation } from '@/components/navigation'

export const metadata: Metadata = {
  metadataBase: new URL('https://novatech.gg'),
  title: {
    default: 'NovaXen — NovaTech.gg',
    template: '%s — NovaTech.gg',
  },
  description:
    'NovaXen — 20-year-old developer and community manager from the UK. Building tools and projects at NovaTech.gg.',
  keywords: [
    'NovaXen',
    'NovaTech',
    'NovaTech.gg',
    'developer',
    'community manager',
    'UK',
    'web development',
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Salad Tools',
  ],
  authors: [{ name: 'NovaXen', url: 'https://novatech.gg' }],
  creator: 'NovaXen',
  openGraph: {
    title: 'NovaXen — NovaTech.gg',
    description:
      'NovaXen — 20-year-old developer and community manager from the UK. Building tools and projects at NovaTech.gg.',
    url: 'https://novatech.gg',
    siteName: 'NovaTech.gg',
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary',
    title: 'NovaXen — NovaTech.gg',
    description:
      'NovaXen — 20-year-old developer and community manager from the UK. Building tools and projects at NovaTech.gg.',
    creator: '@NovaXen_',
    site: '@NovaXen_',
  },
  icons: {
    icon: '/favicon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://novatech.gg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-GB">
      <body className="font-sans antialiased">
        <Navigation />
        {children}
      </body>
    </html>
  )
}
