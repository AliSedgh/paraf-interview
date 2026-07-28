import { SquareCheck, Zap } from 'lucide-react'

import { formatNumber } from '@/shared/utils/formatNumber'

import { missionsCtaLabel } from '../mocks'
import { OutlineButton } from './primitives'

export type LevelGoalCardProps = {
  scoresToNextLevel: number | null
  nextLevelTitle: string | null
}

export function LevelGoalCard({ scoresToNextLevel, nextLevelTitle }: LevelGoalCardProps) {
  return (
    <div className="flex h-[157.2px] w-full max-w-[360px] shrink-0 lg:w-[300px] xl:w-[330px] 2xl:w-[360px] flex-col items-center gap-fa-4 rounded-fa-full bg-brand-a8 px-fa-16 py-fa-8 ring-1 ring-white/20 backdrop-blur-[12px] ring-inset">
      <div className="flex w-full items-center justify-center gap-fa-1_5">
        <span className="text-b-l whitespace-nowrap text-neutral-900">
          امتیاز لازم تا {nextLevelTitle ?? 'سطح بعدی'}
        </span>

        <span className="gap-fa-2_5 flex items-center rounded-fa-full bg-neutral-100 px-fa-2 py-fa-1 ring-[1.5px] ring-brand-tint ring-inset">
          <span className="flex items-center">
            <span dir="ltr" className="text-h-s font-bold text-brand">
              +{formatNumber(scoresToNextLevel)}
            </span>
            <Zap
              className="size-[14px] shrink-0 text-brand"
              strokeWidth={1}
              aria-hidden
            />
          </span>
        </span>
      </div>

      <OutlineButton
        className="w-full flex-row-reverse"
        icon={<SquareCheck className="size-5 text-info" strokeWidth={2} aria-hidden />}
      >
        {missionsCtaLabel}
      </OutlineButton>
    </div>
  )
}
