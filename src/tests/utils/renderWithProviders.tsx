import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement } from 'react'

import { createQueryWrapper, createTestQueryClient } from './createQueryWrapper'

export function renderWithProviders(
  ui: ReactElement,
  options: Omit<RenderOptions, 'wrapper'> = {},
) {
  const queryClient = createTestQueryClient()

  return {
    queryClient,
    ...render(ui, { wrapper: createQueryWrapper(queryClient), ...options }),
  }
}

export * from '@testing-library/react'
