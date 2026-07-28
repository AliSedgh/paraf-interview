'use client'

import { useQuery } from '@tanstack/react-query'

import type { ApiError } from '@/lib/api/api-error'

import { vitrinApi } from '../services/vitrin.api'
import type { VitrinDetail } from '../types'

import { vitrinKeys } from './vitrin.keys'

export function useVitrin(userVitrinId: string | null) {
  return useQuery<VitrinDetail, ApiError>({
    queryKey: vitrinKeys.detail(userVitrinId ?? ''),
    queryFn: () => vitrinApi.getById(userVitrinId!),
    enabled: Boolean(userVitrinId),
  })
}
