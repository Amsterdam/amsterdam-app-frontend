import {formatDateToDisplay} from '@/utils/datetime/formatDateToDisplay'

describe('formatDateToDisplay', () => {
  it('should format and cut the date string correctly', () => {
    expect(formatDateToDisplay('2023-01-01')).toBe('1 januari')
  })

  it('should return an empty string for an empty input', () => {
    expect(formatDateToDisplay('')).toBe('')
  })

  it('should return null or undefined for an empty input', () => {
    expect(formatDateToDisplay(null as unknown as string)).toBe('')
    expect(formatDateToDisplay(undefined as unknown as string)).toBe('')
  })
})
