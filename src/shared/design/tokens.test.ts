import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

import { colors, radius, shadows, spacing, tokens, typography } from './tokens'

const root = process.cwd()
const css = fs.readFileSync(path.join(root, 'src/styles/design-tokens.css'), 'utf8')

const flatColors = Object.values(colors).flatMap((group) => Object.values(group))

describe('design tokens', () => {
  it('هر رنگ TS در design-tokens.css هم وجود دارد', () => {
    const missing = flatColors.filter((hex) => !css.includes(hex))

    expect(missing).toEqual([])
  })

  it('مقیاس spacing با CSS هم‌خوان است', () => {
    for (const value of Object.values(spacing)) {
      expect(css).toContain(`: ${value}px;`)
    }
  })

  it('شعاع‌ها با CSS هم‌خوان است', () => {
    for (const [name, value] of Object.entries(radius)) {
      expect(css).toContain(`--radius-fa-${name}: ${value}px;`)
    }
  })

  it('سایه‌ی L1 مقدار درست دارد', () => {
    expect(shadows.l1).toBe('0 0 12px 0 #66788066')
    expect(css).toContain(`--shadow-l1: ${shadows.l1};`)
  })

  it('هر اندازه‌ی متن TS یک توکن --text-* در CSS دارد', () => {
    const sizes = new Set(
      [...Object.values(typography.heading), ...Object.values(typography.text)].map(
        (s) => s.fontSize,
      ),
    )

    for (const size of sizes) {
      expect(css).toMatch(new RegExp(`--text-[a-z0-9-]+: ${size}px;`))
    }
  })

  it('هیچ رنگی دوبار با نام متفاوت تعریف نشده باشد', () => {
    const seen = new Map<string, string[]>()
    for (const [group, entries] of Object.entries(colors)) {
      for (const [name, hex] of Object.entries(entries)) {
        seen.set(hex, [...(seen.get(hex) ?? []), `${group}.${name}`])
      }
    }
    const dupes = [...seen.entries()].filter(([, names]) => names.length > 1)

    expect(dupes).toEqual([])
  })

  it('آبجکت tokens همه‌ی گروه‌ها را صادر می‌کند', () => {
    expect(Object.keys(tokens).sort()).toEqual([
      'borderWidth',
      'colors',
      'fontFamily',
      'gradients',
      'radius',
      'shadows',
      'spacing',
      'typography',
    ])
  })
})
