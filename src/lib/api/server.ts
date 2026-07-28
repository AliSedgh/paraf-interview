import 'server-only'

import { env } from '@/lib/env'

import { ApiError } from './api-error'

type ServerFetchOptions = Omit<RequestInit, 'body'> & {
  body?: unknown
  searchParams?: Record<string, string | number | boolean | undefined>
}

function buildUrl(path: string, searchParams?: ServerFetchOptions['searchParams']) {
  const base = env.API_INTERNAL_BASE_URL ?? env.NEXT_PUBLIC_API_BASE_URL
  const url = new URL(path.replace(/^\//, ''), `${base.replace(/\/$/, '')}/`)

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value !== undefined) url.searchParams.set(key, String(value))
    }
  }

  return url.toString()
}

export async function serverFetch<TResponse>(
  path: string,
  { body, searchParams, headers, ...init }: ServerFetchOptions = {},
): Promise<TResponse> {
  const response = await fetch(buildUrl(path, searchParams), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  })

  if (!response.ok) {
    const payload = await response.json().catch(() => null)

    throw new ApiError({
      message: payload?.message ?? response.statusText,
      status: response.status,
      code: payload?.code,
      details: payload?.errors,
    })
  }

  if (response.status === 204) return undefined as TResponse

  return (await response.json()) as TResponse
}
