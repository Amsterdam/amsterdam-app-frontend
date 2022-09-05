import {dayjs} from '@/utils/datetime/dayjs'

export const getDateDiffInDays = (date: string) => {
  return dayjs().diff(dayjs(date), 'day')
}
