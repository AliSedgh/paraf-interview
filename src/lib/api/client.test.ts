import { HttpResponse, http } from 'msw'
import { beforeEach, describe, expect, it } from 'vitest'

import { resetAuthStore, useAuthStore } from '@/features/auth/store/auth.store'
import { env } from '@/lib/env'
import { server } from '@/tests/mocks/server'

import { apiClient } from './client'

const PROBE = `${env.NEXT_PUBLIC_API_BASE_URL}/__probe`

function captureAuthHeader() {
  const seen: { value: string | null } = { value: null }

  server.use(
    http.get(PROBE, ({ request }) => {
      seen.value = request.headers.get('authorization')
      return HttpResponse.json({ ok: true })
    }),
  )

  return seen
}

describe('apiClient — تزریق توکن', () => {
  beforeEach(() => resetAuthStore())

  it('وقتی توکن نداریم هدر Authorization نمی‌فرستد', async () => {
    const seen = captureAuthHeader()

    await apiClient.get('/__probe')

    expect(seen.value).toBeNull()
  })

  it('پس از setSession، توکن را به‌صورت Bearer می‌فرستد', async () => {
    const seen = captureAuthHeader()

    useAuthStore.getState().setSession({
      accessToken: 'token-abc',
      refreshToken: 'refresh-xyz',
    })

    await apiClient.get('/__probe')

    expect(seen.value).toBe('Bearer token-abc')
  })

  it('پس از clearSession دیگر توکن نمی‌فرستد', async () => {
    const seen = captureAuthHeader()

    useAuthStore.getState().setSession({ accessToken: 't', refreshToken: 'r' })
    useAuthStore.getState().clearSession()
    await apiClient.get('/__probe')

    expect(seen.value).toBeNull()
  })

  it('پاسخ 401 باعث پاک‌شدن session می‌شود', async () => {
    server.use(
      http.get(PROBE, () =>
        HttpResponse.json({ message: 'unauthorized' }, { status: 401 }),
      ),
    )

    useAuthStore.getState().setSession({ accessToken: 't', refreshToken: 'r' })

    await expect(apiClient.get('/__probe')).rejects.toThrow()

    expect(useAuthStore.getState().isAuthenticated).toBe(false)
  })
})
