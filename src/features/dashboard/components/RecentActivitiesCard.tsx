'use client'

import { Eye, History } from 'lucide-react'

import { cn } from '@/lib/utils'

import { activitiesFullListLabel, activitiesSubtitle, activitiesTitle } from '../mocks'
import type { Activity } from '../types'
import { ICON_STROKE, focusRing } from './primitives'

function ActivityRow({ activity }: { activity: Activity }) {
  const Icon = activity.icon

  return (
    <li className="flex h-[52px] w-full items-center justify-between gap-fa-3 overflow-hidden rounded-fa-full bg-neutral-100 p-fa-2">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-fa-full bg-neutral-0">
        <Icon
          className={cn('size-5', activity.iconClassName)}
          strokeWidth={2}
          aria-hidden
        />
      </span>

      <div className="flex min-w-0 flex-1 items-center justify-between gap-fa-4 xl:gap-fa-10">
        <div
          className={cn(
            'flex w-[100px] shrink-0 items-center gap-fa-0_5',
            activity.amounts.length > 1 && 'flex-col items-end gap-0',
          )}
        >
          {activity.amounts.map((amount) => (
            <span
              key={amount.label}
              className="flex items-center gap-fa-0_5 whitespace-nowrap"
            >
              <span dir="ltr" className="text-h-s font-bold text-neutral-900">
                {amount.value}
              </span>
              <span className="text-h-s font-bold text-neutral-900">{amount.label}</span>
            </span>
          ))}
        </div>

        <p className="min-w-0 flex-1 truncate text-b-xs text-neutral-900">
          {activity.description}
        </p>
      </div>

      <div className="hidden shrink-0 items-center gap-fa-3 md:flex">
        <span className="flex items-center rounded-fa-full bg-neutral-200 px-fa-1_5 py-[2px]">
          <span className="text-b-2xs font-semibold text-neutral-900">
            {activity.status}
          </span>
        </span>

        <span className="flex w-[120px] items-center gap-fa-1 px-fa-2">
          <History
            className="size-3 shrink-0 text-neutral-500"
            strokeWidth={ICON_STROKE}
            aria-hidden
          />
          <span className="text-b-2xs text-neutral-700">{activity.time}</span>
          <span className="text-b-2xs text-neutral-400">-</span>
          <span className="text-b-2xs whitespace-nowrap text-neutral-700">
            {activity.day}
          </span>
        </span>
      </div>
    </li>
  )
}

export type ActivityFilter = { id: string; label: string }

export type RecentActivitiesCardProps = {
  rows: Activity[]
  filters: ActivityFilter[]
  activeFilterId: string
  onSelectFilter: (id: string) => void
  isPending?: boolean
  isError?: boolean
  errorMessage?: string
}

export function RecentActivitiesCard({
  rows,
  filters,
  activeFilterId,
  onSelectFilter,
  isPending = false,
  isError = false,
  errorMessage,
}: RecentActivitiesCardProps) {
  return (
    <div className="flex w-full max-w-[1006px] min-w-0 flex-col items-center rounded-fa-xl bg-neutral-0 p-fa-6 lg:h-[752px] lg:flex-[1006_1_0] lg:px-fa-8 xl:px-fa-12 xl:py-fa-10">
      <div className="flex w-full max-w-[910px] min-w-0 flex-col items-center gap-fa-6">
        <div className="flex w-full flex-col items-start gap-fa-6">
          <div className="flex w-full flex-wrap items-center justify-between gap-fa-4">
            <div className="flex min-w-0 flex-wrap items-center gap-fa-4">
              <h2 className="text-h-xl font-bold whitespace-nowrap text-neutral-900">
                {activitiesTitle}
              </h2>

              <div
                role="tablist"
                aria-label={activitiesTitle}
                className="flex flex-wrap items-center gap-fa-1 rounded-fa-full bg-neutral-200 p-fa-1_5 ring-1 ring-neutral-900/10 ring-inset"
              >
                {filters.map((filter) => {
                  const isActive = filter.id === activeFilterId
                  return (
                    <button
                      key={filter.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => onSelectFilter(filter.id)}
                      className={cn(
                        'flex items-center justify-center rounded-fa-full px-fa-3 py-fa-1_5 text-b-xs whitespace-nowrap',
                        focusRing,
                        isActive
                          ? 'bg-neutral-0 font-bold text-neutral-900 ring-1 ring-neutral-900 ring-inset'
                          : 'text-neutral-900',
                      )}
                    >
                      {filter.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <button
              type="button"
              className={cn(
                'flex items-center rounded-fa-md py-fa-1 pr-fa-2 pl-fa-1_5',
                'transition-colors hover:bg-neutral-100',
                focusRing,
              )}
            >
              <span className="px-fa-1 text-h-s font-bold whitespace-nowrap text-neutral-900">
                {activitiesFullListLabel}
              </span>
              <span className="flex size-6 items-center justify-center">
                <Eye
                  className="size-4 text-neutral-900"
                  strokeWidth={ICON_STROKE}
                  aria-hidden
                />
              </span>
            </button>
          </div>

          <p className="w-full text-end text-b-m text-neutral-700">
            {activitiesSubtitle}
          </p>
        </div>

        {isError ? (
          <p role="alert" className="w-full py-fa-10 text-center text-b-m text-danger">
            {errorMessage ?? 'دریافت فعالیت‌ها ناموفق بود.'}
          </p>
        ) : isPending ? (
          <ul className="flex w-full flex-col gap-fa-1" aria-busy>
            {Array.from({ length: 10 }, (_, index) => (
              <li
                key={index}
                className="h-[52px] w-full animate-pulse rounded-fa-full bg-neutral-100"
              />
            ))}
          </ul>
        ) : rows.length ? (
          <ul className="flex w-full flex-col gap-fa-1">
            {rows.map((activity) => (
              <ActivityRow key={activity.id} activity={activity} />
            ))}
          </ul>
        ) : (
          <p className="w-full py-fa-10 text-center text-b-m text-neutral-500">
            فعالیتی ثبت نشده.
          </p>
        )}
      </div>
    </div>
  )
}
