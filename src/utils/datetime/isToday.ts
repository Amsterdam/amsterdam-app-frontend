import {Dayjs, dayjs} from '@/utils/datetime/dayjs'

export const isToday = (date: string | number | Dayjs): boolean =>
  dayjs(date).isSame(dayjs(), 'day')
