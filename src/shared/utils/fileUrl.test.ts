import { describe, expect, it } from 'vitest'

import { env } from '@/lib/env'

import { resolveFileUrl } from './fileUrl'

const base = env.NEXT_PUBLIC_IMAGE_BASE_URL.replace(/\/+$/, '')

describe('resolveFileUrl', () => {
  it('لینک نسبی را به base می‌چسباند', () => {
    expect(resolveFileUrl('uploads/level/bronze.png')).toBe(
      `${base}/uploads/level/bronze.png`,
    )
  })

  it('اسلش ابتدای لینک را دوباره تکرار نمی‌کند', () => {
    expect(resolveFileUrl('/uploads/a.png')).toBe(`${base}/uploads/a.png`)
  })

  it('لینک مطلق را دست‌نخورده برمی‌گرداند', () => {
    expect(resolveFileUrl('https://cdn.example.com/a.png')).toBe(
      'https://cdn.example.com/a.png',
    )
  })

  it.each([null, undefined, '', '   '])('برای %s مقدار null می‌دهد', (input) => {
    expect(resolveFileUrl(input)).toBeNull()
  })
})
