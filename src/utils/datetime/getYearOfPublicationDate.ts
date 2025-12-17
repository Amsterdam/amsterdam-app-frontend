import {dayjs} from '@/utils/datetime/dayjs'

export const getYearOfPublicationDate = (date: string | number) => {
  if (!date) {
    return ''
  }

  return dayjs(date).format('YYYY')
}
