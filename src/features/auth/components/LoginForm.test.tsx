import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { renderWithProviders } from '@/tests/utils/renderWithProviders'

import { resetAuthStore, useAuthStore } from '../store/auth.store'

import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  beforeEach(() => resetAuthStore())

  it('فیلدهای شماره موبایل و رمز عبور را رندر می‌کند', () => {
    renderWithProviders(<LoginForm />)

    expect(screen.getByLabelText('شماره موبایل')).toBeInTheDocument()
    expect(screen.getByLabelText('رمز عبور')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'ورود' })).toBeInTheDocument()
  })

  it('برای شماره‌ی نامعتبر خطا نشان می‌دهد و درخواست نمی‌فرستد', async () => {
    const user = userEvent.setup()
    renderWithProviders(<LoginForm />)

    await user.type(screen.getByLabelText('شماره موبایل'), '0812345678')
    await user.type(screen.getByLabelText('رمز عبور'), 'p.123456')
    await user.click(screen.getByRole('button', { name: 'ورود' }))

    expect(await screen.findByText('شماره موبایل معتبر نیست')).toBeInTheDocument()
    expect(useAuthStore.getState().isAuthenticated).toBe(false)
  })

  it('شماره‌ی 09… را نرمال می‌کند و ورود موفق است', async () => {
    const user = userEvent.setup()
    const onSuccess = vi.fn()
    renderWithProviders(<LoginForm onSuccess={onSuccess} />)

    await user.type(screen.getByLabelText('شماره موبایل'), '09027927890')
    await user.type(screen.getByLabelText('رمز عبور'), 'p.123456')
    await user.click(screen.getByRole('button', { name: 'ورود' }))

    await waitFor(() => expect(onSuccess).toHaveBeenCalledOnce())
    expect(useAuthStore.getState().accessToken).toBe('fake-access-token')
  })

  it('خطای سرور را به کاربر نشان می‌دهد', async () => {
    const user = userEvent.setup()
    renderWithProviders(<LoginForm />)

    await user.type(screen.getByLabelText('شماره موبایل'), '09000000000')
    await user.type(screen.getByLabelText('رمز عبور'), 'wrong-pass')
    await user.click(screen.getByRole('button', { name: 'ورود' }))

    expect(
      await screen.findByText('شماره موبایل یا رمز عبور نادرست است'),
    ).toBeInTheDocument()
  })
})
