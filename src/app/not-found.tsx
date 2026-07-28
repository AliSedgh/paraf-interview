import Link from 'next/link'

import { Button } from '@/shared/components/Button'

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-3 p-6 text-center">
      <h2 className="text-lg font-semibold">صفحه پیدا نشد</h2>
      <p className="text-sm text-muted-foreground">آدرسی که وارد کرده‌اید وجود ندارد.</p>
      <Button asChild variant="outline" size="sm">
        <Link href="/">بازگشت به خانه</Link>
      </Button>
    </div>
  )
}
