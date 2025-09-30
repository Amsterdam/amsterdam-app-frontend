import {dayjsFromUnix} from '@/utils/datetime/dayjs'

export const getOpeningTimes = (openingTimes: number[][] | undefined) => {
  if (!openingTimes || !openingTimes.length) {
    return ''
  }

  const [start, end] = openingTimes[0]

  if (typeof start !== 'number' || typeof end !== 'number') {
    return ''
  }

  const startDate = dayjsFromUnix(start)
  const endDate = dayjsFromUnix(end)

  return `${startDate.format('HH.mm')} tot ${endDate.format('HH.mm')} uur`
}
