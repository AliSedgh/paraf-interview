import { ChevronDown, Languages, Search } from 'lucide-react'
import Image from 'next/image'

import { cn } from '@/lib/utils'

import {
  navActions,
  navCtaLabel,
  navLocaleLabel,
  navSearchPlaceholder,
  navTabs,
} from './NavigationBar.mock'

const ICON_STROKE = 1.5

const focusRing =
  'outline-none focus-visible:ring-2 focus-visible:ring-brand-a50 focus-visible:ring-offset-1'

export function NavigationBar() {
  return (
    <div>
      <header className="flex h-[73px] w-full items-center bg-neutral-0 px-fa-4 ring-1 ring-neutral-200 ring-inset md:px-fa-8 xl:px-fa-30">
        <div className="flex h-[44.13px] w-full items-center justify-between">
          <div className="flex h-10 min-w-0 flex-1 items-center gap-fa-4 lg:gap-fa-6 2xl:gap-fa-20">
            <div className="flex items-center gap-fa-2">
              <Image
                src="/paraf-logo.svg"
                alt="پاراف"
                width={98}
                height={40}
                priority
                unoptimized
              />
              <p className="hidden text-h-s leading-5 font-bold whitespace-nowrap text-info-dark xl:block">
                <span className="font-normal">بازار کالا و خدمات؛</span>
                <br />
                ساده<span className="font-normal">،</span> امن
                <span className="font-normal">،</span> بی‌مرز
              </p>
            </div>

            <nav aria-label="دسته‌بندی‌های اصلی" className="hidden 2xl:block">
              <ul className="flex items-center gap-fa-2">
                {navTabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      type="button"
                      aria-haspopup={tab.hasMenu ? 'menu' : undefined}
                      className={cn(
                        'flex h-10 items-center gap-fa-1 rounded-fa-xs px-fa-3',
                        'text-h-m font-semibold whitespace-nowrap text-neutral-700',
                        'transition-colors hover:bg-neutral-100',
                        focusRing,
                      )}
                    >
                      {tab.label}
                      {tab.hasMenu ? (
                        <ChevronDown
                          className="size-4 text-neutral-500"
                          strokeWidth={ICON_STROKE}
                          aria-hidden
                        />
                      ) : null}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="hidden h-10 w-full max-w-[350px] min-w-0 items-center gap-fa-4 rounded-fa-full border border-neutral-400 bg-neutral-200 px-fa-4 py-fa-2 focus-within:border-neutral-700 md:flex xl:w-[350px] xl:shrink-0">
              <input
                type="search"
                aria-label={navSearchPlaceholder}
                placeholder={navSearchPlaceholder}
                className="min-w-0 flex-1 bg-transparent text-b-m text-neutral-900 outline-none placeholder:text-neutral-500"
              />
              <Search
                className="size-6 shrink-0 text-neutral-700"
                strokeWidth={ICON_STROKE}
                aria-hidden
              />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-fa-1 xl:gap-fa-3">
            <button
              type="button"
              className={cn(
                'hidden items-center gap-fa-0_5 rounded-fa-md py-fa-1 pr-fa-2 pl-fa-1_5 lg:flex',
                'transition-colors hover:bg-neutral-100',
                focusRing,
              )}
            >
              <span className="px-fa-1 text-h-s font-bold whitespace-nowrap text-neutral-500">
                {navLocaleLabel}
              </span>
              <span className="flex size-6 items-center justify-center text-neutral-400">
                <Languages className="size-4" strokeWidth={ICON_STROKE} aria-hidden />
              </span>
            </button>

            <button
              type="button"
              className={cn(
                'flex h-[44.13px] shrink-0 items-center rounded-fa-lg px-fa-1 xl:px-fa-4',
                'transition-colors hover:bg-neutral-100',
                focusRing,
              )}
            >
              <span className="px-fa-1 text-h-s font-bold whitespace-nowrap text-neutral-900 xl:px-fa-2 xl:text-h-m">
                {navCtaLabel}
              </span>
            </button>

            <span
              aria-hidden
              className="hidden w-0.5 self-stretch bg-neutral-200 sm:block"
            />

            <div className="flex shrink-0 items-center gap-fa-0_5">
              {navActions.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  aria-label={action.label}
                  title={action.label}
                  className={cn(
                    'flex items-center justify-center rounded-fa-full p-fa-2 text-neutral-900',
                    'transition-colors hover:bg-neutral-100',
                    focusRing,
                  )}
                >
                  <span className="flex size-6 items-center justify-center">
                    <action.icon
                      className="size-5"
                      strokeWidth={ICON_STROKE}
                      aria-hidden
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
