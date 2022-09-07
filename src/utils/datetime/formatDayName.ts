import {dayjs, Dayjs} from '@/utils/datetime/dayjs'
import {isTomorrow} from '@/utils/datetime/isTomorrow'

/**
 * Returns the name of a given day,
 * or the localized string for 'tomorrow'.
 */
export const formatDayName = (date: Dayjs, baseDate: Dayjs = dayjs()) =>
  isTomorrow(date, baseDate) ? 'morgen' : date.format('dddd')
