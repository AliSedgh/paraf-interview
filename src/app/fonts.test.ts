import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

const root = process.cwd()
const fontsTs = fs.readFileSync(path.join(root, 'src/app/fonts.ts'), 'utf8')
const globalsCss = fs.readFileSync(path.join(root, 'src/app/globals.css'), 'utf8')
const tokensCss = fs.readFileSync(path.join(root, 'src/styles/design-tokens.css'), 'utf8')
const layoutTsx = fs.readFileSync(path.join(root, 'src/app/layout.tsx'), 'utf8')

const WOFF2_MAGIC = 'wOF2'

describe('فونت پروژه', () => {
  it.each(['yekan-plus-400.woff2', 'yekan-plus-700.woff2'])(
    '%s وجود دارد و WOFF2 معتبر است',
    (name) => {
      const file = path.join(root, 'src/assets/fonts', name)

      expect(fs.existsSync(file)).toBe(true)

      const buffer = fs.readFileSync(file)
      expect(buffer.toString('latin1', 0, 4)).toBe(WOFF2_MAGIC)
      expect(buffer.length).toBeGreaterThan(10_000)
    },
  )

  it('هر فایلی که در fonts.ts اعلام شده واقعاً روی دیسک هست', () => {
    const declared = [...fontsTs.matchAll(/path:\s*'([^']+)'/g)].map((m) => m[1])

    expect(declared.length).toBe(2)

    for (const rel of declared) {
      const resolved = path.resolve(root, 'src/app', rel)
      expect(fs.existsSync(resolved), `${rel} یافت نشد`).toBe(true)
    }
  })

  it('وزن‌های ۴۰۰ و ۷۰۰ اعلام شده‌اند', () => {
    const weights = [...fontsTs.matchAll(/weight:\s*'(\d+)'/g)].map((m) => m[1])

    expect(weights.sort()).toEqual(['400', '700'])
  })

  it('layout متغیر فونت را روی <html> می‌گذارد', () => {
    expect(layoutTsx).toContain('yekan.variable')
  })

  it('نام متغیر CSS در fonts.ts و استایل‌ها یکی است', () => {
    const variable = fontsTs.match(/variable:\s*'(--[\w-]+)'/)?.[1]

    expect(variable).toBe('--font-yekan')
    expect(globalsCss).toContain(`var(${variable})`)
    expect(tokensCss).toContain(`var(${variable})`)
  })

  it('font-sans و font-fa هر دو به فونت پروژه اشاره می‌کنند', () => {
    expect(globalsCss).toMatch(/--font-sans:\s*var\(--font-yekan\)/)
    expect(tokensCss).toMatch(/--font-fa:\s*var\(--font-yekan\)/)
  })
})
