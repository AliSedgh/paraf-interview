import Image from 'next/image'

import { cn } from '@/lib/utils'

import { promoBanner } from '../mocks'

export function PromoBanner({ className }: { className?: string }) {
  return (
    <div
     
      className={cn('relative mx-[calc(50%-50vw)]', className)}
    >
      <Image
        src={promoBanner.imageSrc}
        alt={promoBanner.alt}
        width={1926}
        height={284}
        className="h-auto w-full object-cover xl:h-[284px]"
      />
    </div>
  )
}
