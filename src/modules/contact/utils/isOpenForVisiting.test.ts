import {isOpenForVisiting} from '@/modules/contact/utils/isOpenForVisiting'
import {
  day,
  exceptionDates,
  visitingHours,
} from '@/modules/contact/utils/visitingHours.mock'
import {dayjs} from '@/utils/datetime/dayjs'

describe('isOpenForVisiting', () => {
  it('handles a Monday before opening time', () => {
    expect(
      isOpenForVisiting(
        visitingHours,
        exceptionDates,
        dayjs(`${day.monday}T08:59:59.000`),
      ),
    ).toEqual(false)
  })
  it('handles a Monday during opening time', () => {
    expect(
      isOpenForVisiting(
        visitingHours,
        exceptionDates,
        dayjs(`${day.monday}T09:00:00.000`),
      ),
    ).toEqual(true)
  })
  it('handles a Monday after opening time', () => {
    expect(
      isOpenForVisiting(
        visitingHours,
        exceptionDates,
        dayjs(`${day.monday}T17:00:00.000`),
      ),
    ).toEqual(false)
  })
  it('handles a Thursday during opening time', () => {
    expect(
      isOpenForVisiting(
        visitingHours,
        exceptionDates,
        dayjs(`${day.thursday}T17:00:00.000`),
      ),
    ).toEqual(true)
  })
  it('handles a Thursday after opening time', () => {
    expect(
      isOpenForVisiting(
        visitingHours,
        exceptionDates,
        dayjs(`${day.thursday}T20:00:00.000`),
      ),
    ).toEqual(false)
  })
  it('handles a Friday during opening time', () => {
    expect(
      isOpenForVisiting(
        visitingHours,
        exceptionDates,
        dayjs(`${day.thursday}T16:30:00.000`),
      ),
    ).toEqual(true)
  })
  it('handles a Saturday during a week day’s opening time', () => {
    expect(
      isOpenForVisiting(
        visitingHours,
        exceptionDates,
        dayjs(`${day.saturday}T09:00:00.000`),
      ),
    ).toEqual(false)
  })
  it('handles a exception date during regular opening time', () => {
    expect(
      isOpenForVisiting(
        visitingHours,
        exceptionDates,
        dayjs(`${day.christmasDay}T11:00:00.000`),
      ),
    ).toEqual(false)
  })
  it('handles a exception date with special opening times during opening time', () => {
    expect(
      isOpenForVisiting(
        visitingHours,
        exceptionDates,
        dayjs(`${day.sinterklaas}T11:00:00.000`),
      ),
    ).toEqual(true)
  })
  it('handles a exception date with special opening times during regular opening time but outside special opening time', () => {
    expect(
      isOpenForVisiting(
        visitingHours,
        exceptionDates,
        dayjs(`${day.sinterklaas}T16:30:00.000`),
      ),
    ).toEqual(false)
  })
})
