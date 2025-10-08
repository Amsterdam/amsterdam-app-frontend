import {dayjs} from '@/utils/datetime/dayjs'

export const compareParkingSessionsByStartDateTime = <
  T extends {start_date_time: string},
>(
  a: T,
  b: T,
) =>
  a.start_date_time === b.start_date_time
    ? 0
    : dayjs(a.start_date_time).isBefore(dayjs(b.start_date_time))
      ? -1
      : 1
