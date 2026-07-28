import 'server-only'

import { dehydrate, QueryClient } from '@tanstack/react-query'
import { cookies } from 'next/headers'

import { customerClubKeys, type ClubSummary } from '@/features/customer-club'
import { levelKeys, type Level } from '@/features/level'
import {
  recentActivityKeys,
  type RecentActivitiesParams,
  type RecentActivityPage,
} from '@/features/recent-activity'
import { userKeys, type CurrentUser } from '@/features/user'
import { vitrinKeys, type UserVitrin } from '@/features/vitrin'
import { ACCESS_TOKEN_COOKIE } from '@/lib/api/token-cookie'
import { serverFetch } from '@/lib/api/server'
import { unwrap } from '@/lib/api/unwrap'
import { normalizeActivityList } from '@/features/recent-activity/services/normalize'

const DEFAULT_ACTIVITY_PARAMS: RecentActivitiesParams = { offset: 0, size: 10 }

const PREFETCH_TIMEOUT_MS = 4000

export async function prefetchDashboard() {
  const token = (await cookies()).get(ACCESS_TOKEN_COOKIE)?.value ?? null
  const queryClient = new QueryClient()

  const authHeaders = token ? { Authorization: `Bearer ${token}` } : undefined

  const prefetch = async <T>(queryKey: readonly unknown[], load: () => Promise<T>) => {
    try {
      await queryClient.prefetchQuery({ queryKey, queryFn: load })
    } catch {}
  }

  const jobs: Promise<unknown>[] = [
    prefetch(levelKeys.list(), async () =>
      unwrap<Level[]>(
        await serverFetch('/levels', {
          next: { revalidate: 1800 },
          signal: AbortSignal.timeout(PREFETCH_TIMEOUT_MS),
        }),
      ),
    ),
  ]

  if (authHeaders) {
    jobs.push(
      prefetch(userKeys.me(), async () =>
        unwrap<CurrentUser>(
          await serverFetch('/users/me', {
            headers: authHeaders,
            cache: 'no-store',
            signal: AbortSignal.timeout(PREFETCH_TIMEOUT_MS),
          }),
        ),
      ),
      prefetch(vitrinKeys.listForUser(), async () =>
        unwrap<UserVitrin[]>(
          await serverFetch('/users/vitrin/all-user', {
            headers: authHeaders,
            cache: 'no-store',
            signal: AbortSignal.timeout(PREFETCH_TIMEOUT_MS),
          }),
        ),
      ),
      prefetch(customerClubKeys.summary(), async () =>
        unwrap<ClubSummary>(
          await serverFetch('/customer-club/summary', {
            headers: authHeaders,
            cache: 'no-store',
            signal: AbortSignal.timeout(PREFETCH_TIMEOUT_MS),
          }),
        ),
      ),
      prefetch(
        recentActivityKeys.list(DEFAULT_ACTIVITY_PARAMS),
        async (): Promise<RecentActivityPage> =>
          normalizeActivityList(
            unwrap(
              await serverFetch('/recent-activities', {
                headers: authHeaders,
                searchParams: {
                  offset: DEFAULT_ACTIVITY_PARAMS.offset,
                  size: DEFAULT_ACTIVITY_PARAMS.size,
                },
                cache: 'no-store',
                signal: AbortSignal.timeout(PREFETCH_TIMEOUT_MS),
              }),
            ),
          ),
      ),
    )
  }

  await Promise.all(jobs)

  return dehydrate(queryClient)
}
