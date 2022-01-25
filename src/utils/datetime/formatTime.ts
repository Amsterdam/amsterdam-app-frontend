import 'intl'
import 'intl/locale-data/jsonp/nl-NL'

type Signature = (date: string | number, displaySeconds?: boolean) => string

export const formatTime: Signature = (date, displaySeconds = false) => {
  const jsDate = new Date(date)

  if (jsDate.toString() === 'Invalid Date') {
    throw 'Incorrect `date` provided to `formatTime`.'
  }

  const options: Intl.DateTimeFormatOptions = {
    hourCycle: 'h24',
    hour: '2-digit',
    minute: '2-digit',
    second: displaySeconds ? '2-digit' : undefined,
  }

  const formattedTime = new Intl.DateTimeFormat('nl-NL', options).format(jsDate)

  return formattedTime
}
