import {dayjs} from '@/utils/datetime/dayjs'

export const getWeekdaysStartingFrom = (startIndex = 0, min = false) => {
  const weekdays = min
    ? dayjs().localeData().weekdaysMin()
    : dayjs().localeData().weekdays()

  return [...weekdays.slice(startIndex), ...weekdays.slice(0, startIndex)]
}
