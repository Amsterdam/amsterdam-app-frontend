import {VisitingHour, ExceptionDate} from '@/modules/contact/types'
import {dayjs} from '@/utils/datetime/dayjs'

// Helper to check if an opening time should be returned
const checkAndReturnOpening = (
  check: import('dayjs').Dayjs,
  now: import('dayjs').Dayjs,
  opening: {hours: number; minutes: number} | undefined,
  i: number,
): {dayLabel: string; timeLabel: string} | null => {
  if (!opening) {
    return null
  }

  const openingTime = check
    .set('hour', opening.hours)
    .set('minute', opening.minutes)
    .set('second', 0)

  if (i === 0 && !openingTime.isAfter(now)) {
    // If today, only return if opening is after now
    // Otherwise, skip to next day
    return null
  }

  return makeOpeningResult(check, now, openingTime)
}

// Helper to get the day label (vandaag, morgen, or weekday)
const getDayLabel = (
  day: import('dayjs').Dayjs,
  now: import('dayjs').Dayjs,
): string => {
  const diff = day.startOf('day').diff(now.startOf('day'), 'day')

  if (diff === 0) {
    return 'vandaag'
  }

  if (diff === 1) {
    return 'morgen'
  }

  return day.format('dddd')
}

// Helper to create the opening result object
const makeOpeningResult = (
  day: import('dayjs').Dayjs,
  nowRef: import('dayjs').Dayjs,
  openingTime: import('dayjs').Dayjs,
): {dayLabel: string; timeLabel: string} => ({
  dayLabel: getDayLabel(day, nowRef),
  timeLabel: openingTime.format('HH.mm'),
})

export const getNextOpening = (
  visitingHours: VisitingHour[],
  exceptions: ExceptionDate[],
  nowArg?: import('dayjs').Dayjs,
): {dayLabel: string; timeLabel: string} | null => {
  const now = nowArg ?? dayjs()

  // Check today and the next 7 days
  for (let i = 0; i <= 7; i++) {
    const check = now.add(i, 'day')
    const dateStr = check.format('YYYY-MM-DD')
    // 1. Check exception for that day
    const exception = exceptions.find(e => e.date === dateStr)

    if (exception) {
      if (exception.opening && exception.closing) {
        const result = checkAndReturnOpening(check, now, exception.opening, i)

        if (result) {
          return result
        }
      }

      // If both opening and closing are missing/null, closed all day, skip to next day
      if (!exception.opening && !exception.closing) {
        continue
      }
      // If only one is missing, treat as closed all day for safety

      continue
    }

    // 2. Check regular hours, but only if no closed-all-day exception
    const dayOfWeek = check.day() === 0 ? 7 : check.day()

    if (dayOfWeek < 1 || dayOfWeek > 5) {
      continue
    }

    const regular = visitingHours.find(h => h.dayOfWeek === dayOfWeek)

    if (regular) {
      const result = checkAndReturnOpening(check, now, regular.opening, i)

      if (result) {
        return result
      }
    }
  }

  return null
}
