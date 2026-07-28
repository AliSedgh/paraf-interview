'use client'

import { useQuery } from '@tanstack/react-query'

import type { ApiError } from '@/lib/api/api-error'

import { levelApi } from '../services/level.api'
import type { Level } from '../types'

import { levelKeys } from './level.keys'

export function useLevels() {
  return useQuery<Level[], ApiError>({
    queryKey: levelKeys.list(),
    queryFn: () => levelApi.list(),
    staleTime: 30 * 60 * 1000,
  })
}
