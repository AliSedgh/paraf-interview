import type { ComponentProps } from 'react'

import { Input as ShadInput } from '@/components/ui/input'

export type InputProps = ComponentProps<typeof ShadInput>

export function Input(props: InputProps) {
  return <ShadInput {...props} />
}
