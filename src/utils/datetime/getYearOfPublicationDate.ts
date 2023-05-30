import {dayjs} from '@/utils/datetime/dayjs'

export const getYearOfPublicationDate = (date: string | number) => {
  if (date === null || date === undefined) {
    return ''
  }

  return dayjs(date).format('YYYY')
}
