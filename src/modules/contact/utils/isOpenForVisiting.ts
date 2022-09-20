import {holidays} from '@/modules/contact/data'
import {HoursAndMinutes, VisitingHour} from '@/modules/contact/types'
import {adjustHoursAndMinutes, dayjs, Dayjs} from '@/utils'

export const isOpenForVisiting = (
  visitingHours: VisitingHour[],
  date: Dayjs = dayjs(),
) => {
  const todayIsWeekDay = (dayOfWeek: number) => date.day() === dayOfWeek

  const todayIsNotHoliday = () =>
    !holidays.some(holiday => date.isSame(dayjs(holiday), 'day'))

  const nowIsAfterOpeningTime = (opening: HoursAndMinutes) =>
    date.isSame(adjustHoursAndMinutes(date, opening)) ||
    date.isAfter(adjustHoursAndMinutes(date, opening))

  const nowIsBeforeClosingTime = (closing: HoursAndMinutes) =>
    date.isBefore(adjustHoursAndMinutes(date, closing))

  return visitingHours.some(
    ({opening, closing, dayOfWeek}) =>
      todayIsWeekDay(dayOfWeek) &&
      todayIsNotHoliday() &&
      nowIsAfterOpeningTime(opening) &&
      nowIsBeforeClosingTime(closing),
  )
}
