import type { LevelSummary } from '@/features/level'

export const EndUserRoleEnum = {
  USER: 'user',
  RETAILER: 'retailer',
  WHOLESALER: 'wholesaler',
  MARKETER: 'marketer',
  PRODUCER: 'producer',
  IMPORTER: 'importer',
  MERCHANT: 'merchant',
  DISTRIBUTOR: 'distributor',
  BANK: 'bank',
  GOVERNMENT: 'government',
  INSTITUTE: 'institute',
} as const

export type EndUserRole = (typeof EndUserRoleEnum)[keyof typeof EndUserRoleEnum]

export const END_USER_ROLE_LABELS: Record<EndUserRole, string> = {
  user: 'کاربر',
  retailer: 'خرده‌فروش',
  wholesaler: 'عمده‌فروش',
  marketer: 'بازاریاب',
  producer: 'تولیدکننده',
  importer: 'واردکننده',
  merchant: 'بازرگان',
  distributor: 'توزیع‌کننده',
  bank: 'بانک',
  government: 'سازمان یا نهاد دولتی',
  institute: 'مؤسسه',
}

export function roleLabel(role: string): string {
  return END_USER_ROLE_LABELS[role as EndUserRole] ?? role
}

export type UserVitrin = {
  role: EndUserRole | string
  companyName: string

  id?: string
  userVitrinId?: string
}

export function getVitrinId(vitrin: UserVitrin): string | null {
  return vitrin.userVitrinId ?? vitrin.id ?? null
}

export type VitrinDetail = {
  level: LevelSummary | null
  scores: number

  id?: string
  companyName?: string
  role?: EndUserRole | string
}
