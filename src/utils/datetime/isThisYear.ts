import {Dayjs, dayjs} from '@/utils/datetime/dayjs'

export const isThisYear = (date: string | number | Dayjs): boolean =>
  dayjs(date).isSame(dayjs(), 'year')
