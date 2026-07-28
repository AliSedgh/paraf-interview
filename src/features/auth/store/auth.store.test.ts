import { beforeEach, describe, expect, it } from 'vitest'

import { resetAuthStore, useAuthStore } from './auth.store'

const tokens = { accessToken: 'access-123', refreshToken: 'refresh-456' }

describe('auth.store', () => {
  beforeEach(() => resetAuthStore())

  it('در ابتدا کاربر لاگین نیست', () => {
    const state = useAuthStore.getState()

    expect(state.accessToken).toBeNull()
    expect(state.refreshToken).toBeNull()
    expect(state.isAuthenticated).toBe(false)
  })

  it('setSession هر دو توکن را ذخیره می‌کند', () => {
    useAuthStore.getState().setSession(tokens)

    const state = useAuthStore.getState()
    expect(state.accessToken).toBe('access-123')
    expect(state.refreshToken).toBe('refresh-456')
    expect(state.isAuthenticated).toBe(true)
  })

  it('clearSession توکن‌ها را پاک می‌کند ولی hasHydrated را دست نمی‌زند', () => {
    useAuthStore.getState().setSession(tokens)
    useAuthStore.getState().clearSession()

    const state = useAuthStore.getState()
    expect(state.accessToken).toBeNull()
    expect(state.isAuthenticated).toBe(false)
    expect(state.hasHydrated).toBe(true)
  })
})
