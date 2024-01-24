import {shouldShowUpdateSuggestion} from './shouldShowUpdateSuggestion'

jest.useFakeTimers()

describe('shouldShowUpdateSuggestion', () => {
  it('should return true if lastSeenTimestamp is not provided', () => {
    expect(shouldShowUpdateSuggestion(4)).toBe(true)
    expect(shouldShowUpdateSuggestion(4, undefined)).toBe(true)
    expect(shouldShowUpdateSuggestion(4, null)).toBe(true)
  })

  it('should return true if past the snooze time', () => {
    const currentTimestamp = new Date('2023-12-12T12:00:00').getTime()
    const lastSeenTimestamp = currentTimestamp - 5 * 3600000 // 5 hours ago

    jest.setSystemTime(currentTimestamp)

    expect(shouldShowUpdateSuggestion(4, lastSeenTimestamp)).toBe(true)
  })

  it('should return false if within the snooze time', () => {
    const currentTimestamp = new Date('2023-12-12T12:00:00').getTime()
    const lastSeenTimestamp = currentTimestamp - 3 * 3600000 // 3 hours ago

    jest.setSystemTime(currentTimestamp)

    expect(shouldShowUpdateSuggestion(4, lastSeenTimestamp)).toBe(false)
  })

  afterEach(() => {
    jest.clearAllTimers()
  })
})
