import {Dayjs, dayjs} from '@/utils/datetime/dayjs'

type Options = {hoursLabelShort?: boolean; includeHoursLabel?: boolean}

export const formatTimeToDisplay = (
  date: string | Dayjs,
  {includeHoursLabel = false, hoursLabelShort = false}: Options = {},
) => {
  const time = dayjs(date).format('HH.mm')

  if (includeHoursLabel) {
    if (hoursLabelShort) {
      return `${time}u`
    }

    return `${time} uur`
  } else {
    return time
  }
}
