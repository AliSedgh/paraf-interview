import { http } from 'msw'
import { describe, expect, it } from 'vitest'

import { env } from '@/lib/env'
import { ok } from '@/tests/mocks/envelope'
import { server } from '@/tests/mocks/server'

import { recentActivityApi } from './recent-activity.api'

const endpoint = `${env.NEXT_PUBLIC_API_BASE_URL}/recent-activities`

describe('recentActivityApi.list', () => {
  it('فعالیت‌ها را با تعداد کل برمی‌گرداند', async () => {
    const page = await recentActivityApi.list()

    expect(page.items).toHaveLength(3)
    expect(page.total).toBe(3)
  })

  it('offset و size را به سرور می‌فرستد', async () => {
    const page = await recentActivityApi.list({ offset: 1, size: 1 })

    expect(page.items).toHaveLength(1)
    expect(page.items[0].id).toBe('act-2')
  })

  it('با type فیلتر می‌کند', async () => {
    const page = await recentActivityApi.list({ type: 'SPENTCOIN' })

    expect(page.items).toHaveLength(1)
    expect(page.items[0].type).toBe('SPENTCOIN')
  })

  it('userVitrinId را به‌عنوان query param ارسال می‌کند', async () => {
    let received: string | null = null
    server.use(
      http.get(endpoint, ({ request }) => {
        received = new URL(request.url).searchParams.get('userVitrinId')
        return ok({ items: [], total: 0 })
      }),
    )

    await recentActivityApi.list({ userVitrinId: 'vit-1' })

    expect(received).toBe('vit-1')
  })

  it('پارامترهای تعریف‌نشده را در URL نمی‌گذارد', async () => {
    let search = ''
    server.use(
      http.get(endpoint, ({ request }) => {
        search = new URL(request.url).search
        return ok([])
      }),
    )

    await recentActivityApi.list({ size: 5 })

    expect(search).toBe('?size=5')
  })

  it('اگر result مستقیماً آرایه باشد هم کار می‌کند', async () => {
    server.use(
      http.get(endpoint, () =>
        ok([
          {
            type: 'COIN',
            taskTitle: 'x',
            taskDescription: 'y',
            scoreAmount: 0,
            coinAmount: 5,
          },
        ]),
      ),
    )

    const page = await recentActivityApi.list()

    expect(page.items).toHaveLength(1)
    expect(page.total).toBeNull()
  })
})
