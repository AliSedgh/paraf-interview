import type { Metadata } from 'next'

import { AppProviders } from '@/providers'
import { cn } from '@/lib/utils'

import { yekan } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Paraf',
  description: 'Paraf front-end application',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl" className={cn('font-sans', yekan.variable)}>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
