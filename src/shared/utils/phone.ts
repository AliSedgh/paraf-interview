export function toLatinDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
}

export function normalizeIranMobile(input: string): string | null {
  const digits = toLatinDigits(input).replace(/[^\d+]/g, '')
  const bare = digits.replace(/^\+/, '')

  let national: string
  if (bare.startsWith('98')) national = bare.slice(2)
  else if (bare.startsWith('0')) national = bare.slice(1)
  else national = bare

  if (!/^9\d{9}$/.test(national)) return null

  return `98${national}`
}

export function isValidIranMobile(input: string): boolean {
  return normalizeIranMobile(input) !== null
}
