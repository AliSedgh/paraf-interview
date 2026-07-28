'use client'

import { useQuery } from '@tanstack/react-query'

import { useAuthStore } from '@/features/auth'
import type { ApiError } from '@/lib/api/api-error'

import { vitrinApi } from '../services/vitrin.api'
import type { UserVitrin } from '../types'

import { vitrinKeys } from './vitrin.keys'

export function useUserVitrins() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return useQuery<UserVitrin[], ApiError>({
    queryKey: vitrinKeys.listForUser(),
    queryFn: () => vitrinApi.listForUser(),
    enabled: isAuthenticated,
  })
}
