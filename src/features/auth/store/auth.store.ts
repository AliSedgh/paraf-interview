import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { setAccessTokenProvider, setUnauthorizedHandler } from '@/lib/api/client'
import { ACCESS_TOKEN_COOKIE } from '@/lib/api/token-cookie'

type AuthState = {
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  hasHydrated: boolean
}

type AuthActions = {
  setSession: (tokens: { accessToken: string; refreshToken: string }) => void
  clearSession: () => void
  setHasHydrated: (value: boolean) => void
}

function syncTokenCookie(token: string | null) {
  if (typeof document === 'undefined') return

  if (!token) {
    document.cookie = `${ACCESS_TOKEN_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`
    return
  }

  const week = 60 * 60 * 24 * 7
  document.cookie = `${ACCESS_TOKEN_COOKIE}=${encodeURIComponent(token)}; Path=/; Max-Age=${week}; SameSite=Lax`
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  hasHydrated: false,
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      ...initialState,

      setSession: ({ accessToken, refreshToken }) => {
        syncTokenCookie(accessToken)
        set({ accessToken, refreshToken, isAuthenticated: true })
      },

      clearSession: () => {
        syncTokenCookie(null)
        set({ accessToken: null, refreshToken: null, isAuthenticated: false })
      },

      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: 'paraf-auth',
      partialize: ({ accessToken, refreshToken, isAuthenticated }) => ({
        accessToken,
        refreshToken,
        isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        syncTokenCookie(state?.accessToken ?? null)
        state?.setHasHydrated(true)
      },
    },
  ),
)

setAccessTokenProvider(() => useAuthStore.getState().accessToken)
setUnauthorizedHandler(() => useAuthStore.getState().clearSession())

export const resetAuthStore = () =>
  useAuthStore.setState({ ...initialState, hasHydrated: true })
