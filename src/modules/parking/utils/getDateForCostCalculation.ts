import {type Dayjs} from '@/utils/datetime/dayjs'

type Params = {
  endTime?: Dayjs
  now: Dayjs
  originalEndTime?: Dayjs
}

export const getDateForCostCalculation = ({
  endTime,
  originalEndTime,
  now,
}: Params) => {
  const diffMs =
    endTime && originalEndTime ? endTime.diff(originalEndTime) : null
  const isEndTimeBeforeOriginal = diffMs !== null && diffMs < 0
  const newDate = diffMs !== null ? now.add(Math.abs(diffMs), 'ms') : null
  const endDate = newDate ?? endTime

  return {diffMs, isEndTimeBeforeOriginal, newDate, endDate}
}
