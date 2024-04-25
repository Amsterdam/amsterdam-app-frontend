import {
  ExceptionDate,
  OpeningAndClosingTimes,
  VisitingHour,
} from '@/modules/contact/types'
import {findRegularVisitingHoursForDate} from '@/modules/contact/utils/findRegularVisitingHoursForDate'
import {getExceptionOpeningTimesForDate} from '@/modules/contact/utils/getExceptionOpeningTimesForDate'
import {Preposition} from '@/types/datetime'
import {adjustHoursAndMinutes} from '@/utils/datetime/adjustHoursAndMinutes'
import {dayjs, Dayjs} from '@/utils/datetime/dayjs'
import {formatDayName} from '@/utils/datetime/formatDayName'

type VisitingState = {
  dayName?: string
  preposition: Preposition
  time12hr: string
  time24hr: string
}

const getVisitingStateFromDateWithOpeningAndClosingTimes = (
  candidateDate: Dayjs,
  {opening, closing}: OpeningAndClosingTimes,
  date: Dayjs = dayjs(),
): VisitingState => {
  const candidateOpeningTime = adjustHoursAndMinutes(candidateDate, opening)
  const candidateClosingTime = adjustHoursAndMinutes(candidateDate, closing)
  let preposition: Preposition
  let dayName: string | undefined
  let time: Dayjs

  // Return either the next opening or othe next closing time.
  if (date.isSame(candidateDate, 'day')) {
    if (date.isBefore(candidateOpeningTime)) {
      preposition = Preposition.from
      time = candidateOpeningTime
    } else {
      preposition = Preposition.until
      time = candidateClosingTime
    }
  } else {
    preposition = Preposition.from
    dayName = formatDayName(candidateDate, date)
    time = candidateOpeningTime
  }

  return {
    dayName,
    preposition,
    time24hr: time.format('HH.mm'),
    time12hr: time.format('h:mm'),
  }
}

/**
 * Finds the next point in time on which visiting hours start or end.
 */
export const getVisitingState = (
  visitingHours: VisitingHour[],
  exceptionDates: ExceptionDate[],
  date: Dayjs = dayjs(),
): VisitingState | null => {
  for (let offset = 0; offset <= 31; offset++) {
    // Try the start of every next day for a month.
    const candidate = date.startOf('day').add(offset, 'day')

    // check if the candidate is an exception date
    const exception = getExceptionOpeningTimesForDate(candidate, exceptionDates)

    let candidateVisitingHours: OpeningAndClosingTimes | undefined

    if (exception) {
      if (exception.closing && exception.opening) {
        candidateVisitingHours = exception as OpeningAndClosingTimes
      }
    } else {
      // Find regular visiting hours for this date
      candidateVisitingHours = findRegularVisitingHoursForDate(
        visitingHours,
        candidate,
      )
    }

    // Only consider candidates for which closing time is still in the future
    if (
      candidateVisitingHours &&
      date.isBefore(
        adjustHoursAndMinutes(candidate, candidateVisitingHours.closing),
      )
    ) {
      // After finding the first acceptable date, extract data from it
      return getVisitingStateFromDateWithOpeningAndClosingTimes(
        candidate,
        candidateVisitingHours,
        date,
      )
    }
  }

  return null
}
