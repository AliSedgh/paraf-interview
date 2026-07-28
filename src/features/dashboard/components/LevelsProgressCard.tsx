'use client'

import { Check, Zap } from 'lucide-react'
import Image from 'next/image'

import { cn } from '@/lib/utils'
import { useInView } from '@/shared/hooks/useInView'

import { formatNumber } from '@/shared/utils/formatNumber'

import type { LevelStep } from '../types'
import { ICON_STROKE, Skeleton } from './primitives'

export type LevelsProgressCardProps = {
  steps: LevelStep[]
  currentScore: number | null
  isPending: boolean
}

function LevelCheck({ done }: { done: boolean }) {
  return (
    <span
      className={`flex size-5 items-center justify-center rounded-t-none rounded-b-fa-full ${
        done ? 'bg-brand' : 'bg-brand-tint'
      }`}
    >
      <Check
        className={`size-4 ${done ? 'text-neutral-0' : 'text-brand/50'}`}
        strokeWidth={2}
        aria-hidden
      />
    </span>
  )
}

export function LevelsProgressCard({
  steps,
  currentScore,
  isPending,
}: LevelsProgressCardProps) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const regular = steps.find((step) => step.state === 'passed')
  const bronze = steps.find((step) => step.state === 'current')
  const silver = steps.find((step) => step.state === 'locked')

  if (!bronze) {
    return (
      <div className="relative h-[239px] w-[884px] overflow-hidden rounded-fa-xl bg-brand-a8 ring-1 ring-white/20 backdrop-blur-[12px] ring-inset">
        <div className="absolute top-[151.74px] left-0 h-3 w-[820px]">
          <div className="absolute top-1 left-0 h-px w-[816px] rounded-fa-full bg-neutral-0" />
        </div>
        <div className="absolute top-[16px] right-[40px] flex h-[207px] w-[764px] items-end justify-between">
          {[120, 56, 56].map((size, index) => (
            <div key={index} className="flex flex-col items-center gap-fa-3">
              <Skeleton
                className={cn('rounded-fa-full', !isPending && 'animate-none')}
                style={{ width: size, height: size }}
              />
              <Skeleton
                className={cn('h-[20px] w-[72px]', !isPending && 'animate-none')}
              />
              <Skeleton
                className={cn('h-[25px] w-[56px]', !isPending && 'animate-none')}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      data-inview={inView}
      className="relative h-[239px] w-[884px] overflow-hidden rounded-fa-xl bg-brand-a8 ring-1 ring-white/20 backdrop-blur-[12px] ring-inset"
    >
      <div className="absolute top-[151.74px] left-0 h-3 w-[820px]">
        <div className="absolute top-1 left-0 h-px w-[816px] rounded-fa-full bg-neutral-0 shadow-[0_0_12px_0_#9747ff8c]" />
        <div className="absolute top-0 right-0 h-3 w-[284px] rounded-fa-full bg-[linear-gradient(to_right,#4a2c91_0%,#7c49f280_100%)] p-px shadow-brand-glow">
          <div className="h-full w-full rounded-fa-full bg-[linear-gradient(to_right,#7c49f2_0%,#e5dbfc_100%)]" />
        </div>
      </div>

      <div className="absolute top-[16px] right-[40px] flex h-[207px] w-[764px] items-end justify-between">
        <div className="flex h-[207px] items-end gap-fa-0_5">
          {regular ? (
            <div className="flex w-[59px] flex-col items-center gap-fa-3">
              <div className="flex items-center justify-center py-fa-3">
                <Image
                  src={regular.imageSrc}
                  alt=""
                  aria-hidden
                  width={56}
                  height={56}
                  className="size-14"
                />
              </div>
              <div className="flex flex-col items-center gap-fa-1">
                <LevelCheck done={false} />
                <span className="text-h-s font-semibold whitespace-nowrap text-neutral-500">
                  {regular.title}
                </span>
                <span className="text-h-s font-semibold whitespace-nowrap text-neutral-500">
                  {regular.range}
                </span>
              </div>
            </div>
          ) : null}

          <div className="flex h-[207px] w-[282px] items-center justify-between gap-fa-20">
            <div className="flex w-[120px] flex-col items-center gap-fa-3">
              <Image
                src={bronze.imageSrc}
                alt=""
                aria-hidden
                width={120}
                height={120}
                className=" size-[120px]"
              />
              <div className="flex w-full flex-col items-center gap-fa-1">
                <LevelCheck done />
                <span className="paraf-anim-pulse-scale  leading-[16.27px] font-bold whitespace-nowrap text-neutral-900">
                  {bronze.title}
                </span>
                <span className="text-h-s font-semibold text-neutral-500">
                  {bronze.range}
                </span>
              </div>
            </div>

            <div className="flex h-full w-[80px] flex-col items-center justify-end">
              <div className="flex items-center justify-center py-fa-4">
                <span className="paraf-anim-wiggle flex items-center gap-fa-1 rounded-fa-full bg-brand px-fa-3">
                  <span className="text-h-xl font-semibold text-neutral-0">
                    {formatNumber(currentScore)}
                  </span>
                  <Zap
                    className="size-5 shrink-0 text-warning"
                    strokeWidth={ICON_STROKE}
                    aria-hidden
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        {silver ? (
          <div className="flex w-[73px] flex-col items-center gap-fa-3">
            <div className="flex items-center justify-center py-fa-3">
              <Image
                src={silver.imageSrc}
                alt=""
                aria-hidden
                width={56}
                height={56}
                className="size-14"
              />
            </div>
            <div className="flex w-full flex-col items-center gap-fa-1_5">
              <span className="flex items-center rounded-fa-full bg-brand-tint pr-fa-1_5 pl-fa-1">
                <span className="text-h-s font-semibold text-brand">
                  {formatNumber(silver.threshold ?? 0)}
                </span>
                <Zap
                  className="size-[14px] shrink-0 text-brand/30"
                  strokeWidth={1}
                  aria-hidden
                />
              </span>
              <span className="text-h-s font-semibold whitespace-nowrap text-neutral-700">
                {silver.title}
              </span>
              <span className="text-h-s font-semibold whitespace-nowrap text-neutral-500">
                {silver.range}
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
