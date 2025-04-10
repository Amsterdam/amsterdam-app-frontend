import {Dayjs, dayjs} from '@/utils/datetime/dayjs'

export const parseTimeToDayjs = (time: string, baseDate: Dayjs = dayjs()) =>
  dayjs(`${baseDate.toJSON().split('T')[0]}T${time}`)
