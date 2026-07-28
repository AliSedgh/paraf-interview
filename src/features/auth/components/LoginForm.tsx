'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/shared/components/Button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/components/Field'
import { Input } from '@/shared/components/Input'

import { useLogin } from '../hooks/useLogin'
import { loginSchema, type LoginInput, type LoginValues } from '../schemas/login.schema'
import type { LoginResponse } from '../types'

type LoginFormProps = {
  onSuccess?: (data: LoginResponse) => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput, unknown, LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { phone: '', password: '' },
  })

  const login = useLogin({ onSuccess })

  return (
    <form onSubmit={handleSubmit((values) => login.mutate(values))} noValidate>
      <FieldGroup>
        <Field data-invalid={!!errors.phone}>
          <FieldLabel htmlFor="phone">شماره موبایل</FieldLabel>
          <Input
            id="phone"
            type="tel"
            inputMode="numeric"
            dir="ltr"
            placeholder="09123456789"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            {...register('phone')}
          />
          <FieldError errors={[errors.phone]} />
        </Field>

        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="password">رمز عبور</FieldLabel>
          <Input
            id="password"
            type="password"
            dir="ltr"
            autoComplete="current-password"
            aria-invalid={!!errors.password}
            {...register('password')}
          />
          <FieldError errors={[errors.password]} />
        </Field>

        {login.isError ? (
          <p role="alert" className="text-sm text-destructive">
            {login.error.message}
          </p>
        ) : null}

        <Button type="submit" isLoading={login.isPending}>
          ورود
        </Button>
      </FieldGroup>
    </form>
  )
}
