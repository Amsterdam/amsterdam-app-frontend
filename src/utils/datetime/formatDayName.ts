import {dayjs, Dayjs, isTomorrow} from '@/utils'

/**
 * Returns the name of a given day,
 * or the localized string for 'tomorrow'.
 */
export const formatDayName = (date: Dayjs, baseDate: Dayjs = dayjs()) =>
  isTomorrow(date, baseDate) ? 'morgen' : date.format('dddd')
