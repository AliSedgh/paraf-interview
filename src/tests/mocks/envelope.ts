import { HttpResponse } from 'msw'

export function ok<T>(result: T, init?: ResponseInit) {
  return HttpResponse.json({ success: true, result }, init)
}
