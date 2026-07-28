import { describe, expect, it } from 'vitest'

import { formatDate } from './formatDate'

describe('formatDate', () => {
  it('یک Date معتبر را فرمت می‌کند', () => {
    expect(formatDate(new Date('2024-03-20T00:00:00Z'), undefined, 'en-US')).toBe(
      '03/20/2024',
    )
  })

  it('رشته‌ی ISO را می‌پذیرد', () => {
    expect(formatDate('2024-03-20T00:00:00Z', undefined, 'en-US')).toBe('03/20/2024')
  })

  it('برای ورودی خالی رشته‌ی خالی برمی‌گرداند', () => {
    expect(formatDate(null)).toBe('')
    expect(formatDate(undefined)).toBe('')
    expect(formatDate('')).toBe('')
  })

  it('برای تاریخ نامعتبر crash نمی‌کند', () => {
    expect(formatDate('not-a-date')).toBe('')
  })

  it('locale و options سفارشی را اعمال می‌کند', () => {
    expect(formatDate('2024-06-15T00:00:00Z', { year: 'numeric' }, 'fa-IR')).toBe('۱۴۰۳')
  })
})
