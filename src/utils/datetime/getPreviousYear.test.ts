import {getPreviousYear} from '@/utils/datetime/getPreviousYear'

describe('getPreviousYear', () => {
  it('should return the previous year', () => {
    const date = '2023-09-12'
    const result = getPreviousYear(date)

    expect(result).toBe('13 september 2022')
  })

  it('should return the previous year with different spelling', () => {
    const date = '2023 september 12'
    const result = getPreviousYear(date)

    expect(result).toBe('13 september 2022')
  })

  it('should handle invalid dates', () => {
    const invalidDate = 'invalid-date'
    const result = getPreviousYear(invalidDate)

    expect(result).toBe('Invalid Date')
  })
  it('should handle nullish date', () => {
    const result1 = getPreviousYear(null)

    expect(result1).toBe('Invalid Date')
  })
})
