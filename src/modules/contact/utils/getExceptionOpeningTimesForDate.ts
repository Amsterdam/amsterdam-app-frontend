import {ExceptionDate} from '@/modules/contact/types'
import {dayjs, Dayjs} from '@/utils/datetime/dayjs'

export const getExceptionOpeningTimesForDate = (
  date: Dayjs,
  exceptionDates: ExceptionDate[],
) =>
  exceptionDates.find(exceptionDate =>
    date.isSame(dayjs(exceptionDate.date), 'day'),
  )
