import {PaymentZone} from '@/modules/parking/types'
import {weekdayToNumber, WeekdayNumber} from '@/utils/datetime/weekdayToNumber'

export const getFreeParkingDays = (paymentZone: PaymentZone) => {
  const paymentDays = paymentZone.days
    .map(item => weekdayToNumber(item.day_of_week))
    .filter(day => typeof day === 'number')

  return ([0, 1, 2, 3, 4, 5, 6] as WeekdayNumber[]).filter(
    day => !paymentDays.includes(day),
  )
}
