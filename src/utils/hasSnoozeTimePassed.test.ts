import {
  hasSnoozeTimeInHoursPassed,
  hasSnoozeTimeInMillisecondsPassed,
  hasSnoozeTimeInSecondsPassed,
} from './hasSnoozeTimePassed'

jest.useFakeTimers()

describe('hasSnoozeTimeInMillisecondsPassed', () => {
  it('should return true if lastSeenTimestamp is not provided', () => {
    expect(hasSnoozeTimeInMillisecondsPassed(4)).toBe(true)
    expect(hasSnoozeTimeInMillisecondsPassed(4, undefined)).toBe(true)
    expect(hasSnoozeTimeInMillisecondsPassed(4, null)).toBe(true)
  })

  it('should return true if past the snooze time', () => {
    const currentTimestamp = new Date('2023-12-12T12:00:00').getTime()
    const lastSeenTimestamp = currentTimestamp - 5 // 5 milliseconds ago

    jest.setSystemTime(currentTimestamp)

    expect(hasSnoozeTimeInMillisecondsPassed(4, lastSeenTimestamp)).toBe(true)
  })

  it('should return false if within the snooze time', () => {
    const currentTimestamp = new Date('2023-12-12T12:00:00').getTime()
    const lastSeenTimestamp = currentTimestamp - 2 // 2 milliseconds ago

    jest.setSystemTime(currentTimestamp)

    expect(hasSnoozeTimeInMillisecondsPassed(4, lastSeenTimestamp)).toBe(false)
  })

  afterEach(() => {
    jest.clearAllTimers()
  })
})

jest.useFakeTimers()

describe('hasSnoozeTimeInSecondsPassed', () => {
  it('should return true if lastSeenTimestamp is not provided', () => {
    expect(hasSnoozeTimeInSecondsPassed(4)).toBe(true)
    expect(hasSnoozeTimeInSecondsPassed(4, undefined)).toBe(true)
    expect(hasSnoozeTimeInSecondsPassed(4, null)).toBe(true)
  })

  it('should return true if past the snooze time', () => {
    const currentTimestamp = new Date('2023-12-12T12:00:00').getTime()
    const lastSeenTimestamp = currentTimestamp - 5 * 1000 // 5 seconds ago

    jest.setSystemTime(currentTimestamp)

    expect(hasSnoozeTimeInSecondsPassed(4, lastSeenTimestamp)).toBe(true)
  })

  it('should return false if within the snooze time', () => {
    const currentTimestamp = new Date('2023-12-12T12:00:00').getTime()
    const lastSeenTimestamp = currentTimestamp - 2 * 1000 // 2 seconds ago

    jest.setSystemTime(currentTimestamp)

    expect(hasSnoozeTimeInSecondsPassed(4, lastSeenTimestamp)).toBe(false)
  })

  afterEach(() => {
    jest.clearAllTimers()
  })
})

jest.useFakeTimers()

describe('hasSnoozeTimeInHoursPassed', () => {
  it('should return true if lastSeenTimestamp is not provided', () => {
    expect(hasSnoozeTimeInHoursPassed(4)).toBe(true)
    expect(hasSnoozeTimeInHoursPassed(4, undefined)).toBe(true)
    expect(hasSnoozeTimeInHoursPassed(4, null)).toBe(true)
  })

  it('should return true if past the snooze time', () => {
    const currentTimestamp = new Date('2023-12-12T12:00:00').getTime()
    const lastSeenTimestamp = currentTimestamp - 5 * 3600000 // 5 hours ago

    jest.setSystemTime(currentTimestamp)

    expect(hasSnoozeTimeInHoursPassed(4, lastSeenTimestamp)).toBe(true)
  })

  it('should return false if within the snooze time', () => {
    const currentTimestamp = new Date('2023-12-12T12:00:00').getTime()
    const lastSeenTimestamp = currentTimestamp - 3 * 3600000 // 3 hours ago

    jest.setSystemTime(currentTimestamp)

    expect(hasSnoozeTimeInHoursPassed(4, lastSeenTimestamp)).toBe(false)
  })

  afterEach(() => {
    jest.clearAllTimers()
  })
})
