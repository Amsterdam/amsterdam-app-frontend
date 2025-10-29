import type {
  ParkingHistorySession,
  ParkingSession,
  PaymentZone,
} from '@/modules/parking/types'
import {DAYS} from '@/types/datetime'
import {dayjs} from '@/utils/datetime/dayjs'
import {formatNumber} from '@/utils/formatNumber'

/**
 * Calculates the chargeable hours within a parking session that is used to divide the total parking costs to arrive at a cost per hour, formatted with inclusion of currency.
 * @param parkingSession - The parking session, which should include at least parking_cost.value and parking_cost.currency, a start_date_time, and an end_date_time.
 * @param paymentZone - The payment zone tha holds info on paid days and hours.
 * @returns A string representation of costs per hour, including currency, if any costs are involved. Otherwise returns undefined.
 */
export const getHourlyParkingRateFromSessionAndZoneData = (
  parkingSession: Pick<
    ParkingSession | ParkingHistorySession,
    'parking_cost' | 'start_date_time' | 'end_date_time'
  >,
  paymentZone: PaymentZone,
) => {
  const chargeableHours = getChargeableParkingHoursFromSessionAndZone(
    parkingSession,
    paymentZone,
  )

  if (!parkingSession.parking_cost.value) {
    return
  }

  return formatNumber(
    parkingSession.parking_cost.value / chargeableHours,
    parkingSession.parking_cost.currency,
  )
}

/**
 * Calculates the chargeable hours within the total duration of the parking session, using the payment zone time windows.
 * @param parkingSession - The parking session, which should include at least parking_cost.value and parking_cost.currency, a start_date_time, and an end_date_time.
 * @param paymentZone - The payment zone tha holds info on paid days and hours.
 * @returns Total chargeable hours as a floating point number
 */
export const getChargeableParkingHoursFromSessionAndZone = (
  parkingSession: Pick<
    ParkingSession | ParkingHistorySession,
    'parking_cost' | 'start_date_time' | 'end_date_time'
  >,
  paymentZone: PaymentZone,
) => {
  const startSession = dayjs(parkingSession.start_date_time)
  const endSession = dayjs(parkingSession.end_date_time)
  let totalMinutes = 0

  let currentDay = startSession.startOf('day')

  while (
    currentDay.isBefore(endSession, 'day') ||
    currentDay.isSame(endSession, 'day')
  ) {
    const dayOfWeek = currentDay.day()
    const dayName = DAYS[dayOfWeek]

    const zoneDay = paymentZone.days.find(d => d.day_of_week === dayName)

    if (zoneDay) {
      const [startHour, startMinute] = zoneDay.start_time.split(':').map(Number)
      const [endHour, endMinute] = zoneDay.end_time.split(':').map(Number)

      const paidStart = currentDay
        .hour(startHour - 1)
        .minute(startMinute)
        .second(0)

      const paidEnd = currentDay
        .hour(endHour - 1)
        .minute(endMinute)
        .second(0)

      const dayStart = paidStart.isAfter(startSession)
        ? paidStart
        : startSession

      const dayEnd = paidEnd.isBefore(endSession) ? paidEnd : endSession

      if (dayEnd.isAfter(dayStart)) {
        totalMinutes += dayEnd.diff(dayStart, 'minute')
      }
    }

    currentDay = currentDay.add(1, 'day')
  }

  return totalMinutes / 60
}
