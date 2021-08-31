/**
 * Extacts a time (hh:mm) from a string.
 * @param input
 */
export const parseTime = (input: string): string | undefined => {
  const time = input.match(/\b[0-9]{2}\.[0-9]{2}\b/)

  return time?.[0]
}
