import { describe, expect, it } from 'vitest'

import { isValidIranMobile, normalizeIranMobile, toLatinDigits } from './phone'

describe('toLatinDigits', () => {
  it('ارقام فارسی را به لاتین تبدیل می‌کند', () => {
    expect(toLatinDigits('۰۹۱۲۳۴۵۶۷۸۹')).toBe('09123456789')
  })

  it('ارقام عربی را به لاتین تبدیل می‌کند', () => {
    expect(toLatinDigits('٠٩١٢')).toBe('0912')
  })

  it('متن لاتین را دست‌نخورده برمی‌گرداند', () => {
    expect(toLatinDigits('09123456789')).toBe('09123456789')
  })
})

describe('normalizeIranMobile', () => {
  it.each([
    ['09027927890', '989027927890'],
    ['9027927890', '989027927890'],
    ['989027927890', '989027927890'],
    ['+989027927890', '989027927890'],
    ['۰۹۰۲۷۹۲۷۸۹۰', '989027927890'],
    ['0902 792 7890', '989027927890'],
    ['0902-792-7890', '989027927890'],
  ])('%s → %s', (input, expected) => {
    expect(normalizeIranMobile(input)).toBe(expected)
  })

  it.each([
    ['', 'خالی'],
    ['0812345678', 'شماره ثابت'],
    ['0912345678', 'یک رقم کم'],
    ['091234567890', 'یک رقم زیاد'],
    ['abcdefghijk', 'غیرعددی'],
  ])('%s نامعتبر است (%s)', (input) => {
    expect(normalizeIranMobile(input)).toBeNull()
  })
})

describe('isValidIranMobile', () => {
  it('برای شماره‌ی معتبر true است', () => {
    expect(isValidIranMobile('09027927890')).toBe(true)
  })

  it('برای شماره‌ی نامعتبر false است', () => {
    expect(isValidIranMobile('0812345678')).toBe(false)
  })
})
