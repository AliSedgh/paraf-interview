# Paraf

داشبورد باشگاه مشتریان پاراف — Next.js 16 (App Router)، TypeScript، Tailwind CSS v4.

## راه‌اندازی

```bash
pnpm install
cp .env.example .env.local   # مقادیر را تنظیم کنید
pnpm dev
```

اپلیکیشن روی <http://localhost:3000> بالا می‌آید.

## متغیرهای محیطی

| متغیر                        | توضیح                                                       |
| ---------------------------- | ----------------------------------------------------------- |
| `NEXT_PUBLIC_API_BASE_URL`   | آدرس پایه‌ی API برای درخواست‌های مرورگر                     |
| `NEXT_PUBLIC_IMAGE_BASE_URL` | ریشه‌ی آدرس فایل‌ها؛ مقدار `file.link` به آن چسبانده می‌شود |
| `API_INTERNAL_BASE_URL`      | آدرس داخلی API برای فراخوانی‌های سمت سرور (اختیاری)         |

## دستورها

| دستور                | کار                             |
| -------------------- | ------------------------------- |
| `pnpm dev`           | اجرای محیط توسعه                |
| `pnpm build`         | بیلد پروداکشن                   |
| `pnpm start`         | اجرای بیلد پروداکشن             |
| `pnpm lint`          | ESLint                          |
| `pnpm typecheck`     | بررسی نوع‌ها با `tsc`           |
| `pnpm test`          | تست‌های واحد و یکپارچه (Vitest) |
| `pnpm test:coverage` | گزارش پوشش تست                  |
| `pnpm test:e2e`      | تست‌های End-to-End (Playwright) |
| `pnpm format`        | Prettier                        |

## ساختار

```
src/
├─ app/                 مسیرها و composition
├─ features/            هر فیچر: components · hooks · services · types
│  ├─ auth              ورود و مدیریت توکن
│  ├─ dashboard         داشبورد باشگاه مشتریان
│  ├─ user              اطلاعات کاربر جاری
│  ├─ vitrin            ویترین‌های کاربر
│  ├─ level             سطح‌ها
│  ├─ customer-club     خلاصه‌ی باشگاه مشتریان
│  └─ recent-activity   فعالیت‌های اخیر
├─ shared/              کد مشترک بین فیچرها
├─ components/ui/       خروجی خام shadcn/ui
├─ lib/                 لایه‌ی HTTP، react-query، env، utils
├─ providers/           Providerهای سراسری
├─ styles/              توکن‌های دیزاین و انیمیشن‌ها
└─ tests/               setup، mockها و ابزار تست
```

قواعد وابستگی:

| از → به                            | مجاز                                        |
| ---------------------------------- | ------------------------------------------- |
| `app/` → `features/*`              | بله، فقط از طریق `features/<name>/index.ts` |
| `features/a` → `features/b`        | بله، فقط از طریق public API                 |
| `features/*` → `shared/*`, `lib/*` | بله                                         |
| `shared/*` → `features/*`          | خیر                                         |
| هر جایی → `components/ui/*`        | خیر، فقط از `shared/components/*`           |

## State

| نوع state                        | ابزار                     |
| -------------------------------- | ------------------------- |
| Server state (کش، refetch، sync) | `@tanstack/react-query`   |
| Client state (UI، session)       | `zustand`                 |
| Form state                       | `react-hook-form` + `zod` |

داده‌ای که منبعش سرور است در store کلاینت کپی نمی‌شود.

## ارتباط با API

- سمت کلاینت: `apiClient` (Axios) در `src/lib/api/client.ts`
- سمت سرور: `serverFetch` در `src/lib/api/server.ts`
- هر دو خطا را به `ApiError` تبدیل می‌کنند تا UI با یک نوع خطا کار کند.

صفحه‌ی داشبورد داده‌ها را سمت سرور پیش‌واکشی می‌کند و با `HydrationBoundary` به
کلاینت می‌دهد؛ تعامل‌ها (تغییر ویترین، فیلتر فعالیت‌ها) سمت کلاینت refetch می‌شوند.

## تست

تست‌ها کنار کد خودشان قرار می‌گیرند (`useLogin.ts` ↔ `useLogin.test.ts`).

- **Vitest** برای منطق، هوک‌ها، فرم‌ها و utilها
- **MSW** برای mock کردن لایه‌ی شبکه (`src/tests/mocks/`)
- **Playwright** برای End-to-End (`e2e/`)

## فونت

فونت پروژه **B Yekan+** است و با `next/font/local` از `src/assets/fonts/*.woff2`
لود می‌شود (وزن‌های ۴۰۰ و ۷۰۰). درخواست وزن ۶۰۰ طبق قواعد font matching در CSS
به ۷۰۰ نگاشت می‌شود.
