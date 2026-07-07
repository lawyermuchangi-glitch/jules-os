import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'JULEX OS',
  description: 'AI-powered practice management for Kenyan advocates',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
