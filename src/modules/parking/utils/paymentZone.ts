import {PaymentZone, PaymentZoneDay} from '@/modules/parking/types'
import {formatTimeToDisplay} from '@/utils/datetime/formatTimeToDisplay'
import {weekdayToNumber} from '@/utils/datetime/weekdayToNumber'

export const getPaymentZone = (
  paymentZones: PaymentZone[],
  paymentZoneId: string,
) => paymentZones.find(zone => zone.id === paymentZoneId)

export const getPaymentZoneDay = (
  paymentZone: PaymentZone,
  dayOfWeek: number,
) =>
  paymentZone?.days.find(day => weekdayToNumber(day.day_of_week) === dayOfWeek)

export const getPaymentZoneDayTimeSpan = (paymentZoneDay?: PaymentZoneDay) =>
  paymentZoneDay
    ? `${formatTimeToDisplay(paymentZoneDay.start_time)} - ${formatTimeToDisplay(paymentZoneDay.end_time, {includeHoursLabel: true, replaceMidnightBy24: true})}`
    : undefined

export const areAllPaymentZonesEqual = (
  paymentZones: PaymentZone[],
  startTimeDayOfWeek: number,
) =>
  paymentZones.length === 1 ||
  paymentZones.every(
    zone =>
      getPaymentZoneDayTimeSpan(getPaymentZoneDay(zone, startTimeDayOfWeek)) ===
      getPaymentZoneDayTimeSpan(
        getPaymentZoneDay(paymentZones[0], startTimeDayOfWeek),
      ),
  )
