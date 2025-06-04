import {PaymentZone} from '@/modules/parking/types'
import {getFreeParkingDays} from '@/modules/parking/utils/getFreeparkingDays'
import {weekDayMapping} from '@/utils/datetime/weekdayToNumber'

describe('getFreeParkingDays', () => {
  it('returns all days if there are no paid days', () => {
    const zone: PaymentZone = {
      city: 'Amsterdam',
      days: [],
      description: '',
      id: '1',
    }

    expect(getFreeParkingDays(zone)).toEqual([
      weekDayMapping.zondag,
      weekDayMapping.maandag,
      weekDayMapping.dinsdag,
      weekDayMapping.woensdag,
      weekDayMapping.donderdag,
      weekDayMapping.vrijdag,
      weekDayMapping.zaterdag,
    ])
  })

  it('returns only unpaid days', () => {
    const zone: PaymentZone = {
      city: 'Amsterdam',
      days: [
        {day_of_week: 'maandag', start_time: '09:00', end_time: '19:00'},
        {day_of_week: 'dinsdag', start_time: '09:00', end_time: '19:00'},
        {day_of_week: 'woensdag', start_time: '09:00', end_time: '19:00'},
      ],
      description: '',
      id: '2',
    }

    expect(getFreeParkingDays(zone)).toEqual([
      weekDayMapping.zondag,
      weekDayMapping.donderdag,
      weekDayMapping.vrijdag,
      weekDayMapping.zaterdag,
    ])
  })

  it('returns an empty array if all days are paid', () => {
    const zone: PaymentZone = {
      city: 'Amsterdam',
      days: [
        {day_of_week: 'maandag', start_time: '09:00', end_time: '19:00'},
        {day_of_week: 'dinsdag', start_time: '09:00', end_time: '19:00'},
        {day_of_week: 'woensdag', start_time: '09:00', end_time: '19:00'},
        {day_of_week: 'donderdag', start_time: '09:00', end_time: '19:00'},
        {day_of_week: 'vrijdag', start_time: '09:00', end_time: '19:00'},
        {day_of_week: 'zaterdag', start_time: '09:00', end_time: '19:00'},
        {day_of_week: 'zondag', start_time: '09:00', end_time: '19:00'},
      ],
      description: '',
      id: '3',
    }

    expect(getFreeParkingDays(zone)).toEqual([])
  })

  it('ignores invalid days', () => {
    const zone: PaymentZone = {
      city: 'Amsterdam',
      days: [
        {day_of_week: 'maandag', start_time: '09:00', end_time: '19:00'},
        {day_of_week: 'noday', start_time: '09:00', end_time: '19:00'},
      ],
      description: '',
      id: '4',
    }

    expect(getFreeParkingDays(zone)).toEqual([
      weekDayMapping.zondag,
      weekDayMapping.dinsdag,
      weekDayMapping.woensdag,
      weekDayMapping.donderdag,
      weekDayMapping.vrijdag,
      weekDayMapping.zaterdag,
    ])
  })
})
