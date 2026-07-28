import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { NavigationBar } from './NavigationBar'
import {
  navActions,
  navCtaLabel,
  navSearchPlaceholder,
  navTabs,
} from './NavigationBar.mock'

describe('NavigationBar', () => {
  it('لوگو، شعار و دکمه‌ی ثبت آگهی را نشان می‌دهد', () => {
    render(<NavigationBar />)

    expect(screen.getByAltText('پاراف')).toBeInTheDocument()
    expect(screen.getByText('بازار کالا و خدمات؛')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: navCtaLabel })).toBeInTheDocument()
  })

  it('تب‌ها را به همان ترتیب راست‌به‌چپ طرح رندر می‌کند', () => {
    render(<NavigationBar />)

    const tabs = within(
      screen.getByRole('navigation', { name: 'دسته‌بندی‌های اصلی' }),
    ).getAllByRole('button')

    expect(tabs.map((tab) => tab.textContent)).toEqual(navTabs.map((tab) => tab.label))
  })

  it('برای میان‌بُرهای آیکونی برچسب دسترس‌پذیری می‌گذارد', () => {
    render(<NavigationBar />)

    for (const action of navActions) {
      expect(screen.getByRole('button', { name: action.label })).toBeInTheDocument()
    }
  })

  it('فیلد جست‌وجو را با placeholder طرح رندر می‌کند', () => {
    render(<NavigationBar />)

    expect(screen.getByPlaceholderText(navSearchPlaceholder)).toBeInTheDocument()
  })
})
