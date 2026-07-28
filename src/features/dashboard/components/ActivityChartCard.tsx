import {
  chartCaption,
  chartHint,
  chartHintActions,
  chartSummary,
  chartTitle,
} from '../mocks'
import { ActivityChart } from './ActivityChart'
import { OutlineButton } from './primitives'

export function ActivityChartCard() {
  return (
    <div className="flex w-full max-w-[650px] min-w-0 flex-col gap-fa-6 rounded-fa-xl bg-neutral-0 p-fa-6 lg:h-[752px] lg:flex-[650_1_0] lg:px-fa-8 xl:px-fa-12 xl:py-fa-10">
      <div className="flex w-full max-w-[554px] flex-col gap-fa-3">
        <h2 className="text-h-xl font-bold text-neutral-900">{chartTitle}</h2>

        <div className="flex flex-col items-start gap-fa-3 rounded-fa-lg bg-neutral-200 px-fa-6 py-fa-3">
          <p className="text-h-s font-semibold whitespace-pre-line text-neutral-900">
            {chartHint}
          </p>
          <div className="flex w-full flex-wrap items-center gap-fa-3 py-fa-3">
            {chartHintActions.map((action) => (
              <OutlineButton key={action}>{action}</OutlineButton>
            ))}
          </div>
        </div>
      </div>

      <div className="flex w-full max-w-[554px] flex-col items-start gap-fa-2">
        <p className="w-full text-b-m text-neutral-700">{chartCaption}</p>

        <div className="flex w-full flex-col items-center gap-fa-3 rounded-fa-md px-fa-3 py-fa-1_5">
          <p className="w-full text-h-m font-semibold text-neutral-900">
            {chartSummary.before}
            <span className="text-danger">{chartSummary.highlight}</span>
            {chartSummary.after}
          </p>
        </div>

        <div className="w-full max-w-full">
          <ActivityChart />
        </div>
      </div>
    </div>
  )
}
