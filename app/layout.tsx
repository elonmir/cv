import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import en from '@/data/cv.en.json'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: en.meta.title,
  description: en.meta.description,
  generator: 'v0.app',
  openGraph: {
    title: en.meta.title,
    description: en.meta.description,
    url: '/',
    siteName: 'Markus Reisenhofer CV',
    type: 'profile',
    images: [
      {
        url: '/og?lang=en',
        width: 1200,
        height: 630,
        alt: 'Markus Reisenhofer CV preview image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: en.meta.title,
    description: en.meta.description,
    images: ['/og?lang=en'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
