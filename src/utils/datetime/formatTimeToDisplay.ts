import {Dayjs, dayjs} from '@/utils/datetime/dayjs'
import {parseTimeToDayjs} from '@/utils/datetime/parseTimeToDayjs'

type Options = {hoursLabelShort?: boolean; includeHoursLabel?: boolean}

export const formatTimeToDisplay = (
  date: string | Dayjs,
  {includeHoursLabel = false, hoursLabelShort = false}: Options = {},
) => {
  let parsedTime = dayjs(date)

  if (!parsedTime.isValid() && typeof date === 'string') {
    parsedTime = parseTimeToDayjs(date)
  }

  const time = parsedTime.format('HH.mm')

  if (includeHoursLabel) {
    if (hoursLabelShort) {
      return `${time}u`
    }

    return `${time} uur`
  } else {
    return time
  }
}
