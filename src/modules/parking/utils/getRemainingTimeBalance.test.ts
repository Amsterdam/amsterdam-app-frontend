import {getRemainingTimeBalance} from '@/modules/parking/utils/getRemainingTimeBalance'
import {dayjs} from '@/utils/datetime/dayjs'

describe('getRemainingTimeBalance', () => {
  const paymentZone = {
    id: 'zone1',
    city: 'Amsterdam',
    description: 'Test zone',
    days: [
      {
        day_of_week: 'maandag',
        start_time: '09:00',
        end_time: '17:00',
      },
      {
        day_of_week: 'dinsdag',
        start_time: '09:00',
        end_time: '17:00',
      },
    ],
  }

  it('returns undefined if timeBalance is undefined', () => {
    expect(
      getRemainingTimeBalance(undefined, dayjs(), dayjs(), paymentZone, true),
    ).toBeUndefined()
  })

  it('returns timeBalance if startTime or endTime or paymentZone is missing', () => {
    expect(
      getRemainingTimeBalance(1000, undefined, dayjs(), paymentZone, true),
    ).toBe(1000)
    expect(
      getRemainingTimeBalance(1000, dayjs(), undefined, paymentZone, true),
    ).toBe(1000)
    expect(
      getRemainingTimeBalance(1000, dayjs(), dayjs(), undefined, true),
    ).toBe(1000)
  })

  it('returns correct remaining time when session is fully within allowed hours', () => {
    const start = dayjs('2023-10-30T10:00:00') // Monday
    const end = dayjs('2023-10-30T12:00:00')

    // 2 hours = 7200 seconds
    expect(getRemainingTimeBalance(10000, start, end, paymentZone, true)).toBe(
      10000 - 7200,
    )
  })

  it('clamps session start to allowed start', () => {
    const start = dayjs('2023-10-30T08:00:00') // before allowed start
    const end = dayjs('2023-10-30T10:00:00')

    // Only 1 hour (09:00-10:00) is allowed
    expect(getRemainingTimeBalance(10000, start, end, paymentZone, true)).toBe(
      10000 - 3600,
    )
  })

  it('clamps session end to allowed end', () => {
    const start = dayjs('2023-10-30T16:00:00')
    const end = dayjs('2023-10-30T18:00:00') // after allowed end

    // Only 1 hour (16:00-17:00) is allowed
    expect(getRemainingTimeBalance(10000, start, end, paymentZone, true)).toBe(
      10000 - 3600,
    )
  })

  it('returns timeBalance if session is completely outside allowed hours', () => {
    const start = dayjs('2023-10-30T07:00:00')
    const end = dayjs('2023-10-30T08:00:00')

    expect(getRemainingTimeBalance(10000, start, end, paymentZone, true)).toBe(
      10000,
    )
  })

  it('returns correct remaining time for different weekday', () => {
    const start = dayjs('2023-10-31T09:00:00') // Tuesday
    const end = dayjs('2023-10-31T11:00:00')

    expect(getRemainingTimeBalance(10000, start, end, paymentZone, true)).toBe(
      10000 - 7200,
    )
  })

  it('returns undefined if no PaymentZoneDay for the weekday', () => {
    const start = dayjs('2023-11-01T10:00:00') // Wednesday (not in paymentZone.days)
    const end = dayjs('2023-11-01T12:00:00')

    expect(
      getRemainingTimeBalance(10000, start, end, paymentZone, true),
    ).toBeUndefined()
  })

  it('returns correct remaining time when cannot select zone', () => {
    const start = dayjs('2023-10-30T10:00:00') // Monday
    const end = dayjs('2023-10-30T12:00:00')

    // 2 hours = 7200 seconds
    expect(getRemainingTimeBalance(10000, start, end, undefined, false)).toBe(
      10000 - 7200,
    )
  })
})
