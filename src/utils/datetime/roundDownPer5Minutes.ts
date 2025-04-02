import {dayjs, Dayjs} from '@/utils/datetime/dayjs'

export const roundDownPer5Minutes = (date: Dayjs = dayjs()): Dayjs =>
  date
    .subtract(date.minute() % 5, 'minute')
    .second(0)
    .millisecond(0)
