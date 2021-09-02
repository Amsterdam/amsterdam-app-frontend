import {getPreviousDay, parseDays, parseTime} from '../index'

/**
 * Returns a well-formed sentence for one or more days and times.
 * @param days
 * @param from
 * @param until
 */
export const formatDatesTimes = (
  days: string,
  from: string | null,
  until: string | null,
  initialValue: string,
  emptyValue: string,
): string => {
  const daysList = parseDays(days)

  if (daysList.length < 1) {
    return emptyValue
  }

  const fromTime = parseTime(from ?? '')
  const untilTime = parseTime(until ?? '')

  if (days.includes(' tot en met ')) {
    return `op de ophaaldagen tussen ${fromTime} en ${untilTime} uur`
  }

  if (fromTime && untilTime) {
    if (
      parseInt(fromTime.replace('.', ''), 10) <
      parseInt(untilTime.replace('.', ''), 10)
    ) {
      return daysList
        .map(d => `${d} vanaf ${fromTime} tot ${untilTime} uur`)
        .join(' en ')
    }

    return daysList
      .map(
        d =>
          `vanaf ${getPreviousDay(
            d,
          )} ${fromTime} uur tot ${d} ${untilTime} uur`,
      )
      .join(' en ')
  }

  if (fromTime && !untilTime) {
    return daysList.map(d => `${d} vanaf ${fromTime} uur`).join(' en ')
  }

  return initialValue
}
