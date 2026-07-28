import axios, { AxiosError, type AxiosInstance } from 'axios'

import { env } from '@/lib/env'

import { ApiError } from './api-error'

export const apiClient: AxiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 20_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

let accessTokenProvider: () => string | null = () => null

export function setAccessTokenProvider(provider: () => string | null) {
  accessTokenProvider = provider
}

let onUnauthorized: (() => void) | null = null

export function setUnauthorizedHandler(handler: () => void) {
  onUnauthorized = handler
}

apiClient.interceptors.request.use((config) => {
  const token = accessTokenProvider()
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (
    error: AxiosError<{ message?: string | string[]; code?: string; errors?: unknown }>,
  ) => {
    const status = error.response?.status ?? 0
    const data = error.response?.data

    const raw = data?.message
    const message = Array.isArray(raw) ? raw.join('؛ ') : raw

    if (status === 401) onUnauthorized?.()

    return Promise.reject(
      new ApiError({
        message: message ?? error.message ?? 'خطای ناشناخته در ارتباط با سرور',
        status,
        code: data?.code,
        details: data?.errors,
      }),
    )
  },
)
