import { HttpResponse, http } from 'msw'
import { describe, expect, it } from 'vitest'

import { ApiError } from '@/lib/api/api-error'
import { env } from '@/lib/env'
import { server } from '@/tests/mocks/server'
import { VALID_CREDENTIALS } from '@/tests/mocks/auth.handlers'

import { authApi } from './auth.api'

describe('authApi.login', () => {
  it('توکن‌ها را از پاکت { success, result } بیرون می‌کشد', async () => {
    const result = await authApi.login(VALID_CREDENTIALS)

    expect(result.accessToken).toBe('fake-access-token')
    expect(result.refreshToken).toBe('fake-refresh-token')
  })

  it('اگر پاسخ accessToken نداشت، بلند شکست می‌خورد', async () => {
    server.use(
      http.post(`${env.NEXT_PUBLIC_API_BASE_URL}/users/login`, () =>
        HttpResponse.json({ success: true, result: { token: 'x' } }),
      ),
    )

    await expect(authApi.login(VALID_CREDENTIALS)).rejects.toThrow(
      'پاسخ سرور accessToken نداشت (کلیدهای دریافتی: token)',
    )
  })

  it('پاکت با success=false را به ApiError تبدیل می‌کند', async () => {
    server.use(
      http.post(`${env.NEXT_PUBLIC_API_BASE_URL}/users/login`, () =>
        HttpResponse.json({ success: false, message: 'کاربر مسدود است' }),
      ),
    )

    await expect(authApi.login(VALID_CREDENTIALS)).rejects.toThrow('کاربر مسدود است')
  })

  it('در صورت 401 خطا را به ApiError تبدیل می‌کند', async () => {
    await expect(
      authApi.login({ phone: '989000000000', password: 'wrong' }),
    ).rejects.toSatisfy((error: unknown) => {
      expect(error).toBeInstanceOf(ApiError)
      expect((error as ApiError).status).toBe(401)
      expect((error as ApiError).isUnauthorized).toBe(true)
      return true
    })
  })

  it('پیام اعتبارسنجی آرایه‌ای NestJS را به یک رشته تبدیل می‌کند', async () => {
    server.use(
      http.post(`${env.NEXT_PUBLIC_API_BASE_URL}/users/login`, () =>
        HttpResponse.json(
          { message: ['phone نباید خالی باشد', 'password ضعیف است'] },
          { status: 400 },
        ),
      ),
    )

    await expect(authApi.login(VALID_CREDENTIALS)).rejects.toThrow(
      'phone نباید خالی باشد؛ password ضعیف است',
    )
  })
})
