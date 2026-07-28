import { HydrationBoundary } from '@tanstack/react-query'

import { ClubDashboard } from '@/features/dashboard'
import { prefetchDashboard } from '@/features/dashboard/services/dashboard.server'

export default async function HomePage() {
  const dehydratedState = await prefetchDashboard()

  return (
    <HydrationBoundary state={dehydratedState}>
      <ClubDashboard />
    </HydrationBoundary>
  )
}
