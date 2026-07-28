'use client'

import { useCallback, useEffect, useState } from 'react'


export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const [node, setNode] = useState<T | null>(null)
  const [inView, setInView] = useState(false)

  const ref = useCallback((element: T | null) => {
    setNode(element)
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
