import type {Dayjs} from 'dayjs'
import {PaymentZone, PaymentZoneDay} from '@/modules/parking/types'
import {formatTimeToDisplay} from '@/utils/datetime/formatTimeToDisplay'
import {
  type WeekdayNumber,
  weekdayToNumber,
} from '@/utils/datetime/weekdayToNumber'

export const getPaymentZone = (
  paymentZones: PaymentZone[],
  paymentZoneId: string,
) => paymentZones.find(zone => zone.id === paymentZoneId)

export const getPaymentZoneDay = (
  paymentZone: PaymentZone,
  dayOfWeek: WeekdayNumber,
) =>
  paymentZone?.days.find(day => weekdayToNumber(day.day_of_week) === dayOfWeek)

export const getPaymentZoneDayTimeSpan = (paymentZoneDay?: PaymentZoneDay) =>
  paymentZoneDay
    ? `${formatTimeToDisplay(paymentZoneDay.start_time)} - ${formatTimeToDisplay(paymentZoneDay.end_time, {includeHoursLabel: true, replaceMidnightBy24: true})}`
    : undefined

export const areAllPaymentZonesEqualOnDayOfWeek = (
  paymentZones: PaymentZone[],
  startTimeDayOfWeek: WeekdayNumber,
) =>
  paymentZones.length === 1 ||
  paymentZones.every(
    zone =>
      getPaymentZoneDayTimeSpan(getPaymentZoneDay(zone, startTimeDayOfWeek)) ===
      getPaymentZoneDayTimeSpan(
        paymentZones[0] &&
          getPaymentZoneDay(paymentZones[0], startTimeDayOfWeek),
      ),
  )

export const areAllPaymentZonesEqual = (paymentZones: PaymentZone[]) =>
  ([0, 1, 2, 3, 4, 5, 6] as WeekdayNumber[]).every(dayOfWeek =>
    areAllPaymentZonesEqualOnDayOfWeek(paymentZones, dayOfWeek),
  )

export const getParkingMachineDetailsLabel = (
  parkingMachineDetails: PaymentZone | undefined,
  startTime: Dayjs,
) => {
  const startTimeDayOfWeek = startTime.day()

  const startTimePaymentZoneDay = parkingMachineDetails
    ? getPaymentZoneDay(parkingMachineDetails, startTimeDayOfWeek)
    : undefined

  const timeString = startTimePaymentZoneDay
    ? getPaymentZoneDayTimeSpan(startTimePaymentZoneDay)
    : undefined

  return `${timeString ?? ''}${
    parkingMachineDetails?.hourly_rate
      ? `${timeString ? ', ' : ''}${parkingMachineDetails.hourly_rate} per uur`
      : ''
  }`
}
