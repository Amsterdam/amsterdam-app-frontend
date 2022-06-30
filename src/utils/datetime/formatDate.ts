import 'intl'
import 'intl/locale-data/jsonp/nl-NL'
/**
 * Converts string to date
 */
export const formatDate = (date: string | number) => {
  if (date === null || date === undefined) {
    return ''
  }
  const jsDate = new Date(date)

  const formattedDate = new Intl.DateTimeFormat('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(jsDate)

  return formattedDate
}
