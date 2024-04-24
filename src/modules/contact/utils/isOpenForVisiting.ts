import {
  ExceptionDate,
  HoursAndMinutes,
  VisitingHour,
} from '@/modules/contact/types'
import {getExceptionOpeningTimesForDate} from '@/modules/contact/utils/getExceptionOpeningTimesForDate'
import {adjustHoursAndMinutes} from '@/utils/datetime/adjustHoursAndMinutes'
import {dayjs, Dayjs} from '@/utils/datetime/dayjs'

const dateIsWeekDay = (date: Dayjs, dayOfWeek: number) =>
  date.day() === dayOfWeek

const dateIsAfterOpeningTime = (date: Dayjs, opening: HoursAndMinutes) =>
  date.isSame(adjustHoursAndMinutes(date, opening)) ||
  date.isAfter(adjustHoursAndMinutes(date, opening))

const dateIsBeforeClosingTime = (date: Dayjs, closing: HoursAndMinutes) =>
  date.isBefore(adjustHoursAndMinutes(date, closing))

export const isOpenForVisiting = (
  visitingHours: VisitingHour[],
  exceptionDates: ExceptionDate[],
  date: Dayjs = dayjs(),
) =>
  visitingHours
    .filter(({dayOfWeek}) => dateIsWeekDay(date, dayOfWeek))
    .some(({opening: regularOpening, closing: regularClosing}) => {
      const exception = getExceptionOpeningTimesForDate(date, exceptionDates)

      if (exception && (!exception.closing || !exception.opening)) {
        // for exception dates without opening times, so the city office is closed
        return false
      }

      const opening = exception?.opening ?? regularOpening
      const closing = exception?.closing ?? regularClosing

      return (
        // dateIsWeekDay(date, dayOfWeek) &&
        dateIsAfterOpeningTime(date, opening) &&
        dateIsBeforeClosingTime(date, closing)
      )
    })
