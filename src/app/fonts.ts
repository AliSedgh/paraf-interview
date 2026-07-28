import localFont from 'next/font/local'

export const yekan = localFont({
  src: [
    {
      path: '../assets/fonts/yekan-plus-400.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/yekan-plus-700.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-yekan',
  display: 'swap',
  fallback: ['Tahoma', 'system-ui', 'sans-serif'],
  adjustFontFallback: false,
})
