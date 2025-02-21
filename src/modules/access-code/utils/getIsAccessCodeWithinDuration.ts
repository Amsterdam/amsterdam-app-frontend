import {dayjs} from '@/utils/datetime/dayjs'

export const getIsAccessCodeWithinDuration = (timestamp?: number) => {
  const codeValidDurationInMinutes = 5
  const msToMinutes = 1000 * 60

  if (!timestamp) {
    return false
  }

  return (
    Math.abs(dayjs(Date.now()).diff(dayjs(timestamp))) <=
    codeValidDurationInMinutes * msToMinutes
  )
}
