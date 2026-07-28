import type { LadderStep, LevelStep } from '../types'
import { LevelGoalCard } from './LevelGoalCard'
import { LevelLadder } from './LevelLadder'
import { LevelsProgressCard } from './LevelsProgressCard'
import { PromoBanner } from './PromoBanner'

export type LevelProgressSectionProps = {
  steps: LevelStep[]
  ladder: LadderStep[]
  currentScore: number | null
  scoresToNextLevel: number | null
  nextLevelTitle: string | null
  isPending: boolean
  children: React.ReactNode
}

export function LevelProgressSection({
  steps,
  ladder,
  currentScore,
  scoresToNextLevel,
  nextLevelTitle,
  isPending,
  children,
}: LevelProgressSectionProps) {
  return (
    <section className="flex flex-col">
      <div className="flex flex-col items-center justify-center gap-fa-6 rounded-fa-xl p-fa-2 lg:flex-row lg:gap-fa-6 lg:p-fa-4 2xl:gap-fa-10 2xl:p-fa-10">
        <div className="flex  flex-col items-center gap-fa-6 w-full">
          
          <div className="w-full">
            <div className="h-[calc(239px*var(--lvl))] w-full">
              <div className="h-[239px] w-full origin-top-left scale-[var(--lvl)]">
                <LevelsProgressCard
                  steps={steps}
                  currentScore={currentScore}
                  isPending={isPending}
                />
              </div>
            </div>
          </div>

          <div className="w-full max-w-full overflow-x-auto">
            <div className="mx-auto w-max px-fa-1">
              <LevelLadder steps={ladder} isPending={isPending} />
            </div>
          </div>
        </div>

        <LevelGoalCard
          scoresToNextLevel={scoresToNextLevel}
          nextLevelTitle={nextLevelTitle}
        />
      </div>

      <PromoBanner className="mt-fa-3" />

      <div className="mt-fa-6">{children}</div>
    </section>
  )
}
