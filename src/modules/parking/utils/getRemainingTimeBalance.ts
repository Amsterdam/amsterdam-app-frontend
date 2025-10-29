import type {PaymentZone} from '@/modules/parking/types'
import type {Dayjs} from 'dayjs'
import {getPaymentZoneDay} from '@/modules/parking/utils/paymentZone'

export const getRemainingTimeBalance = (
  timeBalance: number | undefined,
  startTime: Dayjs | undefined,
  endTime: Dayjs | undefined,
  paymentZone: PaymentZone | undefined,
) => {
  let remainingTimeBalance = timeBalance

  if (timeBalance === undefined) {
    return
  }

  if (startTime && endTime && paymentZone) {
    // Get the weekday number for the start time
    const weekday = startTime.day()
    // Find the PaymentZoneDay for this weekday
    const paymentZoneDay = getPaymentZoneDay(paymentZone, weekday)

    if (!paymentZoneDay) {
      return
    }

    // Calculate the allowed interval for parking on this day
    const [startHour, startMinute] = paymentZoneDay.start_time
      .split(':')
      .map(Number)
    const [endHour, endMinute] = paymentZoneDay.end_time.split(':').map(Number)
    const allowedStart = startTime
      .clone()
      .hour(startHour)
      .minute(startMinute)
      .second(0)
    const allowedEnd = startTime
      .clone()
      .hour(endHour)
      .minute(endMinute)
      .second(0)

    // Clamp the session to the allowed interval
    const sessionStart = startTime.isAfter(allowedStart)
      ? startTime
      : allowedStart
    const sessionEnd = endTime.isBefore(allowedEnd) ? endTime : allowedEnd

    const durationSeconds = Math.max(sessionEnd.diff(sessionStart, 'second'), 0)
    const remaining = timeBalance - durationSeconds

    remainingTimeBalance = remaining
  }

  return remainingTimeBalance
}
