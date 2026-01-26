import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'
import './globals.css'

const robotoMono = Roboto_Mono({ 
    subsets: ['latin'],
    variable: '--font-roboto-mono',
    weight: ['400', '500', '600', '700'],
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
    <html lang="en" className={robotoMono.variable}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}