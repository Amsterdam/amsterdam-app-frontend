import 'intl'
import 'intl/locale-data/jsonp/nl-NL'

export const formatNumber = (number: number) => {
  const formattedNumber = new Intl.NumberFormat('nl-NL').format(number)

  return formattedNumber
}
