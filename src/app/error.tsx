'use client'

import { useEffect } from 'react'

import { Button } from '@/shared/components/Button'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error(error)
    }
  }, [error])

  return (
    <div
      role="alert"
      className="flex min-h-svh flex-col items-center justify-center gap-3 p-6 text-center"
    >
      <h2 className="text-lg font-semibold">مشکلی پیش آمد</h2>
      <p className="max-w-md text-sm text-muted-foreground">{error.message}</p>
      <Button onClick={reset} variant="outline" size="sm">
        تلاش مجدد
      </Button>
    </div>
  )
}
