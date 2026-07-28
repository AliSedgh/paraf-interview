import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useAuthStore } from '@/features/auth'
import {
  renderWithProviders,
  screen,
  waitFor,
  within,
} from '@/tests/utils/renderWithProviders'

import { ClubDashboard } from './ClubDashboard'

const replace = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace, push: vi.fn(), prefetch: vi.fn() }),
}))

function signIn() {
  useAuthStore.setState({
    accessToken: 'test-token',
    refreshToken: 'test-refresh',
    isAuthenticated: true,
    hasHydrated: true,
  })
}

describe('ClubDashboard', () => {
  beforeEach(signIn)

  it('سکه و امتیاز را از GET /users/me می‌گیرد', async () => {
    renderWithProviders(<ClubDashboard />)

    expect(await screen.findByText('۶۹۱')).toBeInTheDocument()
    expect(await screen.findByText('۶۹٬۱۰۰')).toBeInTheDocument()
  })

  it('سطح فعلی را از /users/me و بازه‌اش را از /levels می‌سازد', async () => {
    renderWithProviders(<ClubDashboard />)

    expect(await screen.findAllByText('نقره‌ای')).not.toHaveLength(0)
    expect(await screen.findByText('+۴۳۹')).toBeInTheDocument()
  })

  it('تعداد ماموریت‌ها را از /customer-club/summary می‌گیرد', async () => {
    renderWithProviders(<ClubDashboard />)

    expect(await screen.findByText('۱۲')).toBeInTheDocument()
  })

  it('تب‌های باشگاه را از /users/vitrin/all-user می‌سازد', async () => {
    renderWithProviders(<ClubDashboard />)

    const tablist = await screen.findByRole('tablist', { name: 'انتخاب باشگاه مشتریان:' })
    expect(within(tablist).getByRole('tab', { name: 'پروفایل شخصی' })).toBeInTheDocument()
    expect(
      await within(tablist).findByRole('tab', { name: 'فروشگاه آرین' }),
    ).toBeInTheDocument()
    expect(within(tablist).getByRole('tab', { name: 'پخش مشهد' })).toBeInTheDocument()
  })

  it('با انتخاب ویترین، امتیاز و ماموریت‌ها از سرویس‌های ویترین می‌آید', async () => {
    renderWithProviders(<ClubDashboard />)

    const tablist = await screen.findByRole('tablist', { name: 'انتخاب باشگاه مشتریان:' })
    const vitrinTab = await within(tablist).findByRole('tab', { name: 'فروشگاه آرین' })

    await userEvent.click(vitrinTab)
    await waitFor(() => expect(vitrinTab).toHaveAttribute('aria-selected', 'true'))

    expect(await screen.findAllByText('۴۲۰')).not.toHaveLength(0)
    expect(await screen.findByText('۵')).toBeInTheDocument()
    expect(
      await screen.findByRole('heading', { name: 'فروشگاه آرین' }),
    ).toBeInTheDocument()
  })

  it('ردیف‌های فعالیت را از /recent-activities رندر می‌کند', async () => {
    renderWithProviders(<ClubDashboard />)

    expect(await screen.findByText('اطلاعات پروفایلت رو کامل کن')).toBeInTheDocument()
    expect(await screen.findByText('+۲۰')).toBeInTheDocument()
    expect(await screen.findByText('+۵۰')).toBeInTheDocument()
  })

  it('فیلتر فعالیت‌ها، سرویس را با type صدا می‌زند', async () => {
    renderWithProviders(<ClubDashboard />)

    const tablist = await screen.findByRole('tablist', { name: 'فعالیت‌های اخیر' })
    const coinTab = within(tablist).getByRole('tab', { name: 'سکه' })

    await userEvent.click(coinTab)

    expect(coinTab).toHaveAttribute('aria-selected', 'true')
    expect(within(tablist).getByRole('tab', { name: 'نمایش همه' })).toHaveAttribute(
      'aria-selected',
      'false',
    )
  })

  it('اگر وارد نشده باشد به /login می‌رود', async () => {
    useAuthStore.setState({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      hasHydrated: true,
    })

    renderWithProviders(<ClubDashboard />)

    expect(screen.getByText('در حال بررسی ورود…')).toBeInTheDocument()
  })
})
