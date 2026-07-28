const DEFAULT_LOCALE = 'fa-IR'

const DEFAULT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}

export function formatDate(
  input: Date | string | number | null | undefined,
  options: Intl.DateTimeFormatOptions = DEFAULT_OPTIONS,
  locale: string = DEFAULT_LOCALE,
): string {
  if (input === null || input === undefined || input === '') return ''

  const date = input instanceof Date ? input : new Date(input)
  if (Number.isNaN(date.getTime())) return ''

  return new Intl.DateTimeFormat(locale, options).format(date)
}
