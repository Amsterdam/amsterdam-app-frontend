const mapping: Record<
  | 'zondag'
  | 'maandag'
  | 'dinsdag'
  | 'woensdag'
  | 'donderdag'
  | 'vrijdag'
  | 'zaterdag',
  number
> = {
  zondag: 0,
  maandag: 1,
  dinsdag: 2,
  woensdag: 3,
  donderdag: 4,
  vrijdag: 5,
  zaterdag: 6,
}

/**
 * Returns numbers from 0 (Sunday) to 6 (Saturday).
 */
export const weekdayToNumber = (day: string) => {
  const lowerCaseDay = day.toLowerCase()
  const number = mapping[lowerCaseDay as keyof typeof mapping]

  if (number === undefined) {
    throw new Error(`Invalid day: ${day}`)
  }

  return number
}
