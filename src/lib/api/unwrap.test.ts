import { describe, expect, it } from 'vitest'

import { ApiError } from './api-error'
import { unwrap } from './unwrap'

describe('unwrap', () => {
  it('محتوای result را از پاکت بیرون می‌کشد', () => {
    const payload = {
      success: true,
      result: { accessToken: 'a', refreshToken: 'r' },
    }

    expect(unwrap(payload)).toEqual({ accessToken: 'a', refreshToken: 'r' })
  })

  it('آرایه‌ی داخل result را برمی‌گرداند', () => {
    expect(unwrap({ success: true, result: [1, 2, 3] })).toEqual([1, 2, 3])
  })

  it('پاسخ بدون پاکت را دست‌نخورده برمی‌گرداند', () => {
    expect(unwrap({ accessToken: 'a' })).toEqual({ accessToken: 'a' })
    expect(unwrap([1, 2])).toEqual([1, 2])
  })

  it('فیلد result بدون success را پاکت به حساب نمی‌آورد', () => {
    const payload = { result: 'مقدار واقعی دامنه' }

    expect(unwrap(payload)).toEqual(payload)
  })

  it('success=false را به ApiError تبدیل می‌کند', () => {
    expect(() => unwrap({ success: false, message: 'دسترسی ندارید' })).toThrow(ApiError)
    expect(() => unwrap({ success: false, message: 'دسترسی ندارید' })).toThrow(
      'دسترسی ندارید',
    )
  })

  it('برای success=false بدون پیام، پیام پیش‌فرض می‌دهد', () => {
    expect(() => unwrap({ success: false })).toThrow('درخواست با خطا مواجه شد')
  })

  it.each([null, undefined, 'text', 42])('مقدار اولیه‌ی %s را دست‌نخورده می‌دهد', (v) => {
    expect(unwrap(v)).toBe(v)
  })
})
