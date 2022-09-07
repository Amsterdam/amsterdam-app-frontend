import {dayjs} from '@/utils'

/**
 * Converts string to date
 */
export const formatDate = (date: string | number) => {
  if (date === null || date === undefined) {
    return ''
  }

  return dayjs(date).format('D MMMM YYYY')
}
