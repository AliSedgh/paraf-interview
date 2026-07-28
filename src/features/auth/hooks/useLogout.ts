'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

import { useAuthStore } from '../store/auth.store'

export function useLogout() {
  const queryClient = useQueryClient()
  const clearSession = useAuthStore((state) => state.clearSession)

  return useCallback(() => {
    clearSession()
    queryClient.clear()
  }, [clearSession, queryClient])
}
