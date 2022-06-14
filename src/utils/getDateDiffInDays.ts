import dayjs from 'dayjs'

export const getDateDiffInDays = (date: string) => {
  return dayjs().diff(dayjs(date), 'day')
}
