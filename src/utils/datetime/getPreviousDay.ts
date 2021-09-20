import {days} from '../index'

/**
 * Returns the name of the previous day.
 * @param day
 */
export const getPreviousDay = (day: string): string => {
  const index = days.indexOf(day) - 1

  return days[index % 7]
}
