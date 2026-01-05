import {formatDateToDisplay} from '@/utils/datetime/formatDateToDisplay'

describe('formatDateToDisplay', () => {
  afterAll(() => {
    jest.useRealTimers()
  })
  it('should format and cut the date string correctly', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2025-10-01'))
    expect(formatDateToDisplay('2026-01-01')).toBe('1 januari 2026')
    expect(formatDateToDisplay('2025-01-01')).toBe('1 januari')
    jest.useRealTimers()
    expect(formatDateToDisplay('2025-01-01')).toBe('1 januari 2025')
  })

  it('should return an empty string for an empty input', () => {
    expect(formatDateToDisplay('')).toBe('')
  })

  it('should return null or undefined for an empty input', () => {
    expect(formatDateToDisplay(null as unknown as string)).toBe('')
    expect(formatDateToDisplay(undefined as unknown as string)).toBe('')
  })
})
