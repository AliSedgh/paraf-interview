export const RecentActivitiesTypeEnum = {
  BOTH: 'BOTH',
  COIN: 'COIN',
  SCORE: 'SCORE',
  SPENTCOIN: 'SPENTCOIN',
  TRANSFERCOIN: 'TRANSFERCOIN',
} as const

export type RecentActivitiesType =
  (typeof RecentActivitiesTypeEnum)[keyof typeof RecentActivitiesTypeEnum]

export const RECENT_ACTIVITY_TYPE_LABELS: Record<RecentActivitiesType, string> = {
  BOTH: 'دوگانه',
  COIN: 'سکه',
  SCORE: 'امتیاز',
  SPENTCOIN: 'برداشت سکه',
  TRANSFERCOIN: 'انتقال سکه',
}

export function activityTypeLabel(type: string): string {
  return RECENT_ACTIVITY_TYPE_LABELS[type as RecentActivitiesType] ?? type
}

export function isDebitActivity(type: string): boolean {
  return (
    type === RecentActivitiesTypeEnum.SPENTCOIN ||
    type === RecentActivitiesTypeEnum.TRANSFERCOIN
  )
}

export type RecentActivity = {
  type: RecentActivitiesType | string
  taskTitle: string
  taskDescription: string
  scoreAmount: number
  coinAmount: number

  id?: string
  createdAt?: string
}

export type RecentActivitiesParams = {
  offset?: number
  size?: number
  type?: RecentActivitiesType
  userVitrinId?: string
}

export type RecentActivityPage = {
  items: RecentActivity[]
  total: number | null
}
