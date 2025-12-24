import {ConfigType} from 'dayjs'
import {dayjs} from '@/utils/datetime/dayjs'

export const getPreviousYear = (date: ConfigType) =>
  dayjs(date).subtract(1, 'year').add(1, 'day')
