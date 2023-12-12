import {shouldShowUpdateSuggestion} from './shouldShowUpdateSuggestion'

jest.useFakeTimers()

describe('shouldShowUpdateSuggestion', () => {
  it('should return true if lastSeenTimestamp is not provided', () => {
    const result = shouldShowUpdateSuggestion(4)

    expect(result).toBe(true)
  })

  it('should return true if past the snooze time', () => {
    const currentTimestamp = new Date('2023-12-12T12:00:00').getTime()
    const lastSeenTimestamp = currentTimestamp - 5 * 3600000 // 5 hours ago

    jest.setSystemTime(currentTimestamp)
    const result = shouldShowUpdateSuggestion(4, lastSeenTimestamp)

    expect(result).toBe(true)
  })

  it('should return false if within the snooze time', () => {
    const currentTimestamp = new Date('2023-12-12T12:00:00').getTime()
    const lastSeenTimestamp = currentTimestamp - 3 * 3600000 // 3 hours ago

    jest.setSystemTime(currentTimestamp)
    const result = shouldShowUpdateSuggestion(4, lastSeenTimestamp)

    expect(result).toBe(false)
  })

  afterEach(() => {
    jest.clearAllTimers()
  })
})
