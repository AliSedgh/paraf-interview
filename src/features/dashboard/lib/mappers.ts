import { Coins, Repeat, Zap } from 'lucide-react'

import type { Level } from '@/features/level'
import {
  RecentActivitiesTypeEnum,
  type RecentActivitiesType,
  type RecentActivity,
} from '@/features/recent-activity'
import { resolveFileUrl } from '@/shared/utils/fileUrl'

import type { Activity, ActivityAmount, LadderStep, LevelStep } from '../types'

const fa = new Intl.NumberFormat('fa-IR')

function signed(value: number, sign: '+' | '-') {
  return `${sign}${fa.format(Math.abs(value))}`
}

const ACTIVITY_STYLE: Record<
  RecentActivitiesType,
  { icon: Activity['icon']; iconClassName: string; kind: Activity['kind'] }
> = {
  SCORE: { icon: Zap, iconClassName: 'text-success-alt/50', kind: 'score' },
  COIN: { icon: Coins, iconClassName: 'text-info/50', kind: 'coin' },
  BOTH: { icon: Repeat, iconClassName: 'text-success-alt/50', kind: 'both' },
  SPENTCOIN: { icon: Coins, iconClassName: 'text-warning/50', kind: 'withdraw' },
  TRANSFERCOIN: { icon: Coins, iconClassName: 'text-danger/50', kind: 'transfer' },
}

function amountsFor(activity: RecentActivity): ActivityAmount[] {
  switch (activity.type) {
    case RecentActivitiesTypeEnum.SCORE:
      return [{ label: 'امتیاز', value: signed(activity.scoreAmount, '+') }]
    case RecentActivitiesTypeEnum.COIN:
      return [{ label: 'سکه', value: signed(activity.coinAmount, '+') }]
    case RecentActivitiesTypeEnum.BOTH:
      return [
        { label: 'امتیاز', value: signed(activity.scoreAmount, '+') },
        { label: 'سکه', value: signed(activity.coinAmount, '+') },
      ]
    case RecentActivitiesTypeEnum.SPENTCOIN:
      return [{ label: 'برداشت', value: signed(activity.coinAmount, '-') }]
    case RecentActivitiesTypeEnum.TRANSFERCOIN:
      return [{ label: 'انتقال', value: signed(activity.coinAmount, '-') }]
    default:
      return [
        activity.scoreAmount
          ? { label: 'امتیاز', value: signed(activity.scoreAmount, '+') }
          : { label: 'سکه', value: signed(activity.coinAmount, '+') },
      ]
  }
}

const MS_PER_DAY = 86_400_000

export function activityDayLabel(createdAt: string | undefined, now: Date): string {
  if (!createdAt) return ''
  const date = new Date(createdAt)
  if (Number.isNaN(date.getTime())) return ''

  const startOf = (d: Date) => Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
  const days = Math.round((startOf(now) - startOf(date)) / MS_PER_DAY)

  if (days === 0) return 'امروز'
  if (days === 1) return 'دیروز'

  return new Intl.DateTimeFormat('fa-IR', { day: 'numeric', month: 'long' }).format(date)
}

function activityTimeLabel(createdAt: string | undefined): string {
  if (!createdAt) return ''
  const date = new Date(createdAt)
  if (Number.isNaN(date.getTime())) return ''

  return new Intl.DateTimeFormat('fa-IR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)
}

export function toActivityRow(
  activity: RecentActivity,
  index: number,
  now: Date,
): Activity {
  const style =
    ACTIVITY_STYLE[activity.type as RecentActivitiesType] ?? ACTIVITY_STYLE.SCORE

  return {
    id: activity.id ?? `activity-${index}`,
    day: activityDayLabel(activity.createdAt, now),
    time: activityTimeLabel(activity.createdAt),
    status: 'موفق',
    description: activity.taskDescription || activity.taskTitle,
    amounts: amountsFor(activity),
    kind: style.kind,
    icon: style.icon,
    iconClassName: style.iconClassName,
  }
}

export const ACTIVITY_FILTERS: {
  id: string
  label: string
  type: RecentActivitiesType | null
}[] = [
  { id: 'all', label: 'نمایش همه', type: null },
  { id: 'score', label: 'امتیاز', type: RecentActivitiesTypeEnum.SCORE },
  { id: 'coin', label: 'سکه', type: RecentActivitiesTypeEnum.COIN },
  { id: 'both', label: 'دوگانه', type: RecentActivitiesTypeEnum.BOTH },
  { id: 'spent', label: 'برداشت سکه', type: RecentActivitiesTypeEnum.SPENTCOIN },
  { id: 'transfer', label: 'انتقال سکه', type: RecentActivitiesTypeEnum.TRANSFERCOIN },
]

function levelRange(levels: Level[], index: number): string {
  const from = levels[index].scores
  const next = levels[index + 1]
  return next
    ? `${fa.format(from)} تا ${fa.format(next.scores - 1)}`
    : `${fa.format(from)}+`
}

export type LevelLadderData = {
  ladder: LadderStep[]
  steps: LevelStep[]
  currentIndex: number
  nextLevel: Level | null
  scoresToNextLevel: number
}

export function toLevelData(
  levels: Level[] | undefined,
  userScores: number,
  fallbackIcon: string,
  regularUserIcon: string,
): LevelLadderData | null {
  if (!levels?.length) return null

  const sorted = [...levels].sort((a, b) => a.scores - b.scores)
  const icon = (level: Level) => resolveFileUrl(level.file?.link) ?? fallbackIcon

  let currentIndex = 0
  for (let i = 0; i < sorted.length; i++)
    if (userScores >= sorted[i].scores) currentIndex = i

  const nextLevel = sorted[currentIndex + 1] ?? null

  const ladder: LadderStep[] = sorted.slice(currentIndex).map((level) => ({
    id: level.id ?? level.name,
    title: level.name,
    imageSrc: icon(level),
  }))

  const regularUserStep = (): LevelStep => ({
    id: 'regular-user',
    title: 'کاربر عادی',
    range: `${fa.format(0)} تا ${fa.format(Math.max(0, sorted[0].scores - 1))}`,
    imageSrc: regularUserIcon,
    imageSize: 56,
    state: 'passed',
  })

  const pick = (index: number, state: LevelStep['state']): LevelStep | null => {
    const level = sorted[index]
    if (!level) return null
    return {
      id: level.id ?? level.name,
      title: level.name,
      range: levelRange(sorted, index),
      imageSrc: icon(level),
      imageSize: state === 'current' ? 120 : 56,
      state,
      threshold: state === 'locked' ? level.scores : undefined,
    }
  }

  const previous = pick(currentIndex - 1, 'passed') ?? regularUserStep()

  const steps = [
    previous,
    pick(currentIndex, 'current'),
    pick(currentIndex + 1, 'locked'),
  ].filter((step): step is LevelStep => step !== null)

  return {
    ladder,
    steps,
    currentIndex,
    nextLevel,
    scoresToNextLevel: nextLevel ? Math.max(0, nextLevel.scores - userScores) : 0,
  }
}
