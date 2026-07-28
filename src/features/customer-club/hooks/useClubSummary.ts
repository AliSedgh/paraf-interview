'use client'

import { useQuery } from '@tanstack/react-query'

import { useAuthStore } from '@/features/auth'
import type { ApiError } from '@/lib/api/api-error'

import { customerClubApi } from '../services/customer-club.api'
import type { ClubSummary } from '../types'

import { customerClubKeys } from './customer-club.keys'

export function useClubSummary() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return useQuery<ClubSummary, ApiError>({
    queryKey: customerClubKeys.summary(),
    queryFn: () => customerClubApi.getSummary(),
    enabled: isAuthenticated,
  })
}
