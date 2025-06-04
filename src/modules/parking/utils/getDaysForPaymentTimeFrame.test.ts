import {type PaymentZone} from '@/modules/parking/types'
import {getDaysForPaymentTimeFrame} from '@/modules/parking/utils/getDaysForPaymentTimeFrame'
import {weekDayMapping} from '@/utils/datetime/weekdayToNumber'

describe('getDaysForPaymentTimeFrame', () => {
  it('groups days correctly per time span', () => {
    const paymentZone: PaymentZone = {
      city: 'Amsterdam',
      description: 'Test zone',
      id: 'zone1',
      days: [
        {day_of_week: 'maandag', start_time: '09:00', end_time: '18:00'},
        {day_of_week: 'dinsdag', start_time: '09:00', end_time: '18:00'},
        {day_of_week: 'woensdag', start_time: '10:00', end_time: '17:00'},
      ],
    }
    const result = getDaysForPaymentTimeFrame(paymentZone)

    expect(result).toEqual({
      '09.00 - 18.00 uur': [weekDayMapping.maandag, weekDayMapping.dinsdag],
      '10.00 - 17.00 uur': [weekDayMapping.woensdag],
    })
  })

  it('skips days without valid time span or weekday', () => {
    const paymentZone: PaymentZone = {
      city: 'Amsterdam',
      description: 'Test zone',
      id: 'zone2',
      days: [
        {day_of_week: 'zondag', start_time: '', end_time: ''}, // no time span
        {day_of_week: 'onbekend', start_time: '09:00', end_time: '18:00'}, // invalid weekday
      ],
    }
    const result = getDaysForPaymentTimeFrame(paymentZone)

    expect(result).toEqual({'00.00 - 24.00 uur': [weekDayMapping.zondag]})
  })

  it('returns an empty object if there are no days', () => {
    const paymentZone: PaymentZone = {
      city: 'Amsterdam',
      description: 'Test zone',
      id: 'zone3',
      days: [],
    }
    const result = getDaysForPaymentTimeFrame(paymentZone)

    expect(result).toEqual({})
  })
})
