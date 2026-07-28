import type { ChartPoint, ClubTab, Feature, Profile, PromoBannerData } from '../types'

export const heroHeadlineLead = 'به'
export const heroHeadlineTail = 'خوش اومدی!'
export const heroWordmarkAlt = 'پاراف‌کلاب (باشگاه مشتریان پاراف)'
export const heroSubtitleParts: { text: string; bold: boolean }[] = [
  { text: 'مأموریت‌هات', bold: true },
  { text: ' رو انجام بده؛ هم ', bold: false },
  { text: 'سطح ', bold: true },
  { text: 'اعتبارت رو افزایش میدی، هم ', bold: false },
  { text: 'سکه', bold: true },
  { text: ' میگیری.', bold: false },
]

export const heroSubtitle = heroSubtitleParts.map((part) => part.text).join('')

export const breadCrumbs = {
  trail: [
    { id: 'home', label: 'صفحه اصلی', current: true },
    { id: 'paraf-club', label: 'پاراف‌کلاب', current: false },
  ],
  backLabel: 'برگشت',
  walletLabel: 'کیف‌پول:',
  walletAmount: 173_579_050,
  walletCurrency: 'تومان',
  helpLabel: 'راهنما',
  score: 124,
  levelCupSrc: '/dashboard/level-bronze.png',
}

export const clubSwitcherLabel = 'انتخاب باشگاه مشتریان:'
export const clubSwitcherLinks: ClubTab[] = [
  { id: 'terms', label: 'قوانین و مقررات' },
  { id: 'faq', label: 'سوالات متداول شما' },
]

export const profile: Profile = {
  name: 'آرین رستگار',
  isVerified: true,
  job: 'تعمیرکار موبایل',
  city: 'مشهد، ایران',
  badge: 'مغازه‌دار',
  completedMissions: 17,
  avatarSrc: '/dashboard/avatar-arian.png',
}

export const missionAlert = 'وقت کمی مونده، ماموریتت رو همین الان انجام بده.'
export const missionCtaLabel = 'مشاهده ماموریت'

export const missionsCtaLabel = 'ماموریت‌ها'

export const promoBanner: PromoBannerData = {
  imageSrc: '/dashboard/promo-banner.png',
  alt: 'جشن ۱۹ سالگی ایکس‌ویژن؛ تخفیف تا ۲۳٪ و آیفون ۱۷ هدیه برنده خوش‌شانس',
}

export const chartTitle = 'نمودار فعالیت‌ها'
export const chartHint = 'اخیراً کم‌فعالیت بودی.\nبرای حفظ سطح برنزی، بیشتر مشارکت کن! 👀'
export const chartHintActions = ['شرکت در نظرسنجی', 'دعوت دوستان']
export const chartCaption = 'نمودار تغییرات امتیاز بر اساس فعالیت ۶ ماهه شما'
export const chartSummary = {
  before: 'فعالیت شما نسبت به ماه گذشته ',
  highlight: '۳۵٪ کاهش',
  after: ' یافته‌.',
}
export const chartData: ChartPoint[] = [
  { month: 'اردیبهشت', value: 25 },
  { month: 'خرداد', value: 30 },
  { month: 'تیر', value: 80 },
  { month: 'مرداد', value: 50 },
  { month: 'شهریور', value: 55 },
  { month: 'مهر', value: 20 },
]

export const activitiesTitle = 'فعالیت‌های اخیر'
export const activitiesSubtitle = 'مروری بر آخرین فعالیت‌ها و دستاوردهات'
export const activitiesFullListLabel = 'لیست کامل'

export const featuresTitleLead = 'ویژگی‌های'
export const featuresTitleBrand = 'پاراف‌کلاب'

const featureBody =
  'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان.'

export const features: Feature[] = [
  {
    id: 'rewards',
    title: 'جوایز ویژه',
    description: featureBody,
    imageSrc: '/dashboard/feature-rewards.png',
  },
  {
    id: 'support',
    title: 'پشتیبانی حرفه‌ای',
    description: featureBody,
    imageSrc: '/dashboard/feature-support.png',
  },
  {
    id: 'free-shipping',
    title: 'ارسال رایگان',
    description: featureBody,
    imageSrc: '/dashboard/feature-free-shipping.png',
  },
  {
    id: 'sales-report',
    title: 'گزارش فروش',
    description: featureBody,
    imageSrc: '/dashboard/feature-sales-report.png',
  },
  {
    id: 'events',
    title: 'رویدادهای ویژه',
    description: featureBody,
    imageSrc: '/dashboard/feature-events.png',
  },
  {
    id: 'network',
    title: 'شبکه همکاران',
    description: featureBody,
    imageSrc: '/dashboard/feature-network.png',
  },
]
