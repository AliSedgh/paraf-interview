'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { ApiError } from '@/lib/api/api-error'

import type { LoginValues } from '../schemas/login.schema'
import { authApi } from '../services/auth.api'
import { useAuthStore } from '../store/auth.store'
import type { LoginResponse } from '../types'

type UseLoginOptions = {
  onSuccess?: (data: LoginResponse) => void
  onError?: (error: ApiError) => void
}

export function useLogin({ onSuccess, onError }: UseLoginOptions = {}) {
  const queryClient = useQueryClient()
  const setSession = useAuthStore((state) => state.setSession)

  return useMutation<LoginResponse, ApiError, LoginValues>({
    mutationFn: (values) => authApi.login(values),
    onSuccess: (data) => {
      queryClient.clear()
      setSession({ accessToken: data.accessToken, refreshToken: data.refreshToken })
      onSuccess?.(data)
    },
    onError,
  })
}
