import type { LevelSummary } from '@/features/level'

export type CurrentUser = {
  level: LevelSummary | null
  coins: number
  scores: number

  id?: string
  phone?: string
  firstName?: string
  lastName?: string
  fullName?: string
}
