import type {PaymentZone} from '@/modules/parking/types'
import {
  getChargeableParkingHoursFromSessionAndZone,
  getHourlyParkingRateFromSessionAndZoneData,
} from '@/modules/parking/utils/getHourlyParkingRateFromSessionAndZoneData'

const baseZone: PaymentZone = {
  city: 'Amsterdam',
  description: 'Test zone',
  id: 'zone1',
  days: [
    {day_of_week: 'Maandag', start_time: '09:00', end_time: '18:00'},
    {day_of_week: 'Dinsdag', start_time: '09:00', end_time: '18:00'},
    {day_of_week: 'Woensdag', start_time: '09:00', end_time: '18:00'},
  ],
}

describe('getChargeableParkingHoursFromSessionAndZone', () => {
  it.each([
    {
      name: 'session entirely inside paid hours (one day)',
      zone: baseZone,
      session: {
        start_date_time: '2025-10-27 10:00:00 UTC', // Monday
        end_date_time: '2025-10-27 12:30:00 UTC', // Monday
        parking_cost: {value: 1, currency: 'EUR'},
      },
      expectedHours: 2.5,
    },
    {
      name: 'session starts before paid hours',
      zone: baseZone,
      session: {
        start_date_time: '2025-10-27 07:00:00 UTC', // Monday
        end_date_time: '2025-10-27 10:00:00 UTC', // Monday
        parking_cost: {value: 1, currency: 'EUR'},
      },
      expectedHours: 1,
    },
    {
      name: 'session finishes after paid hours',
      zone: baseZone,
      session: {
        start_date_time: '2025-10-27 10:00:00 UTC', // Monday
        end_date_time: '2025-10-27 21:00:00 UTC', // Monday
        parking_cost: {value: 1, currency: 'EUR'},
      },
      expectedHours: 8,
    },
    {
      name: 'session starts before and ends after paid time span (one day)',
      zone: baseZone,
      session: {
        start_date_time: '2025-10-29 08:00:00 UTC', // Wednesday
        end_date_time: '2025-10-29 21:00:00 UTC', // Wednesday
        parking_cost: {value: 1, currency: 'EUR'},
      },
      expectedHours: 9,
    },
    {
      name: 'session spans multiple days within paid window',
      zone: baseZone,
      session: {
        start_date_time: '2025-10-27 10:00:00 UTC', // Monday
        end_date_time: '2025-10-29 21:00:00 UTC', // Wednesday
        parking_cost: {value: 1, currency: 'EUR'},
      },
      expectedHours: 26,
    },
    {
      name: 'session spans multiple days partially outside paid window',
      zone: baseZone,
      session: {
        start_date_time: '2025-10-25 10:00:00 UTC', // Saturday
        end_date_time: '2025-10-28 12:00:00 UTC', // Tuesday
        parking_cost: {value: 1, currency: 'EUR'},
      },
      expectedHours: 12,
    },
    {
      name: 'session spans multiple days fully outside paid window',
      zone: baseZone,
      session: {
        start_date_time: '2025-10-30 10:00:00 UTC', // Thursday
        end_date_time: '2025-11-02 12:00:00 UTC', // Sunday
        parking_cost: {value: 1, currency: 'EUR'},
      },
      expectedHours: 0,
    },
    {
      name: 'session spans two full weeks',
      zone: baseZone,
      session: {
        start_date_time: '2025-10-14 08:00:00 UTC', // Tuesday
        end_date_time: '2025-10-28 12:00:00 UTC', // Tuesday
        parking_cost: {value: 1, currency: 'EUR'},
      },
      expectedHours: 57,
    },
  ])(
    'should return correct hours when $name',
    ({zone, session, expectedHours}) => {
      const result = getChargeableParkingHoursFromSessionAndZone(session, zone)

      expect(result).toBe(expectedHours)
    },
  )
})

describe('getHourlyParkingRateFromSessionAndZoneData', () => {
  it.each([
    {
      name: 'session spans one hour within paid window',
      zone: baseZone,
      session: {
        start_date_time: '2025-10-27 09:00:00 UTC', // Monday
        end_date_time: '2025-10-27 10:00:00 UTC', // Monday
        parking_cost: {value: 5, currency: 'EUR'},
      },
      expectedAmount: '€ 5,00',
    },
    {
      name: 'session spans a full day within paid window',
      zone: baseZone,
      session: {
        start_date_time: '2025-10-27 09:00:00 UTC', // Monday
        end_date_time: '2025-10-27 21:00:00 UTC', // Monday
        parking_cost: {value: 90, currency: 'EUR'},
      },
      expectedAmount: '€ 10,00',
    },
    {
      name: 'session falls partially outside paid window',
      zone: baseZone,
      session: {
        start_date_time: '2025-10-27 16:00:00 UTC', // Monday
        end_date_time: '2025-10-27 21:00:00 UTC', // Monday
        parking_cost: {value: 20, currency: 'EUR'},
      },
      expectedAmount: '€ 10,00',
    },
    {
      name: 'session falls completely outside paid window',
      zone: baseZone,
      session: {
        start_date_time: '2025-10-31 16:00:00 UTC', // Friday
        end_date_time: '2025-10-31 21:00:00 UTC', // Friday
        parking_cost: {value: 0, currency: 'EUR'},
      },
      expectedAmount: undefined,
    },
  ])(
    'should return correct amount when $name',
    ({zone, session, expectedAmount}) => {
      const result = getHourlyParkingRateFromSessionAndZoneData(session, zone)

      expect(result?.replaceAll(/\s/g, ' ')).toBe(
        expectedAmount?.replaceAll(/\s/g, ' '),
      )
    },
  )
})
