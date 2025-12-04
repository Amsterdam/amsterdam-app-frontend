import {getTimeZones} from '@/modules/burning-guide/utils/getTimeZones'
import {dayjs} from '@/utils/datetime/dayjs'

describe('getTimeZones', () => {
  it('returns correct blocks for 2025-12-02T05:00:00', () => {
    const now = dayjs('2025-12-02T05:00:00')
    const zones = getTimeZones(now)

    expect(zones.map(z => z.label)).toEqual([
      'Dinsdag 04.00 uur',
      'Dinsdag 10.00 uur',
      'Dinsdag 16.00 uur',
      'Dinsdag 22.00 uur',
    ])
  })

  it('returns correct blocks for 2025-12-02T11:00:00', () => {
    const now = dayjs('2025-12-02T11:00:00')
    const zones = getTimeZones(now)

    expect(zones.map(z => z.label)).toEqual([
      'Dinsdag 10.00 uur',
      'Dinsdag 16.00 uur',
      'Dinsdag 22.00 uur',
      'Woensdag 04.00 uur',
    ])
  })

  it('returns correct blocks for 2025-12-02T17:00:00', () => {
    const now = dayjs('2025-12-02T17:00:00')
    const zones = getTimeZones(now)

    expect(zones.map(z => z.label)).toEqual([
      'Dinsdag 16.00 uur',
      'Dinsdag 22.00 uur',
      'Woensdag 04.00 uur',
      'Woensdag 10.00 uur',
    ])
  })

  it('returns correct blocks for 2025-12-02T23:00:00', () => {
    const now = dayjs('2025-12-02T23:00:00')
    const zones = getTimeZones(now)

    expect(zones.map(z => z.label)).toEqual([
      'Dinsdag 22.00 uur',
      'Woensdag 04.00 uur',
      'Woensdag 10.00 uur',
      'Woensdag 16.00 uur',
    ])
  })
})
