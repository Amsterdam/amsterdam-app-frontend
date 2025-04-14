import {dayjs, Dayjs} from '@/utils/datetime/dayjs'

export const roundDownToMinutes = (date: Dayjs = dayjs()): Dayjs =>
  date.second(0).millisecond(0)
