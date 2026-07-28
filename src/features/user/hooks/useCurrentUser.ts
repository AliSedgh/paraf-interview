'use client'

import { useQuery } from '@tanstack/react-query'

import { useAuthStore } from '@/features/auth'
import type { ApiError } from '@/lib/api/api-error'

import { userApi } from '../services/user.api'
import type { CurrentUser } from '../types'

import { userKeys } from './user.keys'

export function useCurrentUser() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return useQuery<CurrentUser, ApiError>({
    queryKey: userKeys.me(),
    queryFn: () => userApi.getMe(),
    enabled: isAuthenticated,
  })
}
