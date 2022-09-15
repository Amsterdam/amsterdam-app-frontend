import {holidays} from '@/modules/contact/data'
import {VisitingHour} from '@/modules/contact/types'
import {adjustHoursAndMinutes, dayjs, Dayjs} from '@/utils'

export const isOpenForVisiting = (
  visitingHours: VisitingHour[],
  date: Dayjs = dayjs(),
) =>
  visitingHours.some(
    ({opening, closing, dayOfWeek}) =>
      date.day() === dayOfWeek &&
      !holidays.some(holiday => date.isSame(dayjs(holiday), 'day')) &&
      (date.isAfter(adjustHoursAndMinutes(date, opening)) ||
        date.isSame(adjustHoursAndMinutes(date, opening))) &&
      date.isBefore(adjustHoursAndMinutes(date, closing)),
  )
