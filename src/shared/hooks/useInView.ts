'use client'

import { useCallback, useEffect, useState } from 'react'

/**
 * تشخیص ورود المان به دید کاربر — برای اجرای انیمیشن‌های ورودی.
 *
 * انیمیشن‌های ورودی (`paraf-anim-rise-in`, `paraf-anim-zoom-in`, …) اگر روی
 * mount اجرا شوند، برای بخش‌های پایین صفحه عملاً دیده نمی‌شوند چون تا کاربر
 * اسکرول کند تمام شده‌اند. این هوک فقط یک پرچم برمی‌گرداند و خودِ انیمیشن
 * کاملاً در CSS می‌ماند (رجوع کنید به `src/styles/animations.css`).
 *
 * ⚠️ عمداً **callback ref** برمی‌گرداند نه `useRef`: کامپوننت‌هایی مثل کارت سطح
 * اول شاخه‌ی اسکلت را رندر می‌کنند و بعد شاخه‌ی اصلی را. با `useRef` افکت فقط
 * یک‌بار و روی `null` اجرا می‌شد و observer هیچ‌وقت وصل نمی‌شد.
 *
 * بدون وابستگی به کتابخانه‌ی انیمیشن — فقط IntersectionObserver.
 */
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const [node, setNode] = useState<T | null>(null)
  const [inView, setInView] = useState(false)

  const ref = useCallback((element: T | null) => {
    setNode(element)
    // در محیط‌های بدون IntersectionObserver (تست‌های jsdom) انیمیشن بی‌درنگ اجرا شود.
    if (element && typeof IntersectionObserver === 'undefined') setInView(true)
  }, [])

  useEffect(() => {
    if (!node || inView || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [node, inView, threshold])

  return { ref, inView }
}
