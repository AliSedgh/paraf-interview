import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button } from './Button'

describe('Button', () => {
  it('محتوای فرزند را رندر می‌کند', () => {
    render(<Button>ذخیره</Button>)

    expect(screen.getByRole('button', { name: 'ذخیره' })).toBeInTheDocument()
  })

  it('با کلیک، onClick را صدا می‌زند', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>ارسال</Button>)

    await userEvent.click(screen.getByRole('button', { name: 'ارسال' }))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('در حالت isLoading غیرفعال می‌شود و کلیک را نمی‌پذیرد', async () => {
    const onClick = vi.fn()
    render(
      <Button isLoading onClick={onClick}>
        ارسال
      </Button>,
    )

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')

    await userEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })
})
