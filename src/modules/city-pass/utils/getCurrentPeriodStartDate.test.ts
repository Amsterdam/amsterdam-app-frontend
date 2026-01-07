import {getCurrentPeriodStartDate} from '@/modules/city-pass/utils/getCurrentPeriodStartDate'

describe('getCurrentPeriodStartDate', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it('should return the first of August of the current year, when the current date is after August 1st', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2025-08-01T12:00:00'))
    expect(getCurrentPeriodStartDate().toJSON()).toBe(
      '2025-08-01T01:00:00.000Z',
    )
    jest.useRealTimers()
  })
  it('should return the first of August of the previous year, when the current date is before August 1st', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2025-07-01T12:00:00'))
    expect(getCurrentPeriodStartDate().toJSON()).toBe(
      '2024-08-01T01:00:00.000Z',
    )
    jest.useRealTimers()
  })
})
