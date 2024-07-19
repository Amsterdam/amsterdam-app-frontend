export const formatNumber = (number: number, currency?: boolean) => {
  if (currency) {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
    }).format(number)
  }

  return number.toLocaleString('nl-NL')
}
