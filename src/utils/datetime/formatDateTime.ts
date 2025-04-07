import {type Dayjs, dayjs} from '@/utils/datetime/dayjs'

/**
 * Converts string to date
 */
export const formatDateTime = (date: string | number | Dayjs) => {
  if (date === null || date === undefined || date === '') {
    return ''
  }

  return dayjs(date).format('D MMMM YYYY HH.mm:ss')
}
