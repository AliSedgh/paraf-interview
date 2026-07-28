import type { RecentActivity, RecentActivityPage } from '../types'

const LIST_KEYS = ['items', 'data', 'results', 'records', 'rows'] as const
const TOTAL_KEYS = ['total', 'count', 'totalCount'] as const

export function normalizeActivityList(payload: unknown): RecentActivityPage {
  if (Array.isArray(payload)) {
    return { items: payload as RecentActivity[], total: null }
  }

  if (payload !== null && typeof payload === 'object') {
    const record = payload as Record<string, unknown>

    const listKey = LIST_KEYS.find((key) => Array.isArray(record[key]))
    const totalKey = TOTAL_KEYS.find((key) => typeof record[key] === 'number')

    if (listKey) {
      return {
        items: record[listKey] as RecentActivity[],
        total: totalKey ? (record[totalKey] as number) : null,
      }
    }
  }

  return { items: [], total: null }
}
