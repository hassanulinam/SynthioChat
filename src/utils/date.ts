export function toDate(value: Date | string): Date {
  if (value instanceof Date) {
    return value
  }

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? new Date(0) : date
}

export function formatTimestamp(date: Date | string): string {
  return toDate(date).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function truncateTitle(content: string, maxLength = 40): string {
  const trimmed = content.trim()
  if (trimmed.length <= maxLength) {
    return trimmed
  }
  return `${trimmed.slice(0, maxLength).trimEnd()}…`
}
