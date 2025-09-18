import {getOpeningTimes} from '@/modules/vote/utils/getOpeningTimes'

describe('getOpeningTimes', () => {
  it('returns empty string for undefined', () => {
    expect(getOpeningTimes(undefined)).toBe('')
  })

  it('returns empty string for empty array', () => {
    expect(getOpeningTimes([])).toBe('')
  })

  it('formats a single opening time', () => {
    const input = [[1717651800, 1717686000]]

    expect(getOpeningTimes(input)).toBe('04.30 tot 14.00 uur, 06 juni')
  })
})
