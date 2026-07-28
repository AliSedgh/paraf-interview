'use client'

import { useMemo, useState } from 'react'

import { useClubSummary, useVitrinClubSummary } from '@/features/customer-club'
import { useLevels } from '@/features/level'
import { useRecentActivities } from '@/features/recent-activity'
import { useCurrentUser } from '@/features/user'
import { getVitrinId, roleLabel, useUserVitrins, useVitrin } from '@/features/vitrin'

import { ACTIVITY_FILTERS, toActivityRow, toLevelData } from '../lib/mappers'
import { profile as staticProfile } from '../mocks'

const ACTIVITIES_PAGE_SIZE = 10

const TOMAN_PER_COIN = 100

const FALLBACK_LEVEL_ICON = '/dashboard/level-bronze.png'
const REGULAR_USER_ICON = '/dashboard/level-flag.png'

export function useClubDashboard() {
  const [selectedVitrinId, setSelectedVitrinId] = useState<string | null>(null)
  const [activeFilterId, setActiveFilterId] = useState('all')

  const activeFilter =
    ACTIVITY_FILTERS.find((f) => f.id === activeFilterId) ?? ACTIVITY_FILTERS[0]

  const me = useCurrentUser()
  const vitrins = useUserVitrins()
  const levels = useLevels()
  const clubSummary = useClubSummary()
  const vitrinDetail = useVitrin(selectedVitrinId)
  const vitrinSummary = useVitrinClubSummary(selectedVitrinId)

  const activities = useRecentActivities({
    offset: 0,
    size: ACTIVITIES_PAGE_SIZE,
    ...(activeFilter.type ? { type: activeFilter.type } : {}),
  })

  const isVitrinScope = selectedVitrinId !== null

  const scopeQuery = isVitrinScope ? vitrinDetail : me
  const scores = (isVitrinScope ? vitrinDetail.data?.scores : me.data?.scores) ?? 0
  const levelName =
    (isVitrinScope ? vitrinDetail.data?.level?.name : me.data?.level?.name) ?? null
  const coins = me.data?.coins ?? 0

  const levelData = useMemo(
    () => toLevelData(levels.data, scores, FALLBACK_LEVEL_ICON, REGULAR_USER_ICON),
    [levels.data, scores],
  )

  const clubTabs = useMemo(() => {
    const tabs = [{ id: 'personal', label: 'پروفایل شخصی' }]
    for (const vitrin of vitrins.data ?? []) {
      const id = getVitrinId(vitrin)
      if (!id) continue
      tabs.push({ id, label: vitrin.companyName })
    }
    return tabs
  }, [vitrins.data])

  const activeTabId = selectedVitrinId ?? 'personal'

  const summary = isVitrinScope ? vitrinSummary.data : clubSummary.data
  const summaryQuery = isVitrinScope ? vitrinSummary : clubSummary

  const activityRows = useMemo(() => {
    const items = activities.data?.items
    if (!items) return []
    const now = new Date()
    return items.map((item, index) => toActivityRow(item, index, now))
  }, [activities.data])

  const selectedVitrin = (vitrins.data ?? []).find(
    (vitrin) => getVitrinId(vitrin) === selectedVitrinId,
  )

  const personalName =
    me.data?.fullName ??
    [me.data?.firstName, me.data?.lastName].filter(Boolean).join(' ') ??
    null

  const displayName = isVitrinScope
    ? (selectedVitrin?.companyName ?? null)
    : personalName || null

  const levelIconSrc =
    levelData?.steps.find((step) => step.state === 'current')?.imageSrc ??
    FALLBACK_LEVEL_ICON

  const isProfilePending = scopeQuery.isPending || summaryQuery.isPending
  const isLevelPending = levels.isPending || scopeQuery.isPending

  return {
    scope: {
      tabs: clubTabs,
      activeTabId,
      isVitrinScope,
      isPending: vitrins.isPending,
      select: (tabId: string) => setSelectedVitrinId(tabId === 'personal' ? null : tabId),
    },

    profile: {
      city: staticProfile.city,
      badge: staticProfile.badge,
      avatarSrc: staticProfile.avatarSrc,
      isVerified: staticProfile.isVerified,
      name: displayName,
      job: isVitrinScope ? roleLabel(String(selectedVitrin?.role ?? '')) : null,
      completedMissions: summary?.numberTasksCompleted ?? null,
      isPending: isProfilePending,
    },

    coinBalance: {
      coins: me.data ? coins : null,
      toman: me.data ? coins * TOMAN_PER_COIN : null,
      isPending: me.isPending,
    },

    currentLevel: {
      title: levelName,
      scores: scopeQuery.data ? scores : null,
      iconSrc: levelIconSrc,
      isPending: isLevelPending,
    },

    coinDiscountSummary: {
      periodDays: 30,
      coinsFromDiscountPlan: summary?.totalCoinMonthly ?? null,
      equivalentScores: summary?.totalScoreMonthly ?? null,
      isPending: summaryQuery.isPending,
    },

    level: {
      steps: levelData?.steps ?? [],
      ladder: levelData?.ladder ?? [],
      scoresToNextLevel: levelData?.scoresToNextLevel ?? null,
      nextLevelTitle: levelData?.nextLevel?.name ?? null,
      currentScore: scopeQuery.data ? scores : null,
      isPending: isLevelPending,
    },

    activities: {
      rows: activityRows,
      filters: ACTIVITY_FILTERS,
      activeFilterId,
      selectFilter: setActiveFilterId,
      isPending: activities.isPending,
      isError: activities.isError,
      error: activities.error,
    },

    queries: {
      me,
      vitrins,
      levels,
      clubSummary,
      vitrinDetail,
      vitrinSummary,
      activities,
    },
  }
}

export type ClubDashboardModel = ReturnType<typeof useClubDashboard>
