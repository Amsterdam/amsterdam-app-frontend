import {type ManipulateType} from 'dayjs'
import {dayjs} from '@/utils/datetime/dayjs'
import {
  formatTimeRangeToDisplay,
  Options,
} from '@/utils/datetime/formatTimeRangeToDisplay'

export const formatTimeDurationToDisplay = (
  value: number,
  unit: ManipulateType,
  options?: Options,
) => {
  const now = dayjs()

  return formatTimeRangeToDisplay(now, now.add(value, unit), options)
}
