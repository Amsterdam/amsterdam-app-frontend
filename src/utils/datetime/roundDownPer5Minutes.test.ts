import {dayjs} from '@/utils/datetime/dayjs'
import {roundDownPer5Minutes} from '@/utils/datetime/roundDownPer5Minutes'

describe('roundDownPer5Minutes', () => {
  it('should round down to the nearest 5 minutes', () => {
    const date = dayjs('2023-10-01T12:34:56')
    const roundedDate = roundDownPer5Minutes(date)

    expect(roundedDate.format('YYYY-MM-DDTHH:mm:ss')).toBe(
      '2023-10-01T12:30:00',
    )
  })
  it('precise 5 minute time should not change', () => {
    const date = dayjs('2023-10-01T12:35:00')
    const roundedDate = roundDownPer5Minutes(date)

    expect(roundedDate.format('YYYY-MM-DDTHH:mm:ss')).toBe(
      '2023-10-01T12:35:00',
    )
  })
})
