import {
  BadgeCheck,
  CheckSquare2,
  CheckSquare2Icon,
  CheckSquareIcon,
  ChevronLeft,
  CircleAlert,
  Coins,
  Info,
  LucideCheckSquare,
  LucideCheckSquare2,
  SquareCheck,
  Zap,
} from 'lucide-react'
import Image from 'next/image'

import { formatNumber } from '@/shared/utils/formatNumber'

import { missionAlert, missionCtaLabel } from '../mocks'
import type {
  CoinBalanceView,
  CoinDiscountSummaryView,
  CurrentLevelView,
  ProfileView,
} from '../types'
import {
  Badge,
  ICON_STROKE,
  IconButton,
  Skeleton,
  SolidButton,
  ValueOrSkeleton,
} from './primitives'

function Divider() {
  return (
    <span
      aria-hidden
      className="hidden h-[144px] w-[1.5px] shrink-0 bg-neutral-200 min-[1560px]:block"
    />
  )
}

export type ProfileSummaryCardProps = {
  profile: ProfileView
  coinBalance: CoinBalanceView
  currentLevel: CurrentLevelView
  coinDiscountSummary: CoinDiscountSummaryView
  levelIconSrc: string
}

export function ProfileSummaryCard({
  profile,
  coinBalance,
  currentLevel,
  coinDiscountSummary,
  levelIconSrc,
}: ProfileSummaryCardProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-fa-4 rounded-fa-xl bg-neutral-0 p-fa-6 ring-[1.5px] ring-neutral-0 ring-inset xl:p-fa-8 2xl:p-fa-10">
      <div className="flex w-full flex-col items-stretch gap-fa-6 lg:flex-row lg:flex-wrap lg:items-center min-[1560px]:h-[144px] min-[1560px]:flex-nowrap min-[1560px]:gap-fa-10">
        <div className="flex w-full items-center justify-start gap-fa-6 lg:h-[135px] lg:min-w-[320px] lg:flex-1">
          <div className="size-32 shrink-0 overflow-hidden rounded-fa-xl border-8 border-neutral-0 bg-neutral-200 shadow-l1">
            <Image
              src={profile.avatarSrc}
              alt={profile.name ?? ''}
              width={112}
              height={112}
              className="size-full object-cover"
            />
          </div>

          <div className="flex min-w-0 flex-col items-start gap-fa-1_5 lg:min-w-0 lg:flex-1">
            <div className="flex items-center gap-fa-2">
              {profile.isPending || !profile.name ? (
                <Skeleton className="h-[37px] w-[150px]" />
              ) : (
                <h2 className="text-h-xl font-semibold whitespace-nowrap text-neutral-900">
                  {profile.name}
                </h2>
              )}
              {!profile.isPending && profile.isVerified ? (
                <BadgeCheck
                  className="size-6 shrink-0 text-info-accent"
                  strokeWidth={2}
                  aria-label="تأییدشده"
                />
              ) : null}
            </div>

            {profile.isPending ? (
              <Skeleton className="h-[28px] w-[180px]" />
            ) : (
              <div className="flex items-center gap-fa-1 whitespace-nowrap">
                {profile.job ? (
                  <>
                    <span className="text-b-l text-neutral-700">{profile.job}</span>
                    <span className="text-b-m text-neutral-500">/</span>
                  </>
                ) : null}
                <span className="text-b-m text-neutral-500">{profile.city}</span>
              </div>
            )}

            <Badge>{profile.badge}</Badge>

            <div className="flex items-center gap-fa-2 rounded-fa-xs px-fa-1 py-[2px]">
              <div className="flex items-center gap-fa-0_5">
                <SquareCheck
                  className="size-5 shrink-0 text-neutral-400"
                  strokeWidth={ICON_STROKE}
                  aria-hidden
                />
                <span className="text-b-s whitespace-nowrap text-neutral-700">
                  ماموریت انجام‌شده
                </span>
              </div>
              <ValueOrSkeleton
                isPending={profile.isPending}
                skeletonClassName="h-[25px] w-[24px]"
              >
                <span className="text-h-s font-bold text-neutral-900">
                  {formatNumber(profile.completedMissions)}
                </span>
              </ValueOrSkeleton>
            </div>
          </div>
        </div>

        <Divider />

        <div className="flex w-full flex-col items-center justify-center gap-fa-3 lg:min-w-[300px] lg:flex-1">
          <span className="flex items-center gap-fa-1 rounded-fa-full bg-danger-tint px-fa-2 py-[2px]">
            <CircleAlert
              className="size-4 shrink-0 text-danger/50"
              strokeWidth={ICON_STROKE}
              aria-hidden
            />
            <span className="text-b-m whitespace-nowrap text-danger">{missionAlert}</span>
          </span>

          <SolidButton
            icon={
              <SquareCheck className="size-5 text-white" strokeWidth={2} aria-hidden />
            }
          >
            {missionCtaLabel}
          </SolidButton>
        </div>

        <Divider />

        <div className="flex w-full flex-col justify-center gap-fa-4 min-[1560px]:min-w-0 min-[1560px]:flex-1">
          <div className="flex flex-col items-stretch gap-fa-4 sm:flex-row sm:items-center sm:gap-fa-6 xl:h-[88px]">
            <div className="flex h-[88px] w-full items-center justify-end gap-fa-2 rounded-fa-xl bg-white/20 px-fa-3 py-fa-3 shadow-l1 sm:min-w-0 sm:flex-1 2xl:px-fa-2">
              <Image
                src={levelIconSrc}
                alt=""
                aria-hidden
                width={64}
                height={64}
                className="hidden size-14 shrink-0 object-contain sm:block 2xl:size-16"
              />
              <div className="flex min-w-0 flex-1 items-end justify-between gap-fa-2 xl:h-[60px]">
                <div className="flex flex-col items-start justify-center">
                  <ValueOrSkeleton
                    isPending={currentLevel.isPending}
                    skeletonClassName="h-[30px] w-[80px]"
                  >
                    <span className="text-h-m font-bold whitespace-nowrap text-neutral-900">
                      {currentLevel.title ?? '—'}
                    </span>
                  </ValueOrSkeleton>
                  <span className="flex items-center gap-fa-1">
                    <ValueOrSkeleton
                      isPending={currentLevel.isPending}
                      skeletonClassName="h-[30px] w-[36px]"
                    >
                      <span className="text-h-m font-semibold text-neutral-900">
                        {formatNumber(currentLevel.scores)}
                      </span>
                    </ValueOrSkeleton>
                    <span className="text-b-xs text-neutral-500">امتیاز</span>
                    <Zap
                      className="size-5 shrink-0 text-neutral-400"
                      strokeWidth={ICON_STROKE}
                      aria-hidden
                    />
                  </span>
                </div>
                <IconButton label={`درباره‌ی ${currentLevel.title}`}>
                  <Info
                    className="size-[18px] text-neutral-700"
                    strokeWidth={ICON_STROKE}
                    aria-hidden
                  />
                </IconButton>
              </div>
            </div>

            <div className="flex h-[88px] w-full items-center gap-fa-2 rounded-fa-xl bg-warning-a8 px-fa-3 py-fa-3 shadow-l1 sm:min-w-0 sm:flex-1 2xl:px-fa-2">
              <div className="flex min-w-0 flex-1 items-end justify-between gap-fa-2 xl:h-[60px]">
                <IconButton label="درباره‌ی موجودی سکه">
                  <Info
                    className="size-[18px] text-neutral-700"
                    strokeWidth={ICON_STROKE}
                    aria-hidden
                  />
                </IconButton>
                <div className="flex flex-col justify-center">
                  <span className="flex items-center gap-fa-1">
                    <ValueOrSkeleton
                      isPending={coinBalance.isPending}
                      skeletonClassName="h-[30px] w-[44px]"
                    >
                      <span className="text-h-m font-bold text-neutral-900">
                        {formatNumber(coinBalance.coins)}
                      </span>
                    </ValueOrSkeleton>
                    <span className="text-b-l text-neutral-700">سکه</span>
                    <Coins
                      className="size-5 shrink-0 text-neutral-400"
                      strokeWidth={ICON_STROKE}
                      aria-hidden
                    />
                  </span>
                  <span className="flex items-center gap-fa-1">
                    <span className="text-h-m font-semibold text-neutral-500">
                      {formatNumber(coinBalance.toman)}
                    </span>
                    <span className="text-b-xs text-neutral-500">تومان</span>
                  </span>
                </div>
              </div>
              <Image
                src="/dashboard/coin-stack.png"
                alt=""
                aria-hidden
                width={64}
                height={64}
                className="hidden size-14 shrink-0 sm:block 2xl:size-16"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-x-fa-3 gap-y-fa-2 border-t border-neutral-200 bg-white/20 px-fa-2 py-fa-2 2xl:h-10 2xl:flex-nowrap 2xl:py-fa-1">
            <Badge className="gap-fa-1">
              <span className="text-b-xs font-bold text-neutral-900">
                {formatNumber(coinDiscountSummary.periodDays)}
              </span>
              <span className="text-b-xs text-neutral-900">روز اخیر</span>
              <ChevronLeft
                className="size-4 shrink-0 text-neutral-700"
                strokeWidth={ICON_STROKE}
                aria-hidden
              />
            </Badge>

            <div className="flex items-center gap-fa-0_5">
              <Image
                src="/dashboard/coin-discount-tag.png"
                alt=""
                aria-hidden
                width={32}
                height={32}
                className="size-8 shrink-0"
              />
              <span className="hidden text-b-2xs font-semibold whitespace-nowrap text-neutral-700 sm:inline">
                سکه دریافتی از طرح تخفیف سکه‌ای:
              </span>
              <span className="flex items-center gap-fa-0_5">
                <ValueOrSkeleton
                  isPending={coinDiscountSummary.isPending}
                  skeletonClassName="h-[25px] w-[30px]"
                >
                  <span className="text-h-s font-bold text-neutral-700">
                    {formatNumber(coinDiscountSummary.coinsFromDiscountPlan)}
                  </span>
                </ValueOrSkeleton>
                <span className="text-b-2xs font-semibold text-neutral-700">سکه</span>
              </span>
            </div>

            <div className="flex items-center gap-fa-0_5">
              <Image
                src={levelIconSrc}
                alt=""
                aria-hidden
                width={32}
                height={32}
                className="size-8 shrink-0 object-contain"
              />
              <span className="text-b-2xs font-semibold whitespace-nowrap text-neutral-700">
                معادل:
              </span>
              <span className="flex items-center gap-fa-0_5">
                <ValueOrSkeleton
                  isPending={coinDiscountSummary.isPending}
                  skeletonClassName="h-[25px] w-[28px]"
                >
                  <span className="text-h-s font-bold text-neutral-900">
                    {formatNumber(coinDiscountSummary.equivalentScores)}
                  </span>
                </ValueOrSkeleton>
                <span className="text-b-2xs font-semibold text-neutral-900">امتیاز</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
