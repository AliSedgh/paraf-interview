import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('مقدار اولیه را بلافاصله برمی‌گرداند', () => {
    const { result } = renderHook(() => useDebounce('paraf', 300))

    expect(result.current).toBe('paraf')
  })

  it('تا پایان delay مقدار قبلی را نگه می‌دارد', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'a' },
    })

    rerender({ value: 'ab' })
    expect(result.current).toBe('a')

    act(() => void vi.advanceTimersByTime(299))
    expect(result.current).toBe('a')

    act(() => void vi.advanceTimersByTime(1))
    expect(result.current).toBe('ab')
  })

  it('با تغییرات پشت‌سرهم فقط آخرین مقدار را منتشر می‌کند', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'a' },
    })

    rerender({ value: 'ab' })
    act(() => void vi.advanceTimersByTime(200))
    rerender({ value: 'abc' })
    act(() => void vi.advanceTimersByTime(300))

    expect(result.current).toBe('abc')
  })
})
