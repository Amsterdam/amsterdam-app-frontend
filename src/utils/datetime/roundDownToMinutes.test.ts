import {dayjs} from '@/utils/datetime/dayjs'
import {roundDownToMinutes} from '@/utils/datetime/roundDownToMinutes'

describe('roundDownToMinutes', () => {
  it('should round down to the nearest minute', () => {
    const date = dayjs('2023-10-01T12:34:56')
    const roundedDate = roundDownToMinutes(date)

    expect(roundedDate.format('YYYY-MM-DDTHH:mm:ss')).toBe(
      '2023-10-01T12:34:00',
    )
  })
  it('precise minute time should not change', () => {
    const date = dayjs('2023-10-01T12:35:00')
    const roundedDate = roundDownToMinutes(date)

    expect(roundedDate.format('YYYY-MM-DDTHH:mm:ss')).toBe(
      '2023-10-01T12:35:00',
    )
  })
})
