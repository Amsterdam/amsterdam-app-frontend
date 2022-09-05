import {HoursAndMinutes} from '_modules/contact/types'
import dayjs, {Dayjs} from 'dayjs'

dayjs.locale('nl')

/**
 * Applies the given hours and minutes to a date
 * and resets seconds and milliseconds to zero.
 */
export const adjustHoursAndMinutes = (
  date: Dayjs,
  {hours, minutes}: HoursAndMinutes,
) => date.startOf('minute').hour(hours).minute(minutes)
