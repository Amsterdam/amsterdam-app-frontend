import {holidays} from '@/modules/contact/data'
import {VisitingHour} from '@/modules/contact/types'
import {Preposition} from '@/types'
import {adjustHoursAndMinutes, dayjs, Dayjs, formatDayName} from '@/utils'

type VisitingState = {
  dayName?: string
  preposition: Preposition
  time24hr: string
  time12hr: string
}

/**
 * Finds the next point in time on which visiting hours start or end.
 */
export const getVisitingState = (
  visitingHours: VisitingHour[],
  date: Dayjs = dayjs(),
): VisitingState | null => {
  for (let offset = 0; offset <= 31; offset++) {
    // Try the start of every next day for a month.
    const candidate = date.startOf('day').add(offset, 'day')

    // Find available visiting hours on this date, meaning it should be
    // the correct day of the week, not a holiday, and before closing time.
    const candidateVisitingHours = visitingHours.find(
      ({closing, dayOfWeek}) =>
        candidate.day() === dayOfWeek &&
        !holidays.some(holiday => candidate.isSame(dayjs(holiday), 'day')) &&
        date.isBefore(adjustHoursAndMinutes(candidate, closing)),
    )

    // After finding the next interesting date, extract data from it.
    if (candidateVisitingHours) {
      const {opening, closing} = candidateVisitingHours
      const candidateOpeningTime = adjustHoursAndMinutes(candidate, opening)
      const candidateClosingTime = adjustHoursAndMinutes(candidate, closing)
      let {preposition, dayName, time} = {} as VisitingState & {time: Dayjs}

      // Return either the next opening or othe next closing time.
      if (candidate.isSame(date, 'day')) {
        if (date.isBefore(candidateOpeningTime)) {
          preposition = Preposition.from
          time = candidateOpeningTime
        } else {
          preposition = Preposition.until
          time = candidateClosingTime
        }
      } else {
        preposition = Preposition.from
        dayName = formatDayName(candidate, date)
        time = candidateOpeningTime
      }

      return {
        dayName,
        preposition,
        time24hr: time.format('HH.mm'),
        time12hr: time.format('h:mm'),
      }
    }
  }

  return null
}
