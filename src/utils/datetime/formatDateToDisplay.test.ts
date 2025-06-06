import {formatDateToDisplay} from '@/utils/datetime/formatDateToDisplay'

describe('formatDateToDisplay', () => {
  it('should format and cut the date string correctly', () => {
    expect(formatDateToDisplay('2023-01-01')).toBe('1 januari 2023')
  })

  it('should return an empty string for an empty input', () => {
    expect(formatDateToDisplay('')).toBe('')
  })

  it('should return null or undefined for an empty input', () => {
    expect(formatDateToDisplay(null as unknown as string)).toBe('')
    expect(formatDateToDisplay(undefined as unknown as string)).toBe('')
  })

  it('should return "Vandaag" for a date today and with todayAsDate=false', () => {
    const today = new Date()

    expect(formatDateToDisplay(today.toISOString(), false)).toBe('Vandaag')
  })
  it('should return the date for a date today and with todayAsDate=true', () => {
    const today = new Date()

    expect(formatDateToDisplay(today.toISOString(), true)).not.toBe('Vandaag')
    expect(formatDateToDisplay(today.toISOString())).not.toBe('Vandaag')
  })
})
