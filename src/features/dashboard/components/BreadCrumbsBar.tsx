import { ArrowRight, ChevronLeft, CircleHelp } from 'lucide-react'
import Image from 'next/image'
import { Fragment } from 'react'

import { cn } from '@/lib/utils'

import { breadCrumbs } from '../mocks'
import { ICON_STROKE, focusRing } from './primitives'

export type BreadCrumbsBarProps = {
  score: number | null
  levelIconSrc: string
  isPending: boolean
}

export function BreadCrumbsBar({ score, levelIconSrc, isPending }: BreadCrumbsBarProps) {
  return (
    <div className="flex h-[49.16px] w-full items-center justify-between gap-fa-0_5 bg-neutral-100 px-fa-4 py-fa-2 md:px-fa-8 xl:px-fa-30">
      <div className="flex items-center gap-fa-0_5">
        <button
          type="button"
          className={cn(
            'flex items-center rounded-fa-md py-fa-1 pr-fa-2 pl-fa-1_5',
            'transition-colors hover:bg-neutral-200',
            focusRing,
          )}
        >
          <span className="px-fa-1 text-h-s font-bold whitespace-nowrap text-neutral-900">
            {breadCrumbs.backLabel}
          </span>
          <span className="flex size-6 items-center justify-center">
            <ArrowRight
              className="size-[18px] text-neutral-900"
              strokeWidth={ICON_STROKE}
              aria-hidden
            />
          </span>
        </button>

        <nav aria-label="مسیر صفحه">
          <ol className="flex items-center gap-fa-0_5 px-fa-1">
            {breadCrumbs.trail.map((item, index) => (
              <Fragment key={item.id}>
                <li
                  className={
                    item.current
                      ? 'text-[13px] leading-[20.15px] font-semibold whitespace-nowrap text-neutral-700'
                      : 'text-b-s whitespace-nowrap text-neutral-500'
                  }
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.label}
                </li>
                {index < breadCrumbs.trail.length - 1 ? (
                  <ChevronLeft
                    className="size-3 shrink-0 text-neutral-500"
                    strokeWidth={1}
                    aria-hidden
                  />
                ) : null}
              </Fragment>
            ))}
          </ol>
        </nav>
      </div>

      <div className="flex items-center gap-fa-2 xl:gap-fa-4">
        <div className="hidden items-center gap-fa-1 lg:flex">
          <div className="flex h-[33.16px] items-center rounded-fa-md border border-neutral-400 bg-neutral-0 px-fa-1_5 py-fa-1">
            <span className="px-fa-1 text-h-s font-bold whitespace-nowrap text-neutral-900">
              <span className="text-neutral-500">{breadCrumbs.walletLabel}</span>
              {'   '}
              {formatToman(breadCrumbs.walletAmount)}
              <span className="pr-2 font-normal text-neutral-500">
                {breadCrumbs.walletCurrency}
              </span>
            </span>
          </div>

          <div className="flex items-center px-fa-2">
            <button
              type="button"
              aria-label={breadCrumbs.helpLabel}
              title={breadCrumbs.helpLabel}
              className={cn(
                'flex size-8 items-center justify-center rounded-fa-full p-fa-1',
                'transition-colors hover:bg-neutral-200',
                focusRing,
              )}
            >
              <span className="flex size-6 items-center justify-center">
                <CircleHelp
                  className="size-[18px] text-neutral-500"
                  strokeWidth={ICON_STROKE}
                  aria-hidden
                />
              </span>
            </button>
          </div>
        </div>

        <div className="relative h-8 w-[192px] px-fa-1">
          <div className="absolute top-0 left-0 h-8 w-[176px] rounded-l-fa-full bg-neutral-0 shadow-l1">
            <span className="absolute top-1 right-[10px] flex h-6 w-14 items-center rounded-l-fa-full bg-brand px-fa-2">
              <span className="w-full text-left text-h-s font-bold text-neutral-0">
                {isPending || score === null ? '—' : formatToman(score)}
              </span>
            </span>
          </div>

          <div className="absolute top-0 left-[160px] flex size-8 items-center justify-center rounded-fa-full bg-neutral-0 p-[2px] shadow-l1">
            <Image
              src={levelIconSrc}
              alt=""
              aria-hidden
              width={24}
              height={24}
              className="size-6 rounded-fa-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function formatToman(value: number) {
  return new Intl.NumberFormat('fa-IR').format(value)
}
