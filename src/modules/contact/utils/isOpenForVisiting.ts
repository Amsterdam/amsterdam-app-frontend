import {holidays} from '@/modules/contact/data'
import {HoursAndMinutes, VisitingHour} from '@/modules/contact/types'
import {adjustHoursAndMinutes, dayjs, Dayjs} from '@/utils'

const todayIsWeekDay = (date: Dayjs, dayOfWeek: number) =>
  date.day() === dayOfWeek

const todayIsNotHoliday = (date: Dayjs) =>
  !holidays.some(holiday => date.isSame(dayjs(holiday), 'day'))

const nowIsAfterOpeningTime = (date: Dayjs, opening: HoursAndMinutes) =>
  date.isSame(adjustHoursAndMinutes(date, opening)) ||
  date.isAfter(adjustHoursAndMinutes(date, opening))

const nowIsBeforeClosingTime = (date: Dayjs, closing: HoursAndMinutes) =>
  date.isBefore(adjustHoursAndMinutes(date, closing))

export const isOpenForVisiting = (
  visitingHours: VisitingHour[],
  date: Dayjs = dayjs(),
) =>
  visitingHours.some(
    ({opening, closing, dayOfWeek}) =>
      todayIsWeekDay(date, dayOfWeek) &&
      todayIsNotHoliday(date) &&
      nowIsAfterOpeningTime(date, opening) &&
      nowIsBeforeClosingTime(date, closing),
  )
