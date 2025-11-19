import simplur from 'simplur'
import {Dayjs, dayjs} from '@/utils/datetime/dayjs'

export type Options = {
  /**
   * shows text in short form (e.g. "1 uur en 30 min" instead of "1 uur en 30 minuten")
   */
  short?: boolean
}

export const formatTimeRangeToDisplay = (
  startTime: string | Dayjs,
  endTime: string | Dayjs,
  {short = false}: Options = {},
) => {
  const start = dayjs(startTime)
  const end = dayjs(endTime)
  const isNegative = end.isBefore(start)
  const sign = isNegative ? '- ' : ''
  const hours = Math.abs(dayjs(endTime).diff(start, 'hour'))
  const minutes = Math.abs(
    dayjs(endTime)
      .subtract(isNegative ? -hours : hours, 'hour')
      .diff(start, 'minute'),
  )
  const minutesText = short
    ? `${minutes} min`
    : simplur`${minutes} minu[ut|ten]`

  if (hours < 0 || minutes < 0) {
    return ''
  }

  if (hours > 0) {
    const hoursText = short ? `${hours} uur` : simplur`${hours} u[ur|ren]`

    if (minutes > 0) {
      return `${sign}${hoursText} en ${minutesText}`
    }

    return `${sign}${hoursText}`
  } else {
    return `${sign}${minutesText}`
  }
}
