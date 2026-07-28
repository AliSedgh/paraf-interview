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

/**
 * بخش پیشرفت سطح — نود `2:13130`.
 *
 * در طرح یک ستون با فاصله‌ی ۳۲۰px است که بنر تبلیغاتی داخل همان فاصله می‌نشیند.
 * اینجا همان ۳۲۰px با سه بلوک در جریان عادی بازسازی شده — ۱۲px بالای بنر،
 * ۲۸۴px خود بنر، ۲۴px زیرش — تا هیچ آفست ثابتی به ارتفاع بخش گره نخورد.
 */
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
      {/*
        کارت سطح ۸۸۴px و کارت هدف ۳۶۰px با gap ۴۰px حداقل ~۱۲۸۴px عرض می‌خواهند و
        کانتینر صفحه هم ۲۴۰px padding دارد. پس ردیفی‌شدن فقط از ۱۵۶۰px به بالا
        فعال است؛ پایین‌تر از آن ستونی می‌مانند تا دو کارت روی هم نیفتند.
      */}
      <div className="flex flex-col items-center justify-center gap-fa-6 rounded-fa-xl p-fa-4 min-[1560px]:flex-row min-[1560px]:gap-fa-10 min-[1560px]:p-fa-10">
        <div className="flex w-full min-w-0 flex-col items-center gap-fa-6 min-[1560px]:w-auto min-[1560px]:shrink-0">
          <div className="w-full max-w-full overflow-x-auto min-[1560px]:overflow-visible">
            <div className="mx-auto w-max p-fa-1 min-[1560px]:p-0">
              <LevelsProgressCard
                steps={steps}
                currentScore={currentScore}
                isPending={isPending}
              />
            </div>
          </div>
          <div className="w-full max-w-full overflow-x-auto min-[1560px]:overflow-visible">
            <div className="mx-auto w-max px-fa-1 min-[1560px]:px-0">
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
