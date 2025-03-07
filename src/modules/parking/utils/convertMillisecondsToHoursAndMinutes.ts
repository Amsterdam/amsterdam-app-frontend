/**
 * Converts milliseconds to a string representing hours and minutes.
 * @param milliseconds - The time duration in milliseconds.
 * @returns A string in the format "X hours Y minutes".
 */
export const convertMillisecondsToHoursAndMinutes = (milliseconds: number) => {
  milliseconds = Number(milliseconds)
  const totalMinutes = Math.floor(milliseconds / 1000 / 60)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return [hours, minutes]
}
