import {
  ExceptionDate,
  HoursAndMinutes,
  VisitingHour,
} from '@/modules/contact/types'
import {findRegularVisitingHoursForDate} from '@/modules/contact/utils/findRegularVisitingHoursForDate'
import {getExceptionOpeningTimesForDate} from '@/modules/contact/utils/getExceptionOpeningTimesForDate'
import {adjustHoursAndMinutes} from '@/utils/datetime/adjustHoursAndMinutes'
import {dayjs, Dayjs} from '@/utils/datetime/dayjs'

const dateIsAfterOpeningTime = (date: Dayjs, opening: HoursAndMinutes) =>
  date.isSame(adjustHoursAndMinutes(date, opening)) ||
  date.isAfter(adjustHoursAndMinutes(date, opening))

const dateIsBeforeClosingTime = (date: Dayjs, closing: HoursAndMinutes) =>
  date.isBefore(adjustHoursAndMinutes(date, closing))

export const isOpenForVisiting = (
  visitingHours: VisitingHour[],
  exceptionDates: ExceptionDate[],
  date: Dayjs = dayjs(),
) => {
  const regularOpeningTime = findRegularVisitingHoursForDate(
    visitingHours,
    date,
  )

  if (!regularOpeningTime) {
    return false
  }

  const {opening: regularOpening, closing: regularClosing} = regularOpeningTime
  const exception = getExceptionOpeningTimesForDate(date, exceptionDates)

  if (exception && (!exception.closing || !exception.opening)) {
    // for exception dates without opening times, so the city office is closed
    return false
  }

  const opening = exception?.opening ?? regularOpening
  const closing = exception?.closing ?? regularClosing

  return (
    dateIsAfterOpeningTime(date, opening) &&
    dateIsBeforeClosingTime(date, closing)
  )
}
