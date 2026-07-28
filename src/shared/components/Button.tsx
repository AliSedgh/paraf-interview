import { Loader2 } from 'lucide-react'
import type { ComponentProps } from 'react'

import { Button as ShadButton } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type ButtonProps = ComponentProps<typeof ShadButton> & {
  isLoading?: boolean
}

export function Button({
  isLoading = false,
  asChild = false,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <ShadButton
      asChild={asChild}
      disabled={disabled || isLoading}
      className={cn(className)}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {isLoading ? <Loader2 className="animate-spin" aria-hidden /> : null}
          {children}
        </>
      )}
    </ShadButton>
  )
}
