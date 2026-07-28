import { apiClient } from '@/lib/api/client'
import { unwrap } from '@/lib/api/unwrap'

import type { ClubSummary, VitrinClubSummary } from '../types'

export const customerClubApi = {
  async getSummary(): Promise<ClubSummary> {
    const { data } = await apiClient.get('/customer-club/summary')
    return unwrap<ClubSummary>(data)
  },

  async getVitrinSummary(userVitrinId: string): Promise<VitrinClubSummary> {
    const { data } = await apiClient.get(
      `/customer-club/summary-user-vitrin/${encodeURIComponent(userVitrinId)}`,
    )
    return unwrap<VitrinClubSummary>(data)
  },
}
