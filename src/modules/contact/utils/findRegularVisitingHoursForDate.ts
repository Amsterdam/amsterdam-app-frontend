import {Dayjs} from 'dayjs'
import {VisitingHour} from '@/modules/contact/types'

export const findRegularVisitingHoursForDate = (
  visitingHours: VisitingHour[],
  date: Dayjs,
) => visitingHours.find(({dayOfWeek}) => date.day() === dayOfWeek)
