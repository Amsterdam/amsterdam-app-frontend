import {dayjs} from '@/utils'

export const getDateDiffInDays = (date: string) => {
  return dayjs().diff(dayjs(date), 'day')
}
