import {VisitingHour} from '@/modules/contact/types'
import {getGroupedOpeningHours} from '@/modules/contact/utils/getGroupedOpeningHours'

describe('getGroupedOpeningHours', () => {
  it('groups days with the same opening and closing times', () => {
    const hours: VisitingHour[] = [
      {
        dayOfWeek: 1,
        opening: {hours: 9, minutes: 0},
        closing: {hours: 17, minutes: 0},
      },
      {
        dayOfWeek: 2,
        opening: {hours: 9, minutes: 0},
        closing: {hours: 17, minutes: 0},
      },
      {
        dayOfWeek: 3,
        opening: {hours: 9, minutes: 0},
        closing: {hours: 17, minutes: 0},
      },
      {
        dayOfWeek: 4,
        opening: {hours: 9, minutes: 0},
        closing: {hours: 20, minutes: 0},
      },
      {
        dayOfWeek: 5,
        opening: {hours: 9, minutes: 0},
        closing: {hours: 17, minutes: 0},
      },
    ]
    const result = getGroupedOpeningHours(hours)

    expect(result).toEqual([
      'Maandag, dinsdag, woensdag en vrijdag van 09.00 tot 17.00 uur',
      'Donderdag van 09.00 tot 20.00 uur',
    ])
  })

  it('returns an empty array if input is empty', () => {
    expect(getGroupedOpeningHours([])).toEqual([])
  })

  it('handles single day correctly', () => {
    const hours: VisitingHour[] = [
      {
        dayOfWeek: 3,
        opening: {hours: 10, minutes: 30},
        closing: {hours: 15, minutes: 0},
      },
    ]

    expect(getGroupedOpeningHours(hours)).toEqual([
      'Woensdag van 10.30 tot 15.00 uur',
    ])
  })

  it('handles two days with different times', () => {
    const hours: VisitingHour[] = [
      {
        dayOfWeek: 1,
        opening: {hours: 8, minutes: 0},
        closing: {hours: 12, minutes: 0},
      },
      {
        dayOfWeek: 2,
        opening: {hours: 9, minutes: 0},
        closing: {hours: 17, minutes: 0},
      },
    ]

    expect(getGroupedOpeningHours(hours)).toEqual([
      'Maandag van 08.00 tot 12.00 uur',
      'Dinsdag van 09.00 tot 17.00 uur',
    ])
  })
})
