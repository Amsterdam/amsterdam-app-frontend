import 'intl'
import 'intl/locale-data/jsonp/nl-NL'

export const formatTime = (date: string | number) => {
  const jsDate = new Date(date)

  const formattedDate = new Intl.DateTimeFormat('nl-NL', {
    hourCycle: 'h24',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(jsDate)

  return formattedDate
}
