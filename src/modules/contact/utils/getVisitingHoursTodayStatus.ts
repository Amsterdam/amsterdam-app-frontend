import {ExceptionDate, VisitingHour} from '@/modules/contact/types'
import {dayjs} from '@/utils/datetime/dayjs'

type OpeningAndClosing = {
  closing: {hours: number; minutes: number}
  opening: {hours: number; minutes: number}
}

type ExceptionOpeningResult = OpeningAndClosing | 'closed-all-day' | null

const getTodayExceptionOpeningAndClosing = (
  exceptions: ExceptionDate[],
  now = dayjs(),
): ExceptionOpeningResult => {
  const todayStr = now.format('YYYY-MM-DD')
  const exception = exceptions.find(e => e.date === todayStr)

  if (exception) {
    if (exception.opening && exception.closing) {
      return {opening: exception.opening, closing: exception.closing}
    }

    if (!exception.opening && !exception.closing) {
      return 'closed-all-day'
    }
  }

  return null
}

const getTodayRegularOpeningAndClosing = (
  visitingHours: VisitingHour[],
  now = dayjs(),
): OpeningAndClosing | null => {
  const today = now.day() === 0 ? 7 : now.day()
  const regular = visitingHours.find(h => h.dayOfWeek === today)

  if (regular) {
    return {opening: regular.opening, closing: regular.closing}
  }

  return null
}

export const getVisitingHoursTodayStatus = (
  visitingHours: VisitingHour[],
  exceptions: ExceptionDate[],
  nowArg?: import('dayjs').Dayjs,
): {
  closingTime?: string
  status: 'open-exception' | 'closed' | 'open-regular'
} => {
  const now = nowArg ?? dayjs()
  // 1. Check exception for today
  const exceptionResult = getTodayExceptionOpeningAndClosing(exceptions, now)

  if (exceptionResult === 'closed-all-day') {
    return {status: 'closed'}
  }

  if (exceptionResult) {
    const {opening, closing} = exceptionResult
    const openTime = now
      .set('hour', opening.hours)
      .set('minute', opening.minutes)
      .set('second', 0)
    const closeTime = now
      .set('hour', closing.hours)
      .set('minute', closing.minutes)
      .set('second', 0)

    if (now.isAfter(openTime) && now.isBefore(closeTime)) {
      return {status: 'open-exception', closingTime: closeTime.format('HH.mm')}
    }

    // If exception exists but not open now, it's closed
    return {status: 'closed'}
  }

  // 2. Check regular hours for today
  const regular = getTodayRegularOpeningAndClosing(visitingHours, now)

  if (regular) {
    const openTime = now
      .set('hour', regular.opening.hours)
      .set('minute', regular.opening.minutes)
      .set('second', 0)
    const closeTime = now
      .set('hour', regular.closing.hours)
      .set('minute', regular.closing.minutes)
      .set('second', 0)

    if (now.isAfter(openTime) && now.isBefore(closeTime)) {
      return {status: 'open-regular'}
    }
  }

  // 3. Otherwise closed
  return {status: 'closed'}
}
