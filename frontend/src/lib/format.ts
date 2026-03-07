export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

type YearFormatConfigurations = '2-digit' | 'numeric' | undefined

export function formatDate(dateStr: string, fullYear: YearFormatConfigurations = '2-digit'): string {
  if (!dateStr) return ''

  const date = new Date(dateStr)

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: fullYear,
    timeZone: 'UTC',
  }).format(date)
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
