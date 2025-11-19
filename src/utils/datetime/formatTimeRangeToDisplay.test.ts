import {formatTimeRangeToDisplay} from '@/utils/datetime/formatTimeRangeToDisplay'

describe('formatTimeRangeToDisplay', () => {
  it('should format time range correctly', () => {
    const startTime = '2023-10-01T12:00:00'
    const endTime = '2023-10-01T14:30:00'

    expect(formatTimeRangeToDisplay(startTime, endTime)).toBe(
      '2 uren en 30 minuten',
    )
  })
  it('should format 0 time difference correctly', () => {
    const startTime = '2023-10-01T12:00:00'
    const endTime = '2023-10-01T12:00:00'

    expect(formatTimeRangeToDisplay(startTime, endTime)).toBe('0 minuten')
  })
  it('should format exact hours time difference correctly', () => {
    const startTime = '2023-10-01T12:00:00'
    const endTime = '2023-10-01T15:00:00'

    expect(formatTimeRangeToDisplay(startTime, endTime)).toBe('3 uren')
  })
  it('should format minutes only time difference correctly', () => {
    const startTime = '2023-10-01T12:00:00'
    const endTime = '2023-10-01T12:45:00'

    expect(formatTimeRangeToDisplay(startTime, endTime)).toBe('45 minuten')
  })
  it('should handle undefined values', () => {
    expect(
      formatTimeRangeToDisplay(
        undefined as unknown as string,
        undefined as unknown as string,
      ),
    ).toBe('0 minuten')
  })
  it('should format negative time range correctly', () => {
    const startTime = '2023-10-01T14:30:00'
    const endTime = '2023-10-01T12:00:00'

    expect(formatTimeRangeToDisplay(startTime, endTime)).toBe(
      '- 2 uren en 30 minuten',
    )
  })
  it('should format negative minutes only time difference correctly', () => {
    const startTime = '2023-10-01T13:00:00'
    const endTime = '2023-10-01T12:45:00'

    expect(formatTimeRangeToDisplay(startTime, endTime)).toBe('- 15 minuten')
  })
})
