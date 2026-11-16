import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import { Caveat, Inter, JetBrains_Mono, Sora } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const sora = Sora({ subsets: ['latin'], variable: '--font-sora', weight: ['600', '700', '800'], display: 'swap' })
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat', weight: ['400', '600'], display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400', '500'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Lyana Aqilah - Software Engineer',
  description:
    'Full-stack engineer in Malaysia. Co-built the Dourr rental marketplace, built the Autorentic tenant app in Flutter, and runs AI agent pipelines that audit and verify product UX.',
  keywords: ['software engineer', 'full-stack developer', 'Laravel', 'Next.js', 'Flutter', 'AI agents', 'Claude Code', 'Malaysia'],
  authors: [{ name: 'Lyana Aqilah' }],
  openGraph: {
    title: 'Lyana Aqilah - Software Engineer',
    description:
      'Full-stack engineer on web and mobile. Live products, a bilingual Flutter app, and AI agents that audit and verify UX.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#05010f',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${caveat.variable} ${mono.variable}`}>
      <body className="font-sans">
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
