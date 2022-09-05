import {HoursAndMinutes} from '_modules/contact/types'
import {Dayjs} from '@/utils/datetime/dayjs'

/**
 * Applies the given hours and minutes to a date
 * and resets seconds and milliseconds to zero.
 */
export const adjustHoursAndMinutes = (
  date: Dayjs,
  {hours, minutes}: HoursAndMinutes,
) => date.startOf('minute').hour(hours).minute(minutes)
