import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import { createQueryWrapper } from '@/tests/utils/createQueryWrapper'
import { VALID_CREDENTIALS } from '@/tests/mocks/auth.handlers'

import { resetAuthStore, useAuthStore } from '../store/auth.store'

import { useLogin } from './useLogin'

describe('useLogin', () => {
  beforeEach(() => resetAuthStore())

  it('پس از ورود موفق، توکن‌ها را در store ذخیره می‌کند', async () => {
    const { result } = renderHook(() => useLogin(), { wrapper: createQueryWrapper() })

    result.current.mutate(VALID_CREDENTIALS)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const state = useAuthStore.getState()
    expect(state.isAuthenticated).toBe(true)
    expect(state.accessToken).toBe('fake-access-token')
    expect(state.refreshToken).toBe('fake-refresh-token')
  })

  it('در صورت خطای سرور، store دست‌نخورده می‌ماند', async () => {
    const { result } = renderHook(() => useLogin(), { wrapper: createQueryWrapper() })

    result.current.mutate({ phone: '989000000000', password: 'wrong' })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error?.status).toBe(401)
    expect(useAuthStore.getState().isAuthenticated).toBe(false)
  })
})
