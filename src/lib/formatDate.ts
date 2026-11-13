const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export function formatSanityDate(value: string | undefined | null) {
  const trimmed = value?.trim()
  if (!trimmed) return undefined

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed)
  if (!match) return trimmed

  const month = MONTHS[Number(match[2]) - 1]
  const day = Number(match[3])
  if (!month || !Number.isInteger(day) || day < 1 || day > 31) return trimmed

  return `${day} ${month} ${match[1]}`
}

export function safeHttpUrl(value: string | undefined | null) {
  const trimmed = value?.trim()
  if (!trimmed) return undefined

  try {
    const url = new URL(trimmed)
    if (url.protocol === 'https:' || url.protocol === 'http:') return url.href
  } catch {
    return undefined
  }

  return undefined
}
