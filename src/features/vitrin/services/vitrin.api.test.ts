import { HttpResponse, http } from 'msw'
import { describe, expect, it } from 'vitest'

import { ApiError } from '@/lib/api/api-error'
import { env } from '@/lib/env'
import { ok } from '@/tests/mocks/envelope'
import { server } from '@/tests/mocks/server'

import { getVitrinId } from '../types'

import { vitrinApi } from './vitrin.api'

describe('vitrinApi', () => {
  it('فهرست ویترین‌های کاربر را برمی‌گرداند', async () => {
    const vitrins = await vitrinApi.listForUser()

    expect(vitrins).toHaveLength(2)
    expect(vitrins[0].companyName).toBe('فروشگاه آرین')
    expect(vitrins[0].role).toBe('retailer')
  })

  it('جزئیات ویترین را با شناسه می‌گیرد', async () => {
    const detail = await vitrinApi.getById('vit-1')

    expect(detail.id).toBe('vit-1')
    expect(detail.scores).toBe(420)
    expect(detail.level?.name).toBe('نقره‌ای')
  })

  it('شناسه‌ی دارای کاراکتر ویژه را encode می‌کند', async () => {
    let requested: string | undefined
    server.use(
      http.get(`${env.NEXT_PUBLIC_API_BASE_URL}/users/vitrin/:id`, ({ request }) => {
        requested = new URL(request.url).pathname
        return ok({ level: null, scores: 0 })
      }),
    )

    await vitrinApi.getById('a/b')

    expect(requested).toContain('a%2Fb')
  })

  it('404 را به ApiError تبدیل می‌کند', async () => {
    server.use(
      http.get(`${env.NEXT_PUBLIC_API_BASE_URL}/users/vitrin/:id`, () =>
        HttpResponse.json({ message: 'ویترین یافت نشد' }, { status: 404 }),
      ),
    )

    await expect(vitrinApi.getById('missing')).rejects.toSatisfy((error: unknown) => {
      expect(error).toBeInstanceOf(ApiError)
      expect((error as ApiError).isNotFound).toBe(true)
      return true
    })
  })
})

describe('getVitrinId', () => {
  it('userVitrinId را بر id ترجیح می‌دهد', () => {
    expect(
      getVitrinId({ role: 'user', companyName: 'x', id: 'a', userVitrinId: 'b' }),
    ).toBe('b')
  })

  it('در نبود userVitrinId به id برمی‌گردد', () => {
    expect(getVitrinId({ role: 'user', companyName: 'x', id: 'a' })).toBe('a')
  })

  it('اگر هیچ‌کدام نبود null می‌دهد', () => {
    expect(getVitrinId({ role: 'user', companyName: 'x' })).toBeNull()
  })
})
