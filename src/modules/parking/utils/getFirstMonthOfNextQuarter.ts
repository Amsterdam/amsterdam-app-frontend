import {dayjs} from '@/utils/datetime/dayjs'

export const getFirstMonthOfNextQuarter = () => {
  const now = dayjs()
  const month = now.month()

  if (month < 3) {
    return dayjs().month(3).startOf('month')
  }

  if (month < 6) {
    return dayjs().month(6).startOf('month')
  }

  if (month < 9) {
    return dayjs().month(9).startOf('month')
  }

  return dayjs().month(12).startOf('month')
}
