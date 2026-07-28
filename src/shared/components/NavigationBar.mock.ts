import { BellRing, LayoutGrid, ShoppingCart, type LucideIcon } from 'lucide-react'

export type NavTab = {
  id: string
  label: string
  hasMenu?: boolean
}

export type NavAction = {
  id: string
  label: string
  icon: LucideIcon
}

export const navTabs: NavTab[] = [
  { id: 'goods', label: 'کالا', hasMenu: true },
  { id: 'services', label: 'خدمات', hasMenu: true },
  { id: 'sellers', label: 'فروشندگان' },
  { id: 'agencies', label: 'نمایندگی‌ها' },
]

export const navActions: NavAction[] = [
  { id: 'notifications', label: 'اعلان‌ها', icon: BellRing },
  { id: 'cart', label: 'سبد خرید', icon: ShoppingCart },
  { id: 'dashboard', label: 'داشبورد', icon: LayoutGrid },
]

export const navSearchPlaceholder = 'جستجو در آگهی‌ها...'
export const navCtaLabel = 'ثبت آگهی جدید'
export const navLocaleLabel = 'فارسی / IRT'
