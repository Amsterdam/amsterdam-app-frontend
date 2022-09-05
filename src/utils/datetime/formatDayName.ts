import dayjs, {Dayjs} from 'dayjs'
import {isTomorrow} from '@/utils/datetime/isTomorrow'

dayjs.locale('nl')

/**
 * Returns the name of a given day,
 * or the localized string for 'tomorrow'.
 */
export const formatDayName = (date: Dayjs, baseDate: Dayjs = dayjs()) =>
  isTomorrow(date, baseDate) ? 'morgen' : date.format('dddd')
