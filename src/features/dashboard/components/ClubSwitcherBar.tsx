'use client'

import { cn } from '@/lib/utils'

import { clubSwitcherLabel, clubSwitcherLinks } from '../mocks'
import { TextButton, focusRing } from './primitives'

export type ClubSwitcherTab = {
  id: string
  label: string
}

export type ClubSwitcherBarProps = {
  tabs: ClubSwitcherTab[]
  activeTabId: string
  onSelect: (tabId: string) => void
  isLoading?: boolean
}

export function ClubSwitcherBar({
  tabs,
  activeTabId,
  onSelect,
  isLoading = false,
}: ClubSwitcherBarProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-start gap-fa-2 px-fa-4 py-fa-3 md:flex-row md:items-center md:justify-between lg:gap-fa-3 xl:h-[56px] xl:gap-fa-4 xl:px-fa-10 xl:py-fa-1',
        'bg-[image:var(--gradient-shine)]',
        'border border-transparent [border-image:linear-gradient(to_right,#ffffff00_0%,#ffffffcc_15%,#ffffff00_32%,#ffffff00_70%,#ffffffcc_85%,#ffffff00_100%)_1]',
      )}
    >
      <div className="flex min-w-0 flex-wrap items-center gap-fa-2 lg:gap-fa-1_5 xl:gap-fa-2">
        <span className="text-h-s font-semibold whitespace-nowrap text-neutral-900">
          {clubSwitcherLabel}
        </span>

        <div
          role="tablist"
          aria-label={clubSwitcherLabel}
          aria-busy={isLoading || undefined}
          className="flex flex-wrap items-center gap-fa-1 rounded-fa-md bg-neutral-300 p-fa-1 ring-1 ring-neutral-900/10 ring-inset"
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelect(tab.id)}
                className={cn(
                  'flex h-10 items-center justify-center rounded-fa-md px-fa-3 py-fa-1_5 whitespace-nowrap',
                  focusRing,
                  isActive
                    ? 'bg-neutral-0 text-h-m font-bold text-neutral-900 ring-2 ring-info ring-inset'
                    : 'text-b-l text-neutral-900 transition-colors hover:bg-neutral-200',
                )}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="hidden shrink-0 items-center gap-fa-1 lg:flex lg:gap-fa-2 xl:gap-fa-4">
        {clubSwitcherLinks.map((link) => (
          <TextButton key={link.id}>{link.label}</TextButton>
        ))}
      </div>
    </div>
  )
}
