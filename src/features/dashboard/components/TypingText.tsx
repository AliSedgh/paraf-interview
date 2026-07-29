'use client'

import { useEffect, useRef, useState } from 'react'

export type TypingTextPart = { text: string; bold: boolean }

export type TypingTextProps = {
  parts: TypingTextPart[]
  start?: boolean
  speed?: number
  delay?: number
  className?: string
}

export function TypingText({
  parts,
  start = true,
  speed = 38,
  delay = 350,
  className,
}: TypingTextProps) {
  const full = parts.reduce((total, part) => total + part.text.length, 0)
  const [typed, setTyped] = useState(0)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!start) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(full)
      return
    }

    let count = 0
    const tick = () => {
      count += 1
      setTyped(count)
      if (count < full) timer.current = setTimeout(tick, speed)
    }
    timer.current = setTimeout(tick, delay)

    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [start, full, speed, delay])

  const plainText = parts.map((part) => part.text).join('')

  let consumed = 0
  const visible = parts.map((part, index) => {
    const from = consumed
    consumed += part.text.length
    const chars = Math.max(0, Math.min(part.text.length, typed - from))

    return (
      <span key={index} className={part.bold ? 'font-bold' : 'font-semibold'}>
        {part.text.slice(0, chars)}
      </span>
    )
  })

  return (
    <span className={className} role="text" aria-label={plainText}>
      <span className="grid">
        <span aria-hidden className="invisible col-start-1 row-start-1">
          {parts.map((part, index) => (
            <span key={index} className={part.bold ? 'font-bold' : 'font-semibold'}>
              {part.text}
            </span>
          ))}
        </span>
        <span aria-hidden className="col-start-1 row-start-1">
          {visible}
        </span>
      </span>
    </span>
  )
}
