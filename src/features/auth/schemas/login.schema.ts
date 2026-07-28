import { z } from 'zod'

import { normalizeIranMobile } from '@/shared/utils/phone'

export const loginSchema = z.object({
  phone: z
    .string()
    .trim()
    .pipe(z.string().min(1, 'شماره موبایل الزامی است'))
    .transform((value, ctx) => {
      const normalized = normalizeIranMobile(value)

      if (!normalized) {
        ctx.addIssue({ code: 'custom', message: 'شماره موبایل معتبر نیست' })
        return z.NEVER
      }

      return normalized
    }),
  password: z.string().min(1, 'رمز عبور الزامی است'),
})

export type LoginInput = z.input<typeof loginSchema>
export type LoginValues = z.output<typeof loginSchema>
