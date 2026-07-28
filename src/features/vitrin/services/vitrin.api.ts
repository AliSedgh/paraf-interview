import { apiClient } from '@/lib/api/client'
import { unwrap } from '@/lib/api/unwrap'

import type { UserVitrin, VitrinDetail } from '../types'

export const vitrinApi = {
  async listForUser(): Promise<UserVitrin[]> {
    const { data } = await apiClient.get('/users/vitrin/all-user')
    return unwrap<UserVitrin[]>(data)
  },

  async getById(userVitrinId: string): Promise<VitrinDetail> {
    const { data } = await apiClient.get(
      `/users/vitrin/${encodeURIComponent(userVitrinId)}`,
    )
    return unwrap<VitrinDetail>(data)
  },
}
