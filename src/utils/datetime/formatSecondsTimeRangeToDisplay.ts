import {dayjs} from '@/utils/datetime/dayjs'
import {
  formatTimeRangeToDisplay,
  Options,
} from '@/utils/datetime/formatTimeRangeToDisplay'

export const formatSecondsTimeRangeToDisplay = (
  seconds?: number,
  options?: Options,
) => {
  const now = dayjs()

  return formatTimeRangeToDisplay(now, now.add(seconds ?? 0, 'second'), options)
}
