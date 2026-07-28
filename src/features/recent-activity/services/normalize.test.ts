import { describe, expect, it } from 'vitest'

import type { RecentActivity } from '../types'

import { normalizeActivityList } from './normalize'

const activity: RecentActivity = {
  type: 'SCORE',
  taskTitle: 'تکمیل پروفایل',
  taskDescription: 'اطلاعات پروفایلت رو کامل کن',
  scoreAmount: 20,
  coinAmount: 0,
}

describe('normalizeActivityList', () => {
  it('آرایه‌ی خام را می‌پذیرد', () => {
    expect(normalizeActivityList([activity])).toEqual({ items: [activity], total: null })
  })

  it.each(['items', 'data', 'results', 'records', 'rows'])(
    'پاکت با کلید %s را می‌پذیرد',
    (key) => {
      expect(normalizeActivityList({ [key]: [activity] }).items).toEqual([activity])
    },
  )

  it.each(['total', 'count', 'totalCount'])('کلید تعداد %s را برمی‌دارد', (key) => {
    expect(normalizeActivityList({ items: [activity], [key]: 42 }).total).toBe(42)
  })

  it('برای پاسخ ناشناخته لیست خالی می‌دهد و crash نمی‌کند', () => {
    expect(normalizeActivityList({ unexpected: true })).toEqual({
      items: [],
      total: null,
    })
    expect(normalizeActivityList(null)).toEqual({ items: [], total: null })
    expect(normalizeActivityList('nope')).toEqual({ items: [], total: null })
  })
})
