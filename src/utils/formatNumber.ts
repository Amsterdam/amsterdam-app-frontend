export const formatNumber = (number?: number, currency?: string) => {
  if (currency) {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency,
    }).format(number ?? 0)
  }

  return number?.toLocaleString('nl-NL') ?? '0'
}
