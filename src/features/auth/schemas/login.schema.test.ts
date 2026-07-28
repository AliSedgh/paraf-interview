import { describe, expect, it } from 'vitest'

import { loginSchema } from './login.schema'

const valid = { phone: '09027927890', password: 'p.123456' }

describe('loginSchema', () => {
  it('ورودی معتبر را می‌پذیرد', () => {
    expect(loginSchema.safeParse(valid).success).toBe(true)
  })

  it('شماره را به قالب موردنیاز API نرمال می‌کند', () => {
    expect(loginSchema.parse(valid).phone).toBe('989027927890')
  })

  it.each(['+989027927890', '۰۹۰۲۷۹۲۷۸۹۰', '9027927890', ' 0902 792 7890 '])(
    'قالب ورودی %s را هم می‌پذیرد',
    (phone) => {
      expect(loginSchema.parse({ ...valid, phone }).phone).toBe('989027927890')
    },
  )

  it('شماره‌ی خالی را رد می‌کند', () => {
    const result = loginSchema.safeParse({ ...valid, phone: '' })

    expect(result.success).toBe(false)
    expect(result.error?.issues[0]?.message).toBe('شماره موبایل الزامی است')
  })

  it('شماره‌ی نامعتبر را رد می‌کند', () => {
    const result = loginSchema.safeParse({ ...valid, phone: '0812345678' })

    expect(result.success).toBe(false)
    expect(result.error?.issues[0]?.message).toBe('شماره موبایل معتبر نیست')
  })

  it('رمز عبور خالی را رد می‌کند', () => {
    const result = loginSchema.safeParse({ ...valid, password: '' })

    expect(result.success).toBe(false)
    expect(result.error?.issues[0]?.message).toBe('رمز عبور الزامی است')
  })
})
