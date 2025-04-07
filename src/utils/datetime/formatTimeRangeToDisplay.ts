import simplur from 'simplur'
import {Dayjs, dayjs} from '@/utils/datetime/dayjs'

export const formatTimeRangeToDisplay = (
  startTime: string | Dayjs,
  endTime: string | Dayjs,
) => {
  const start = dayjs(startTime)
  const hours = dayjs(endTime).diff(start, 'hour')
  const minutes = dayjs(endTime).subtract(hours, 'hour').diff(start, 'minute')
  const minutesText = simplur`${minutes} minu[ut|ten]`

  if (hours < 0 || minutes < 0) {
    return ''
  }

  if (hours > 0) {
    const hoursText = simplur`${hours} u[ur|ren]`

    if (minutes > 0) {
      return `${hoursText} en ${minutesText}`
    }

    return hoursText
  } else {
    return minutesText
  }
}
