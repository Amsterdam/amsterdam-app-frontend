import dayjs from 'dayjs'
import {PaymentZone} from '@/modules/parking/types'
import {getParkingMachineDetailsLabel} from '@/modules/parking/utils/paymentZone'

describe('getParkingMachineDetailsLabel', () => {
  const baseZone: PaymentZone = {
    id: 'zone1',
    days: [
      {day_of_week: 'maandag', start_time: '08:00', end_time: '18:00'},
      {day_of_week: 'dinsdag', start_time: '09:00', end_time: '17:00'},
    ],
    city: 'TestCity',
    description: 'Test zone',
    hourly_rate: '€6,00',
  }

  it('returns correct label with time and rate', () => {
    const label = getParkingMachineDetailsLabel(baseZone, dayjs().day(1)) // maandag

    expect(label).toBe('08.00 - 18.00 uur, €6,00 per uur')
  })

  it('returns correct label with only time if no rate', () => {
    const zone = {...baseZone, hourly_rate: undefined}
    const label = getParkingMachineDetailsLabel(zone, dayjs().day(2)) // dinsdag

    expect(label).toBe('09.00 - 17.00 uur')
  })

  it('returns correct label with only rate if no time', () => {
    const zone = {...baseZone, days: []}
    const label = getParkingMachineDetailsLabel(zone, dayjs().day(1))

    expect(label).toBe('€6,00 per uur')
  })

  it('returns empty string if no zone', () => {
    const label = getParkingMachineDetailsLabel(undefined, dayjs().day(1))

    expect(label).toBe('')
  })

  it('returns empty string if no time and no rate', () => {
    const zone = {...baseZone, days: [], hourly_rate: undefined}
    const label = getParkingMachineDetailsLabel(zone, dayjs().day(1))

    expect(label).toBe('')
  })
})
