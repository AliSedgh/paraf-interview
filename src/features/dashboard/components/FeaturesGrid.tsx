import Image from 'next/image'

import { features, featuresTitleBrand, featuresTitleLead } from '../mocks'
import type { Feature } from '../types'

const HOVER_IMAGE = '/dashboard/feature-rewards.png'

function CardFace({ feature, back = false }: { feature: Feature; back?: boolean }) {
  return (
    <div
      className={`paraf-flip-face flex h-full w-full min-w-0 flex-col items-center gap-fa-2 ${
        back ? 'paraf-flip-back absolute inset-0' : ''
      }`}
    >
      <div className="flex size-[136px] shrink-0 items-center justify-center p-fa-2">
        <Image
          src={back ? HOVER_IMAGE : feature.imageSrc}
          alt=""
          aria-hidden
          width={120}
          height={120}
          className={back ? 'size-[120px] scale-[0.82] grayscale' : 'size-[120px]'}
        />
      </div>

      <div className="flex w-full min-w-0 flex-col items-center justify-center gap-fa-1_5">
        <h3
          className={`text-h-m font-bold whitespace-nowrap ${
            back ? 'text-danger' : 'text-neutral-900'
          }`}
        >
          {feature.title}
        </h3>
        <p
          className={`w-full text-center text-b-m text-neutral-700 ${
            back ? 'line-clamp-3' : 'line-clamp-1'
          }`}
        >
          {feature.description}
        </p>
      </div>
    </div>
  )
}

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
            className="group relative flex h-[270px] min-w-0 flex-col items-center overflow-hidden rounded-fa-xl bg-[linear-gradient(239.8deg,#ffffff_0%,#ecf0f2_100%)] px-fa-6 py-fa-8 shadow-l1 ring-[1.5px] ring-transparent transition-[background-image,box-shadow,--tw-ring-color] duration-200 ease-[var(--ease-out-soft)] outline-none perspective-[1200px] hover:bg-[radial-gradient(120%_90%_at_30%_15%,#ffffff_0%,#f1e9fe_45%,#e5dbfc_100%)] hover:shadow-brand-glow hover:ring-brand focus-visible:bg-[radial-gradient(120%_90%_at_30%_15%,#ffffff_0%,#f1e9fe_45%,#e5dbfc_100%)] focus-visible:ring-brand"
          >
            <div className="paraf-anim-spin-fade relative h-full w-full">
              <CardFace feature={feature} />
              <CardFace feature={feature} back />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
