import type { RecentActivitiesParams } from '../types'

export const recentActivityKeys = {
  all: ['recent-activities'] as const,
  lists: () => [...recentActivityKeys.all, 'list'] as const,
  list: (params: RecentActivitiesParams) =>
    [...recentActivityKeys.lists(), params] as const,
}
