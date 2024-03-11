import {couldShowNoInternetAlert} from './couldShowNoInternetAlert'

jest.useFakeTimers()

describe('couldShowNoInternetAlert', () => {
  it('should return true if lastSeenTimestamp is not provided', () => {
    expect(couldShowNoInternetAlert(4)).toBe(true)
    expect(couldShowNoInternetAlert(4, undefined)).toBe(true)
    expect(couldShowNoInternetAlert(4, null)).toBe(true)
  })

  it('should return true if past the snooze time', () => {
    const currentTimestamp = new Date('2023-12-12T12:00:00').getTime()
    const lastSeenTimestamp = currentTimestamp - 5 * 3600000 // 5 hours ago

    jest.setSystemTime(currentTimestamp)

    expect(couldShowNoInternetAlert(4, lastSeenTimestamp)).toBe(true)
  })

  it('should return false if within the snooze time', () => {
    const currentTimestamp = new Date('2023-12-12T12:00:00').getTime()
    const lastSeenTimestamp = currentTimestamp - 3 * 1000 // 3 seconds ago

    jest.setSystemTime(currentTimestamp)

    expect(couldShowNoInternetAlert(4, lastSeenTimestamp)).toBe(false)
  })

  afterEach(() => {
    jest.clearAllTimers()
  })
})
