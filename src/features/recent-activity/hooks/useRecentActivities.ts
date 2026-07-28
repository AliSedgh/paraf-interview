'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { useAuthStore } from '@/features/auth'
import type { ApiError } from '@/lib/api/api-error'

import { recentActivityApi } from '../services/recent-activity.api'
import type { RecentActivitiesParams, RecentActivityPage } from '../types'

import { recentActivityKeys } from './recent-activity.keys'

export function useRecentActivities(params: RecentActivitiesParams = {}) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return useQuery<RecentActivityPage, ApiError>({
    queryKey: recentActivityKeys.list(params),
    queryFn: () => recentActivityApi.list(params),
    enabled: isAuthenticated,
    placeholderData: keepPreviousData,
  })
}
