import { http } from 'msw'

import type { ClubSummary, VitrinClubSummary } from '@/features/customer-club'
import type { Level } from '@/features/level'
import type { RecentActivity } from '@/features/recent-activity'
import type { CurrentUser } from '@/features/user'
import type { UserVitrin, VitrinDetail } from '@/features/vitrin'
import { env } from '@/lib/env'

import { ok } from './envelope'

const api = (path: string) => `${env.NEXT_PUBLIC_API_BASE_URL}${path}`

export const mockLevels: Level[] = [
  { id: 'lvl-1', name: 'برنزی', scores: 0, file: { link: 'uploads/level/bronze.png' } },
  {
    id: 'lvl-2',
    name: 'نقره‌ای',
    scores: 400,
    file: { link: 'uploads/level/silver.png' },
  },
  { id: 'lvl-3', name: 'طلایی', scores: 1000, file: { link: 'uploads/level/gold.png' } },
]

export const mockCurrentUser: CurrentUser = {
  id: 'user-1',
  phone: '989027927890',
  fullName: 'آرین عزیز',
  level: mockLevels[0],
  coins: 691,
  scores: 561,
}

export const mockVitrins: UserVitrin[] = [
  { id: 'vit-1', role: 'retailer', companyName: 'فروشگاه آرین' },
  { id: 'vit-2', role: 'wholesaler', companyName: 'پخش مشهد' },
]

export const mockVitrinDetail: VitrinDetail = {
  id: 'vit-1',
  companyName: 'فروشگاه آرین',
  role: 'retailer',
  level: mockLevels[1],
  scores: 420,
}

export const mockClubSummary: ClubSummary = {
  numberTasksCompleted: 12,
  totalScoreMonthly: 340,
  totalCoinMonthly: 85,
}

export const mockVitrinClubSummary: VitrinClubSummary = {
  numberTasksCompleted: 5,
  totalScoreMonthly: 120,
}

export const mockActivities: RecentActivity[] = [
  {
    id: 'act-1',
    type: 'SCORE',
    taskTitle: 'تکمیل پروفایل',
    taskDescription: 'اطلاعات پروفایلت رو کامل کن',
    scoreAmount: 20,
    coinAmount: 0,
    createdAt: '2026-07-20T10:00:00Z',
  },
  {
    id: 'act-2',
    type: 'BOTH',
    taskTitle: 'اولین خرید',
    taskDescription: 'اولین سفارشت رو ثبت کن',
    scoreAmount: 50,
    coinAmount: 5,
    createdAt: '2026-07-21T10:00:00Z',
  },
  {
    id: 'act-3',
    type: 'SPENTCOIN',
    taskTitle: 'برداشت سکه',
    taskDescription: 'برداشت از کیف پول',
    scoreAmount: 0,
    coinAmount: 170,
    createdAt: '2026-07-22T10:00:00Z',
  },
]

export const clubHandlers = [
  http.get(api('/users/me'), () => ok<CurrentUser>(mockCurrentUser)),

  http.get(api('/users/vitrin/all-user'), () => ok<UserVitrin[]>(mockVitrins)),

  http.get(api('/users/vitrin/:userVitrinId'), ({ params }) =>
    ok<VitrinDetail>({ ...mockVitrinDetail, id: String(params.userVitrinId) }),
  ),

  http.get(api('/levels'), () => ok<Level[]>(mockLevels)),

  http.get(api('/customer-club/summary'), () => ok<ClubSummary>(mockClubSummary)),

  http.get(api('/customer-club/summary-user-vitrin/:userVitrinId'), () =>
    ok<VitrinClubSummary>(mockVitrinClubSummary),
  ),

  http.get(api('/recent-activities'), ({ request }) => {
    const url = new URL(request.url)
    const type = url.searchParams.get('type')
    const offset = Number(url.searchParams.get('offset') ?? 0)
    const size = Number(url.searchParams.get('size') ?? 10)

    const filtered = type
      ? mockActivities.filter((activity) => activity.type === type)
      : mockActivities

    return ok({
      items: filtered.slice(offset, offset + size),
      total: filtered.length,
    })
  }),
]
