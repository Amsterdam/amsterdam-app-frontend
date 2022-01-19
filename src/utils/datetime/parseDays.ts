import {days} from './days'

/**
 * Returns an array of day names found in a string.
 * @param input
 */
export const parseDays = (input: string): string[] =>
  days.reduce<string[]>((pickupDays, day) => {
    if (new RegExp(day).test(input.toLowerCase())) {
      input = input.replace(day, '')
      pickupDays.push(day)
    }

    return pickupDays
  }, [])
