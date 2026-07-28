import { apiClient } from '@/lib/api/client'
import { unwrap } from '@/lib/api/unwrap'

import type { Level } from '../types'

export const levelApi = {
  async list(): Promise<Level[]> {
    const { data } = await apiClient.get('/levels')
    return unwrap<Level[]>(data)
  },
}
