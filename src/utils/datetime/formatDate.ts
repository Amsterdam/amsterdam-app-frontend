import dayjs from 'dayjs'
import 'dayjs/locale/nl'
dayjs.locale('nl')

/**
 * Converts string to date
 */
export const formatDate = (date: string | number) => {
  if (date === null || date === undefined) {
    return ''
  }
  return dayjs(date).format('D MMMM YYYY')
}
