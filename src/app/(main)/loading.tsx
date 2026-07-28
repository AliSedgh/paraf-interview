function Block({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`block animate-pulse rounded-fa-md bg-neutral-200 ${className}`}
    />
  )
}

function Card({
  className,
  children,
}: {
  className: string
  children?: React.ReactNode
}) {
  return (
    <div className={`overflow-hidden rounded-fa-xl bg-neutral-0 ${className}`}>
      {children}
    </div>
  )
}

export default function DashboardLoading() {
  return (
    <div
      className="relative w-full overflow-hidden"
      role="status"
      aria-busy
      aria-label="در حال بارگذاری داشبورد"
    >
      <span className="sr-only">در حال بارگذاری داشبورد…</span>

      <div className="flex h-[49.16px] w-full items-center justify-between gap-fa-2 bg-neutral-100 px-fa-4 py-fa-2 xl:px-fa-30">
        <div className="flex items-center gap-fa-3">
          <Block className="h-[25px] w-[64px]" />
          <Block className="h-[23px] w-[120px]" />
        </div>
        <div className="flex items-center gap-fa-3">
          <Block className="hidden h-[33px] w-[190px] sm:block" />
          <Block className="h-8 w-[192px] rounded-fa-full" />
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-fa-10 px-fa-4 pt-[15px] pb-fa-16 md:px-fa-8 xl:px-fa-30">
        <section className="flex min-h-[280px] items-center justify-center lg:h-[362px]">
          <Card className="flex w-full max-w-[921px] flex-col gap-fa-3 p-fa-6 lg:min-h-[202px] lg:rounded-fa-full lg:py-fa-6 lg:pr-fa-8 lg:pl-[24%] 2xl:py-fa-8 2xl:pl-[200px]">
            <Block className="h-[31px] w-[120px]" />
            <Block className="h-[46px] w-full max-w-[600px]" />
            <Block className="h-[25px] w-full max-w-[420px]" />
          </Card>
        </section>

        <section className="flex flex-col items-center gap-fa-2">
          <div className="flex h-[56px] w-full items-center justify-between px-fa-4 xl:px-fa-10">
            <div className="flex items-center gap-fa-2">
              <Block className="h-[25px] w-[140px]" />
              <Block className="h-10 w-[260px] rounded-fa-md" />
            </div>
            <Block className="hidden h-[25px] w-[220px] md:block" />
          </div>

          <Card className="w-full p-fa-6 xl:p-fa-8 2xl:p-fa-10">
            <div className="flex w-full flex-col items-stretch gap-fa-6 lg:h-[144px] lg:flex-row lg:items-center lg:gap-fa-6 xl:gap-fa-10">
              <div className="flex w-full items-center gap-fa-6 lg:min-w-0 lg:flex-1">
                <Block className="size-32 shrink-0 rounded-fa-xl" />
                <div className="flex min-w-0 flex-col gap-fa-1_5">
                  <Block className="h-[37px] w-[150px]" />
                  <Block className="h-[28px] w-[180px]" />
                  <Block className="h-[23px] w-[70px] rounded-fa-full" />
                  <Block className="h-[25px] w-[140px]" />
                </div>
              </div>

              <div className="flex w-full flex-col items-center gap-fa-3 lg:min-w-0 lg:flex-1">
                <Block className="h-[29px] w-full max-w-[335px] rounded-fa-full" />
                <Block className="h-[44px] w-[209px] rounded-fa-lg" />
              </div>

              <div className="flex w-full flex-col gap-fa-4 lg:min-w-0 lg:flex-1">
                <div className="flex flex-col gap-fa-4 sm:flex-row sm:gap-fa-6">
                  <Block className="h-[88px] w-full rounded-fa-xl sm:min-w-0 sm:flex-1" />
                  <Block className="h-[88px] w-full rounded-fa-xl sm:min-w-0 sm:flex-1" />
                </div>
                <Block className="h-10 w-full" />
              </div>
            </div>
          </Card>
        </section>

        <section className="flex flex-col items-center gap-fa-6 xl:flex-row xl:items-center xl:justify-center xl:gap-fa-10 xl:p-fa-10">
          <div className="flex w-full flex-col items-center gap-fa-6 xl:w-auto">
            <Block className="h-[239px] w-full rounded-fa-xl xl:w-[884px]" />
            <Block className="h-[49px] w-full max-w-[753px] rounded-fa-md" />
          </div>
          <Block className="h-[157px] w-full rounded-fa-full sm:w-[360px]" />
        </section>

        <Block className="h-[180px] w-full rounded-fa-xl xl:h-[284px]" />

        <section className="flex flex-col-reverse items-center gap-fa-6 lg:flex-row lg:items-stretch lg:justify-center">
          <Card className="flex w-full flex-col gap-fa-6 p-fa-6 lg:flex-[1006_1_0] lg:px-fa-8 xl:px-fa-12 xl:py-fa-10">
            <div className="flex flex-wrap items-center justify-between gap-fa-4">
              <Block className="h-[37px] w-[160px]" />
              <Block className="h-[43px] w-full max-w-[447px] rounded-fa-full" />
            </div>
            <div className="flex flex-col gap-fa-1">
              {Array.from({ length: 10 }, (_, index) => (
                <Block key={index} className="h-[52px] w-full rounded-fa-full" />
              ))}
            </div>
          </Card>

          <Card className="flex w-full flex-col gap-fa-6 p-fa-6 lg:flex-[650_1_0] lg:px-fa-8 xl:px-fa-12 xl:py-fa-10">
            <Block className="h-[37px] w-[180px]" />
            <Block className="h-[154px] w-full rounded-fa-lg" />
            <Block className="h-[25px] w-full max-w-[320px]" />
            <Block className="h-[270px] w-full" />
          </Card>
        </section>

        <section className="flex flex-col gap-fa-8 xl:px-fa-10">
          <Block className="h-[37px] w-[220px]" />
          <div className="grid grid-cols-1 gap-fa-6 sm:grid-cols-2 lg:grid-cols-3 xl:px-fa-20">
            {Array.from({ length: 6 }, (_, index) => (
              <Block key={index} className="h-[270px] w-full rounded-fa-xl" />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
