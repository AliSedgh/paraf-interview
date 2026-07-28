import { apiClient } from '@/lib/api/client'
import { unwrap } from '@/lib/api/unwrap'

import type { CurrentUser } from '../types'

export const userApi = {
  async getMe(): Promise<CurrentUser> {
    const { data } = await apiClient.get('/users/me')
    return unwrap<CurrentUser>(data)
  },
}
