import { env } from '@/lib/env'

export function resolveFileUrl(link: string | null | undefined): string | null {
  if (!link) return null

  const trimmed = link.trim()
  if (!trimmed) return null
  if (/^(https?:|data:|blob:)/i.test(trimmed)) return trimmed

  const base = env.NEXT_PUBLIC_IMAGE_BASE_URL.replace(/\/+$/, '')
  const path = trimmed.replace(/^\/+/, '')

  return `${base}/${path}`
}
