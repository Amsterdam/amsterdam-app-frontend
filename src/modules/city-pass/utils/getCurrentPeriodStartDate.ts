import {dayjs} from '@/utils/datetime/dayjs'

export const getCurrentPeriodStartDate = () => {
  const now = dayjs()
  const thisYear = now.year()

  return now.isBefore(dayjs(`${thisYear}-08-01`))
    ? dayjs(`${thisYear - 1}-08-01`)
    : dayjs(`${thisYear}-08-01`)
}
