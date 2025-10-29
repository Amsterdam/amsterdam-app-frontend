import type {
  ParkingHistorySession,
  ParkingSession,
  PaymentZone,
} from '@/modules/parking/types'
import {dayjs} from '@/utils/datetime/dayjs'
import {weekDays} from '@/utils/datetime/weekDays'
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
  const startSession = dayjs.utc(parkingSession.start_date_time)
  const endSession = dayjs.utc(parkingSession.end_date_time)

  const totalDays =
    endSession.startOf('day').diff(startSession.startOf('day'), 'day') + 1 // always 1 day as minimum

  const totalChargeableMinutes = Array.from({length: totalDays}).reduce(
    (minutes: number, _, index) => {
      const currentDay = startSession.startOf('day').add(index, 'day')
      const dayName = weekDays[currentDay.day()]
      const zoneDay = paymentZone.days.find(
        d => d.day_of_week.toLowerCase() === dayName,
      )

      if (!zoneDay) {
        return minutes
      }

      const [startHour, startMinute] = zoneDay.start_time.split(':').map(Number)
      const [endHour, endMinute] = zoneDay.end_time.split(':').map(Number)

      const paidStart = currentDay.hour(startHour).minute(startMinute).second(0)
      const paidEnd = currentDay.hour(endHour).minute(endMinute).second(0)

      const dayStart = dayjs.max(paidStart, startSession)
      const dayEnd = dayjs.min(paidEnd, endSession)

      if (dayEnd.isAfter(dayStart)) {
        return minutes + dayEnd.diff(dayStart, 'minute')
      }

      return minutes
    },
    0,
  )

  return totalChargeableMinutes / 60
}
