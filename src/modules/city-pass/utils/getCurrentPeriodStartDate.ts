import {dayjs} from '@/utils/datetime/dayjs'

export const getCurrentPeriodStartDate = () =>
  dayjs().isBefore(dayjs(`${dayjs().year()}-07-01`))
    ? dayjs(`${dayjs().year() - 1}-08-01`)
    : dayjs(`${dayjs().year()}-08-01`)
