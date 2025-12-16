import {type Dayjs, dayjs} from '@/utils/datetime/dayjs'

/**
 * Converts string to date
 */
export const formatDate = (
  date: string | number | Dayjs | null | undefined,
) => {
  if (!date) {
    return ''
  }

  return dayjs(date).format('D MMMM YYYY')
}
