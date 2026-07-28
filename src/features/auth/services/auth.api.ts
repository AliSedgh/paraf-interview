import { ApiError } from '@/lib/api/api-error'
import { apiClient } from '@/lib/api/client'
import { unwrap } from '@/lib/api/unwrap'

import type { LoginValues } from '../schemas/login.schema'
import type { LoginResponse } from '../types'

function assertLoginResponse(payload: unknown): LoginResponse {
  const record = payload as Partial<LoginResponse> | null

  if (!record?.accessToken || typeof record.accessToken !== 'string') {
    const keys =
      payload && typeof payload === 'object'
        ? Object.keys(payload).join(', ')
        : typeof payload

    throw new ApiError({
      message: `پاسخ سرور accessToken نداشت (کلیدهای دریافتی: ${keys})`,
      status: 200,
      code: 'INVALID_LOGIN_RESPONSE',
      details: payload,
    })
  }

  return record as LoginResponse
}

export const authApi = {
  async login(payload: LoginValues): Promise<LoginResponse> {
    const { data } = await apiClient.post('/users/login', payload)
    return assertLoginResponse(unwrap<LoginResponse>(data))
  },
}
