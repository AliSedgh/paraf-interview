import { describe, expect, it } from 'vitest'

import { formatNumber } from './formatNumber'

describe('formatNumber', () => {
  it('عدد را با ارقام فارسی و جداکننده نمایش می‌دهد', () => {
    expect(formatNumber(209700)).toBe('۲۰۹٬۷۰۰')
  })

  it('صفر را نمایش می‌دهد، نه خط تیره', () => {
    expect(formatNumber(0)).toBe('۰')
  })

  it.each([null, undefined, NaN])('برای %s خط تیره می‌دهد', (value) => {
    expect(formatNumber(value)).toBe('—')
  })

  it('locale سفارشی را می‌پذیرد', () => {
    expect(formatNumber(1234, 'en-US')).toBe('1,234')
  })
})
