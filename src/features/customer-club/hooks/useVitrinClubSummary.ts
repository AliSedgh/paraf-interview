'use client'

import { useQuery } from '@tanstack/react-query'

import type { ApiError } from '@/lib/api/api-error'

import { customerClubApi } from '../services/customer-club.api'
import type { VitrinClubSummary } from '../types'

import { customerClubKeys } from './customer-club.keys'

export function useVitrinClubSummary(userVitrinId: string | null) {
  return useQuery<VitrinClubSummary, ApiError>({
    queryKey: customerClubKeys.vitrinSummary(userVitrinId ?? ''),
    queryFn: () => customerClubApi.getVitrinSummary(userVitrinId!),
    enabled: Boolean(userVitrinId),
  })
}
