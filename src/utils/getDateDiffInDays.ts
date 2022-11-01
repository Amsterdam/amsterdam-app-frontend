import {dayjs} from '@/utils/datetime/dayjs'

export const getDateDiffInDays = (date: string) =>
  dayjs().diff(dayjs(date), 'day')
