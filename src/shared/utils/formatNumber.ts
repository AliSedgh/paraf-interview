export function formatNumber(value: number | null | undefined, locale = 'fa-IR'): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '—'

  return new Intl.NumberFormat(locale).format(value)
}
