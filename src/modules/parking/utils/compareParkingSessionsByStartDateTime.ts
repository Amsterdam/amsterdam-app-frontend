import {ParkingSession, VisitorParkingSession} from '@/modules/parking/types'
import {dayjs} from '@/utils/datetime/dayjs'

export const compareParkingSessionsByStartDateTime = (
  a: ParkingSession | VisitorParkingSession,
  b: ParkingSession | VisitorParkingSession,
) =>
  a.start_date_time === b.start_date_time
    ? 0
    : dayjs(a.start_date_time).isBefore(dayjs(b.start_date_time))
      ? -1
      : 1
