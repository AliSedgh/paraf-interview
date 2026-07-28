import type { LucideIcon } from 'lucide-react'

export type ClubTab = {
  id: string
  label: string
}

export type Profile = {
  name: string
  isVerified: boolean
  job: string
  city: string
  badge: string
  completedMissions: number
  avatarSrc: string
}

export type CoinBalance = {
  coins: number
  toman: number
}

export type CurrentLevel = {
  title: string
  scores: number
}

export type CoinDiscountSummary = {
  periodDays: number
  coinsFromDiscountPlan: number
  equivalentScores: number
}

export type ProfileView = {
  name: string | null
  job: string | null
  city: string
  badge: string
  avatarSrc: string
  isVerified: boolean
  completedMissions: number | null
  isPending: boolean
}

export type CoinBalanceView = {
  coins: number | null
  toman: number | null
  isPending: boolean
}

export type CurrentLevelView = {
  title: string | null
  scores: number | null
  iconSrc: string
  isPending: boolean
}

export type CoinDiscountSummaryView = {
  periodDays: number
  coinsFromDiscountPlan: number | null
  equivalentScores: number | null
  isPending: boolean
}

export type LevelStep = {
  id: string
  title: string
  range: string
  imageSrc: string
  imageSize: number
  state: 'passed' | 'current' | 'locked'
  threshold?: number
}

export type LadderStep = {
  id: string
  title: string
  imageSrc: string
}

export type PromoBannerData = {
  imageSrc: string
  alt: string
}

export type ChartPoint = {
  month: string
  value: number
}

export type ActivityKind = 'score' | 'coin' | 'withdraw' | 'transfer' | 'both'

export type ActivityAmount = {
  label: string
  value: string
}

export type Activity = {
  id: string
  day: string
  time: string
  status: string
  description: string
  amounts: ActivityAmount[]
  kind: ActivityKind
  icon: LucideIcon
  iconClassName: string
}

export type Feature = {
  id: string
  title: string
  description: string
  imageSrc: string
}
