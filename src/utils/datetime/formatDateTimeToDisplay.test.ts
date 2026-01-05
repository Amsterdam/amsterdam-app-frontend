import {formatDateToDisplay} from '@/utils/datetime/formatDateToDisplay'

describe('formatDateToDisplay', () => {
  afterAll(() => {
    jest.useRealTimers()
  })

  it('should return the full date, when the date is not in the current year', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2025-09-01T12:00:00'))
    expect(formatDateToDisplay('2026-01-01')).toBe('1 januari 2026')
    jest.useRealTimers()
    expect(formatDateToDisplay('2025-01-01')).toBe('1 januari 2025')
  })

  it('should only return day and month, when date is in the current year', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2025-10-01T12:00:00'))
    expect(formatDateToDisplay('2025-01-01')).toBe('1 januari')
    jest.useRealTimers()
  })

  it('should return "vandaag" for a date that is today and todayAsDate is set accordingly', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2025-10-01T12:00:00'))
    expect(formatDateToDisplay('2025-10-01', false)).toBe('Vandaag')
    expect(formatDateToDisplay('2025-10-01', true)).toBe('1 oktober')
    expect(formatDateToDisplay('2025-10-01')).toBe('1 oktober')
    jest.useRealTimers()
  })

  it('should return an empty string for an empty input', () => {
    expect(formatDateToDisplay('')).toBe('')
  })

  it('should return null or undefined for an empty input', () => {
    expect(formatDateToDisplay(null as unknown as string)).toBe('')
    expect(formatDateToDisplay(undefined as unknown as string)).toBe('')
  })
})
