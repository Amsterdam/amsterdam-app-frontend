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
export const weekdayToNumber = (day: string): number | undefined => {
  const lowerCaseDay = day.toLowerCase()

  return mapping[lowerCaseDay as keyof typeof mapping]
}
