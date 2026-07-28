'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { LoginForm, useAuthStore } from '@/features/auth'

export default function LoginPage() {
  const router = useRouter()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const hasHydrated = useAuthStore((state) => state.hasHydrated)

  useEffect(() => {
    if (hasHydrated && isAuthenticated) router.replace('/')
  }, [hasHydrated, isAuthenticated, router])

  return (
    <main className="flex min-h-svh items-center justify-center p-fa-4">
      <div className="w-full max-w-sm rounded-fa-lg border border-neutral-300 bg-neutral-0 p-fa-6 shadow-l1">
        <h1 className="mb-fa-1 text-h-l font-bold text-neutral-900">ورود به پاراف</h1>
        <p className="mb-fa-6 text-b-s text-neutral-700">
          با شماره موبایل و رمز عبور خود وارد شوید.
        </p>

        <LoginForm onSuccess={() => router.replace('/')} />
      </div>
    </main>
  )
}
