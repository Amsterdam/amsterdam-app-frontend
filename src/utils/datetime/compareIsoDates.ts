/**
 * Compare two ISO 8601 formatted date strings. If the second date is omitted, the current date is used.
 * Returns 0 if they are equal, -1 if the first date is earlier than the second, and 1 if the first date is later than the second.
 */
export const compareIsoDates = (isoDate1: string, isoDate2?: string) => {
  try {
    if (!isoDate1) {
      return 0
    }
    const date1 = new Date(isoDate1).getTime()
    const date2 = isoDate2 ? new Date(isoDate2).getTime() : Date.now()

    if (date1 === date2) {
      return 0
    }

    return date1 < date2 ? -1 : 1
  } catch {
    return 0
  }
}
