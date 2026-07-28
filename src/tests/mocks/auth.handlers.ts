import { HttpResponse, http } from 'msw'

import type { LoginResponse } from '@/features/auth'
import { env } from '@/lib/env'

import { ok } from './envelope'

const api = (path: string) => `${env.NEXT_PUBLIC_API_BASE_URL}${path}`

export const mockTokens: LoginResponse = {
  accessToken: 'fake-access-token',
  refreshToken: 'fake-refresh-token',
}

export const VALID_CREDENTIALS = {
  phone: '989027927890',
  password: 'p.123456',
}

export const authHandlers = [
  http.post(api('/users/login'), async ({ request }) => {
    const body = (await request.json()) as { phone?: string; password?: string }

    if (
      body.phone !== VALID_CREDENTIALS.phone ||
      body.password !== VALID_CREDENTIALS.password
    ) {
      return HttpResponse.json(
        { message: 'شماره موبایل یا رمز عبور نادرست است' },
        { status: 401 },
      )
    }

    return ok(mockTokens)
  }),
]
