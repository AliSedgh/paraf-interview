import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'

export const ICON_STROKE = 1.5

export const focusRing =
  'outline-none focus-visible:ring-2 focus-visible:ring-brand-a50 focus-visible:ring-offset-1'

export const glassSurface = [
  'relative isolate bg-brand-a8 backdrop-blur-[12px]',
  'before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-[inherit]',
  'before:bg-[linear-gradient(135deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0.08)_38%,rgba(255,255,255,0)_62%,rgba(255,255,255,0.16)_100%)]',
  'after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:p-px',
  'after:bg-[linear-gradient(180deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0.1)_100%)]',
  'after:[mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)]',
  'after:[mask-composite:exclude]',
].join(' ')

export function Skeleton({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      className={cn('block animate-pulse rounded-fa-xs bg-neutral-200', className)}
      {...props}
    />
  )
}

export function ValueOrSkeleton({
  isPending,
  skeletonClassName,
  children,
}: {
  isPending: boolean
  skeletonClassName: string
  children: ReactNode
}) {
  if (isPending) return <Skeleton className={skeletonClassName} />
  return <>{children}</>
}

export function Badge({ className, children, ...props }: ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-fa-1 rounded-fa-full bg-neutral-200 px-fa-2 py-[2px]',
        'text-b-xs text-neutral-900',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export function IconButton({
  label,
  children,
  className,
  ...props
}: ComponentProps<'button'> & { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        'flex size-8 shrink-0 items-center justify-center rounded-fa-full p-fa-1',
        'transition-colors hover:bg-neutral-100',
        focusRing,
        className,
      )}
      {...props}
    >
      <span className="flex size-6 items-center justify-center">{children}</span>
    </button>
  )
}

export function OutlineButton({
  icon,
  children,
  className,
  ...props
}: ComponentProps<'button'> & { icon?: ReactNode }) {
  return (
    <button
      type="button"
      className={cn(
        'flex h-[44.15px] items-center justify-center gap-fa-1 rounded-fa-lg border border-info bg-neutral-0 px-fa-4',
        'transition-colors hover:bg-info-tint',
        focusRing,
        className,
      )}
      {...props}
    >
      {icon ? (
        <span className="flex size-6 items-center justify-center">{icon}</span>
      ) : null}
      <span className="px-fa-2 text-h-m font-bold whitespace-nowrap text-info">
        {children}
      </span>
    </button>
  )
}

export function SolidButton({
  icon,
  children,
  className,
  ...props
}: ComponentProps<'button'> & { icon?: ReactNode }) {
  return (
    <button
      type="button"
      className={cn(
        'flex h-[44.18px] items-center justify-center gap-fa-1 rounded-fa-lg border border-info bg-info px-fa-6',
        'transition-colors hover:brightness-95',
        focusRing,
        className,
      )}
      {...props}
    >
      <span className="px-fa-2 text-h-m font-bold whitespace-nowrap text-neutral-0">
        {children}
      </span>
      {icon ? (
        <span className="flex size-6 items-center justify-center">{icon}</span>
      ) : null}
    </button>
  )
}

export function TextButton({ children, className, ...props }: ComponentProps<'button'>) {
  return (
    <button
      type="button"
      className={cn(
        'flex items-center rounded-fa-md py-fa-1 pr-fa-2 pl-fa-1_5',
        'transition-colors hover:bg-neutral-100',
        focusRing,
        className,
      )}
      {...props}
    >
      <span className="px-fa-1 text-h-s font-bold whitespace-nowrap text-neutral-900">
        {children}
      </span>
    </button>
  )
}
