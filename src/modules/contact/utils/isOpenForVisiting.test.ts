import {isOpenForVisiting} from './isOpenForVisiting'
import {day, visitingHours} from './visitingHours.mock'
import {dayjs} from '@/utils'

describe('isOpenForVisiting', () => {
  it('handles a Monday before opening time', () => {
    expect(
      isOpenForVisiting(visitingHours, dayjs(`${day.monday}T08:59:59.000`)),
    ).toEqual(false)
  })
  it('handles a Monday during opening time', () => {
    expect(
      isOpenForVisiting(visitingHours, dayjs(`${day.monday}T09:00:00.000`)),
    ).toEqual(true)
  })
  it('handles a Monday after opening time', () => {
    expect(
      isOpenForVisiting(visitingHours, dayjs(`${day.monday}T17:00:00.000`)),
    ).toEqual(false)
  })
  it('handles a Thursday during opening time', () => {
    expect(
      isOpenForVisiting(visitingHours, dayjs(`${day.thursday}T17:00:00.000`)),
    ).toEqual(true)
  })
  it('handles a Thursday after opening time', () => {
    expect(
      isOpenForVisiting(visitingHours, dayjs(`${day.thursday}T20:00:00.000`)),
    ).toEqual(false)
  })
  it('handles a Saturday during opening time', () => {
    expect(
      isOpenForVisiting(visitingHours, dayjs(`${day.saturday}T09:00:00.000`)),
    ).toEqual(false)
  })
})
