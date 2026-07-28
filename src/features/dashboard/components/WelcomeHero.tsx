'use client'

import Image from 'next/image'

import { useInView } from '@/shared/hooks/useInView'

import {
  heroHeadlineLead,
  heroHeadlineTail,
  heroSubtitle,
  heroSubtitleParts,
  heroWordmarkAlt,
} from '../mocks'
import { Skeleton } from './primitives'

export type WelcomeHeroProps = {
  name: string | null
  isPending: boolean
}

/**
 * هدر خوش‌آمدگویی — نود `2:12975`.
 *
 * کارت همیشه **وسط‌چین** است (`mx-auto max-w-[921px]`) و همه‌ی تزئین‌ها نسبت به
 * خودِ کارت جای‌گذاری شده‌اند، نه نسبت به سکشن. به همین دلیل در هیچ عرضی
 * (لپ‌تاپ، تبلت، موبایل) چیدمان به‌هم نمی‌ریزد و لازم نیست برای هر بریک‌پوینت
 * مختصات مطلق تازه بنویسیم.
 *
 * انیمیشن‌ها:
 * - جام و کیسه‌ی سکه: `Wiggle` بی‌نهایت
 * - لوگوی «پاراف‌کلاب»: پالس دائمی روی `scale`
 * - سه کانفتی: چرخه‌ی ۹ ثانیه‌ای — اول وسطی از پایین کارت بیرون می‌زند، بعد دو
 *   کناری از دو طرف. در حالت پنهان `opacity: 0` می‌شوند تا هیچ گوشه‌ای بیرون
 *   نماند.
 */
export function WelcomeHero({ name, isPending }: WelcomeHeroProps) {
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section
      ref={ref}
      data-inview={inView}
      className="relative flex flex-col items-center gap-fa-4 overflow-hidden py-fa-4 lg:min-h-[362px] lg:justify-center lg:py-0"
    >
      {/* موبایل/تبلت — تزئین‌ها بالای کارت، در جریان عادی */}
      <div className="relative flex h-[150px] w-full shrink-0 items-end justify-center lg:hidden">
        <Image
          src="/dashboard/hero-trophy.png"
          alt=""
          aria-hidden
          width={358}
          height={358}
          priority
          className="paraf-anim-wiggle pointer-events-none relative z-10 h-[140px] w-auto select-none"
        />
        <Image
          src="/dashboard/hero-moneybag.png"
          alt=""
          aria-hidden
          width={203}
          height={203}
          className="paraf-anim-wiggle pointer-events-none relative z-10 -ml-fa-6 h-[76px] w-auto select-none [animation-delay:-0.55s]"
        />
      </div>

      {/* قاب کارت — مرجع همه‌ی تزئین‌های دسکتاپ */}
      <div className="relative mx-auto w-full max-w-[921px]">
        {/*
          کانفتی وسط: پشت کارت (`z-0`)، هم‌مرکز با کارت. در حالت پنهان با
          scale 0.55 داخل ارتفاع کارت جا می‌شود و opacity صفر است.
        */}
        <Image
          src="/dashboard/hero-confetti.png"
          alt=""
          aria-hidden
          width={342}
          height={336}
          className="paraf-anim-confetti-center pointer-events-none absolute top-1/2 left-1/2 z-0 hidden h-[336px] w-[342px] -translate-y-1/2 select-none lg:block"
        />
        {/*
          کانفتی چپ — قرینه‌ی راستی: `z-0` پشت جام (`z-20`) می‌ماند و آفست `mr`
          طوری تنظیم شده که روی لبه‌ی چپِ جام سوار شود، پس فقط بخش کوچکی از
          پشت جام بیرون می‌زند. (قبلاً با `z-30` و آفست بزرگ کاملاً جدا از جام
          در فضای خالی ظاهر می‌شد.)
        */}
        <Image
          src="/dashboard/hero-confetti.png"
          alt=""
          aria-hidden
          width={342}
          height={336}
          className="paraf-anim-confetti-left pointer-events-none absolute top-1/2 right-full z-0 mr-[26px] hidden h-[170px] w-[174px] -translate-y-1/2 select-none lg:block xl:mr-[46px] xl:h-[190px] xl:w-[194px] 2xl:mr-[76px]"
        />
        {/*
          کانفتی راست — با `-ml` روی لبه‌ی کارت سوار می‌شود تا فقط بخشی از آن
          بیرون بزند، نه کل تصویر.
        */}
        <Image
          src="/dashboard/hero-confetti.png"
          alt=""
          aria-hidden
          width={342}
          height={336}
          className="paraf-anim-confetti-right pointer-events-none absolute top-1/2 left-full z-0 -ml-[86px] hidden h-[170px] w-[174px] -translate-y-1/2 select-none lg:block xl:-ml-[96px] xl:h-[190px] xl:w-[194px]"
        />

        <div className="relative z-10 flex min-h-[202px] w-full flex-col items-start justify-center rounded-fa-xl bg-neutral-0 px-fa-6 py-fa-6 ring-1 ring-white/20 backdrop-blur-[12px] ring-inset lg:rounded-fa-full lg:py-fa-8 lg:pr-fa-10 lg:pl-[34%] xl:pl-[38%] 2xl:pr-fa-20 2xl:pl-[200px]">
          <div className="flex w-full min-w-0 flex-col items-start lg:-space-y-1">
            {isPending || !name ? (
              <Skeleton className="h-[31px] w-[140px]" />
            ) : (
              <p className="paraf-anim-rise-in text-b-l font-semibold text-neutral-900 sm:text-b-2xl">
                {name} عزیز
              </p>
            )}

            <h1 className="flex w-full min-w-0 flex-wrap items-center text-[22px] leading-[40px] font-black text-brand sm:text-[26px] sm:leading-[48px] lg:flex-nowrap lg:text-[24px] lg:leading-[52px] xl:text-[30px] xl:leading-[62px] 2xl:text-[40px] 2xl:leading-[78px]">
              <span className="paraf-anim-rise-in whitespace-nowrap">{heroHeadlineLead}</span>
              <span className="flex min-w-0 items-center justify-center px-fa-2">
                <Image
                  src="/dashboard/hero-parafclub-wordmark.svg"
                  alt={heroWordmarkAlt}
                  width={388}
                  height={47}
                  /* پالس همیشگی — مستقل از in-view، فقط scale کم و زیاد می‌شود. */
                  className="paraf-anim-pulse-scale h-auto w-full max-w-[210px] sm:max-w-[249px] xl:max-w-[300px] 2xl:max-w-[388px]"
                />
              </span>
              <span className="paraf-anim-rise-in whitespace-nowrap [animation-delay:0.12s]">
                {heroHeadlineTail}
              </span>
            </h1>

            <p
              className="paraf-anim-rise-in w-full text-b-s text-neutral-700 [animation-delay:0.45s] xl:text-b-m 2xl:text-b-xl"
              aria-label={heroSubtitle}
            >
              {heroSubtitleParts.map((part, index) => (
                <span key={index} className={part.bold ? 'font-bold' : 'font-semibold'}>
                  {part.text}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/*
          جام و کیسه‌ی سکه روی کارت — آفست‌ها نسبت به خودِ کارت‌اند (در طرح جام
          ۱۸۱.۵px چپ‌ترِ لبه‌ی کارت و کیسه ۱۴.۸px داخل آن است)، پس با جابه‌جا شدن
          کارت هم‌راهش می‌مانند.
        */}
        <Image
          src="/dashboard/hero-trophy.png"
          alt=""
          aria-hidden
          width={358}
          height={358}
          priority
          className="paraf-anim-wiggle pointer-events-none absolute top-1/2 -left-[110px] z-20 hidden h-[240px] w-[240px] -translate-y-1/2 select-none lg:block xl:-left-[150px] xl:h-[300px] xl:w-[300px] 2xl:-left-[181.5px] 2xl:h-[358px] 2xl:w-[358px]"
        />
        <Image
          src="/dashboard/hero-moneybag.png"
          alt=""
          aria-hidden
          width={203}
          height={203}
          className="paraf-anim-wiggle pointer-events-none absolute bottom-0 left-[4px] z-20 hidden h-[130px] w-[130px] translate-y-[22%] select-none [animation-delay:-0.55s] lg:block xl:h-[170px] xl:w-[170px] 2xl:left-[14.77px] 2xl:h-[203.46px] 2xl:w-[203.46px]"
        />
      </div>
    </section>
  )
}
