import {PaymentZone} from '@/modules/parking/types'
import {getPaymentZoneDayTimeSpan} from '@/modules/parking/utils/paymentZone'
import {WeekdayNumber, weekdayToNumber} from '@/utils/datetime/weekdayToNumber'

export const getDaysForPaymentTimeFrame = (paymentZone: PaymentZone) =>
  paymentZone.days.reduce<Record<string, Array<WeekdayNumber>>>((acc, item) => {
    const timeSpan = getPaymentZoneDayTimeSpan(item)
    const weekdayNumber = weekdayToNumber(item.day_of_week)

    if (typeof weekdayNumber !== 'number' || !timeSpan) {
      return acc
    }

    return {
      ...acc,
      [timeSpan]: [...(acc[timeSpan] ?? []), weekdayNumber],
    }
  }, {})
