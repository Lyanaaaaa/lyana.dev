import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Lyana Aqilah - Software Engineer',
  description: 'Full-stack engineer specializing in customer-facing web apps, workflow automation, and systems that scale without drama.',
  keywords: ['software engineer', 'full-stack developer', 'web development', 'automation'],
  authors: [{ name: 'Lyana Aqilah' }],
  openGraph: {
    title: 'Lyana Aqilah - Software Engineer',
    description: 'Full-stack engineer specializing in customer-facing web apps, workflow automation, and systems that scale without drama.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}