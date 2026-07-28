import { apiClient } from '@/lib/api/client'
import { unwrap } from '@/lib/api/unwrap'

import type { RecentActivitiesParams, RecentActivityPage } from '../types'

import { normalizeActivityList } from './normalize'

export const recentActivityApi = {
  async list({
    offset,
    size,
    type,
    userVitrinId,
  }: RecentActivitiesParams = {}): Promise<RecentActivityPage> {
    const { data } = await apiClient.get('/recent-activities', {
      params: { offset, size, type, userVitrinId },
    })

    return normalizeActivityList(unwrap(data))
  },
}
