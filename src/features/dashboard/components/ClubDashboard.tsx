'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useAuthStore } from '@/features/auth'

import { useClubDashboard } from '../hooks/useClubDashboard'
import { ActivityChartCard } from './ActivityChartCard'
import { BreadCrumbsBar } from './BreadCrumbsBar'
import { ClubSwitcherBar } from './ClubSwitcherBar'
import { FeaturesGrid } from './FeaturesGrid'
import { LevelProgressSection } from './LevelProgressSection'
import { PageBackdrop } from './PageBackdrop'
import { ProfileSummaryCard } from './ProfileSummaryCard'
import { RecentActivitiesCard } from './RecentActivitiesCard'
import { WelcomeHero } from './WelcomeHero'

export function ClubDashboard() {
  const router = useRouter()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const hasHydrated = useAuthStore((state) => state.hasHydrated)

  const dashboard = useClubDashboard()

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) router.replace('/login')
  }, [hasHydrated, isAuthenticated, router])

  if (!hasHydrated || !isAuthenticated) {
    return (
      <p className="p-fa-16 text-center text-b-m text-neutral-700">در حال بررسی ورود…</p>
    )
  }

  return (
    <div className="relative w-full overflow-hidden">
      <PageBackdrop />

      <BreadCrumbsBar
        score={dashboard.level.currentScore}
        levelIconSrc={dashboard.currentLevel.iconSrc}
        isPending={dashboard.level.isPending}
      />

      <div className="relative mx-auto flex w-full max-w-[1920px] flex-col gap-fa-10 px-fa-4 pt-[15px] pb-fa-16 md:px-fa-8 lg:px-fa-10 xl:px-fa-16 2xl:px-fa-30">
        <WelcomeHero
          name={dashboard.profile.name}
          isPending={dashboard.profile.isPending}
        />

        <section className="flex w-full min-w-0 flex-col items-center gap-fa-2">
          <ClubSwitcherBar
            tabs={dashboard.scope.tabs}
            activeTabId={dashboard.scope.activeTabId}
            onSelect={dashboard.scope.select}
            isLoading={dashboard.scope.isPending}
          />
          <ProfileSummaryCard
            profile={dashboard.profile}
            coinBalance={dashboard.coinBalance}
            currentLevel={dashboard.currentLevel}
            coinDiscountSummary={dashboard.coinDiscountSummary}
            levelIconSrc={dashboard.currentLevel.iconSrc}
          />
        </section>

        <LevelProgressSection
          steps={dashboard.level.steps}
          ladder={dashboard.level.ladder}
          currentScore={dashboard.level.currentScore}
          scoresToNextLevel={dashboard.level.scoresToNextLevel}
          nextLevelTitle={dashboard.level.nextLevelTitle}
          isPending={dashboard.level.isPending}
        >
          <div className="flex flex-col lg:flex-row  items-center gap-fa-6 py-fa-10  min-[1700px]:items-stretch min-[1700px]:justify-center">
            <RecentActivitiesCard
              rows={dashboard.activities.rows}
              filters={dashboard.activities.filters}
              activeFilterId={dashboard.activities.activeFilterId}
              onSelectFilter={dashboard.activities.selectFilter}
              isPending={dashboard.activities.isPending}
              isError={dashboard.activities.isError}
              errorMessage={dashboard.activities.error?.message}
            />
            <ActivityChartCard />
          </div>
        </LevelProgressSection>

        <FeaturesGrid />
      </div>
    </div>
  )
}
