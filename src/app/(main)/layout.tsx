import type { ReactNode } from 'react'

import { NavigationBar } from '@/shared/components/NavigationBar'

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-[linear-gradient(148.43deg,#d1edfa_0%,#e5dbfc_100%)]">
      <NavigationBar />
      {children}
    </div>
  )
}
