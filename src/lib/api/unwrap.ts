import { ApiError } from './api-error'

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

export function unwrap<T>(payload: unknown): T {
  if (!isRecord(payload) || !('success' in payload)) {
    return payload as T
  }

  if (payload.success === false) {
    const message = payload.message ?? payload.error

    throw new ApiError({
      message: typeof message === 'string' ? message : 'درخواست با خطا مواجه شد',
      status: 200,
      details: payload,
    })
  }

  return payload.result as T
}
