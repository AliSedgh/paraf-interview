'use client'

import type { ReactNode } from 'react'

import { ErrorBoundary } from '@/shared/components/ErrorBoundary'
import { Toaster } from '@/components/ui/sonner'

import { QueryProvider } from './query-provider'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <QueryProvider>
        {children}
        <Toaster />
      </QueryProvider>
    </ErrorBoundary>
  )
}
