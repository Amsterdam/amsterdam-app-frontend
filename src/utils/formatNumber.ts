type Options = {
  currency?: 'EUR' | 'USD'
}

const currencyFormatter = (currency: Options['currency']) => {
  if (currency === 'EUR') {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
    })
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

export const formatNumber = (number: number, options?: Options) => {
  const {currency} = options ?? {}

  if (currency) {
    return currencyFormatter(currency).format(number)
  }

  return number.toLocaleString('nl-NL')
}
