import Image from 'next/image'

import { features, featuresTitleBrand, featuresTitleLead } from '../mocks'

/**
 * تصویری که در حالت هاور جای تصویر هر کارت را می‌گیرد — همان تصویر کارت
 * «جوایز ویژه»، کوچک‌تر و grayscale (دقیقاً مثل واریانت `State=Hover` طرح).
 */
const HOVER_IMAGE = '/dashboard/feature-rewards.png'

/**
 * شبکه‌ی ویژگی‌های پاراف‌کلاب — نود `2:13275`.
 *
 * هر کارت ۴۶۴×۲۷۰، radius 24، گرادیان مورب `#ffffff → #ecf0f2` و `shadow-l1`.
 *
 * **حالت هاور** — تریگر و تایمینگ از `interactions` طرح استخراج شد:
 * `ON_HOVER` → واریانت `State=Hover` با `SMART_ANIMATE`، ایزینگ `EASE_OUT`،
 * مدت **۰.۴ ثانیه**. خودِ حالت هاور:
 * - محتوای داخل کارت خیلی نرم rotate می‌کند
 * - بوردر نرم عوض می‌شود (به `brand`)
 * - تصویر کارت با تصویر «جوایز ویژه» جایگزین می‌شود، کمی کوچک‌تر و grayscale
 *
 * دو تصویر روی هم چیده شده‌اند و با opacity جابه‌جا می‌شوند، تا تعویض هم نرم
 * باشد و هم بدون JS.
 */
export function FeaturesGrid() {
  return (
    <section className="flex flex-col items-start gap-fa-8 xl:px-fa-10">
      <h2 className="flex items-center gap-fa-1 text-h-l font-bold xl:text-h-xl">
        <span className="text-neutral-900">{featuresTitleLead}</span>
        <span className="text-brand">{featuresTitleBrand}</span>
      </h2>

      <div className="grid w-full grid-cols-1 items-center gap-fa-6 sm:grid-cols-2 lg:auto-rows-[270px] lg:grid-cols-3 xl:px-fa-20">
        {features.map((feature) => (
          <article
            key={feature.id}
            tabIndex={0}
            className="group relative flex h-[270px] min-w-0 flex-col items-center gap-fa-2 overflow-hidden rounded-fa-xl perspective-[1200px] bg-[linear-gradient(239.8deg,#ffffff_0%,#ecf0f2_100%)] px-fa-6 py-fa-8 shadow-l1 ring-[1.5px] ring-transparent transition-[background-image,box-shadow,--tw-ring-color] duration-200 ease-[var(--ease-out-soft)] outline-none hover:bg-[radial-gradient(120%_90%_at_30%_15%,#ffffff_0%,#f1e9fe_45%,#e5dbfc_100%)] hover:shadow-brand-glow hover:ring-brand focus-visible:bg-[radial-gradient(120%_90%_at_30%_15%,#ffffff_0%,#f1e9fe_45%,#e5dbfc_100%)] focus-visible:ring-brand"
          >
            {/*
              کل محتوا داخل یک لایه که خیلی نرم rotate می‌کند — همان حسی که
              واریانت هاور طرح دارد.
            */}
            {/*
              چرخش ۱۸۰ درجه حول محور Y همراه با fade در میانه‌ی مسیر —
              کند و نرم (۱.۶ ثانیه ease-in-out). با transition نمی‌شود چون مبدأ و
              مقصد یکی است، پس keyframe در `animations.css` تعریف شده.
            */}
            <div className="paraf-anim-spin-fade flex h-full w-full min-w-0 flex-col items-center gap-fa-2">
              <div className="relative flex size-[136px] shrink-0 items-center justify-center p-fa-2">
                <Image
                  src={feature.imageSrc}
                  alt=""
                  aria-hidden
                  width={120}
                  height={120}
                  className="size-[120px] transition-opacity duration-200 ease-[var(--ease-out-soft)] group-hover:opacity-0 group-focus-visible:opacity-0"
                />
                <Image
                  src={HOVER_IMAGE}
                  alt=""
                  aria-hidden
                  width={120}
                  height={120}
                  className="absolute size-[120px] scale-[0.82] opacity-0 grayscale transition-opacity duration-200 ease-[var(--ease-out-soft)] group-hover:opacity-100 group-focus-visible:opacity-100"
                />
              </div>

              <div className="flex w-full min-w-0 flex-col items-center justify-center gap-fa-1_5">
                <h3 className="text-h-m font-bold whitespace-nowrap text-neutral-900 transition-colors duration-200 ease-[var(--ease-out-soft)] group-hover:text-danger group-focus-visible:text-danger">
                  {feature.title}
                </h3>
                <p className="line-clamp-1 w-full text-center text-b-m text-neutral-700 group-hover:line-clamp-3 group-focus-visible:line-clamp-3">
                  {feature.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
