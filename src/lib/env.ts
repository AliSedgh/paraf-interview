import { z } from 'zod'

const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.url(),
  NEXT_PUBLIC_IMAGE_BASE_URL: z.url(),
})

const serverEnvSchema = clientEnvSchema.extend({
  API_INTERNAL_BASE_URL: z.url().optional(),
})

export type Env = z.infer<typeof serverEnvSchema>

const isServer = typeof window === 'undefined'

const schema = isServer ? serverEnvSchema : clientEnvSchema

const parsed = schema.safeParse({
  NEXT_PUBLIC_API_BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://wholesaler-core-v2.paraf.app/api',
  NEXT_PUBLIC_IMAGE_BASE_URL:
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL ??
    'https://wholesaler-core-develop.web.parafacc.ir',
  ...(isServer
    ? { API_INTERNAL_BASE_URL: process.env.API_INTERNAL_BASE_URL || undefined }
    : {}),
})

if (!parsed.success) {
  throw new Error(
    `Invalid environment variables:\n${JSON.stringify(z.treeifyError(parsed.error), null, 2)}`,
  )
}

export const env: Env = parsed.data
