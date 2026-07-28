import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { Fragment } from 'react'

import type { LadderStep } from '../types'
import { Skeleton, focusRing } from './primitives'

export type LevelLadderProps = {
  /** سطح‌ها از `GET /levels` — مرتب‌شده و از سطح فعلی به بالا. */
  steps: LadderStep[]
  isPending: boolean
}

export function LevelLadder({ steps, isPending }: LevelLadderProps) {
  // مثل کارت سطح: به‌جای غیب‌شدن، قاب می‌ماند و اسکلت رندر می‌شود.
  if (!steps.length) {
    return (
      <div className="flex h-[49.08px] items-center gap-fa-3 rounded-fa-md bg-neutral-0 px-fa-3">
        {isPending
          ? [0, 1, 2, 3].map((index) => (
              <span key={index} className="flex items-center gap-fa-2 px-fa-3">
                <Skeleton className="h-[25px] w-[70px]" />
                <Skeleton className="size-8 rounded-fa-full" />
              </span>
            ))
          : null}
      </div>
    )
  }

  return (
    <div className="flex h-[49.08px] items-center gap-fa-3 rounded-fa-md bg-neutral-0 px-fa-3">
      {steps.map((step, index) => (
        <Fragment key={step.id}>
          {index > 0 ? (
            <ArrowLeft
              className="size-6 shrink-0 text-neutral-200"
              strokeWidth={2}
              aria-hidden
            />
          ) : null}

          <button
            type="button"
            className={`flex items-center rounded-fa-md px-fa-3 py-fa-2 transition-colors hover:bg-neutral-100 ${focusRing}`}
          >
            <span className="px-fa-1 text-h-s font-bold whitespace-nowrap text-neutral-900">
              {step.title}
            </span>
            <Image
              src={step.imageSrc}
              alt=""
              aria-hidden
              width={32}
              height={32}
              className="size-8 shrink-0"
            />
          </button>
        </Fragment>
      ))}
    </div>
  )
}
