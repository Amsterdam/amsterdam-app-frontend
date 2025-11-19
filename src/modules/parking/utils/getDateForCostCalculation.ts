import {type Dayjs} from '@/utils/datetime/dayjs'

type Params = {
  endTime?: Dayjs
  now: Dayjs
  originalEndTime?: Dayjs
  startTime?: Dayjs
}

export const getDateForCostCalculation = ({
  endTime,
  originalEndTime,
  startTime,
  now,
}: Params) => {
  const isEndTimeBeforeOriginal =
    originalEndTime && endTime ? endTime.isBefore(originalEndTime) : false
  const newEndTime = endTime?.isBefore(now) ? now : endTime
  const newStartTime =
    originalEndTime ?? (startTime?.isBefore(now) ? now : startTime)

  const isNewEndTimeBeforeNewStartTime = newEndTime?.isBefore(newStartTime)
  const calculatedEndTime = isNewEndTimeBeforeNewStartTime
    ? newStartTime
    : newEndTime
  const calculatedStartTime = isNewEndTimeBeforeNewStartTime
    ? newEndTime
    : newStartTime

  return {
    isEndTimeBeforeOriginal,
    calculatedEndTime,
    calculatedStartTime,
  }
}
