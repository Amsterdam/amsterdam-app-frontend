import {dayjs} from '@/utils/datetime/dayjs'

export const getOpeningTimes = (openingTimes: number[][] | undefined) => {
  if (!openingTimes || !openingTimes.length) {
    return ''
  }

  const [start, end] = openingTimes[0]

  if (typeof start !== 'number' || typeof end !== 'number') {
    return ''
  }

  return `${dayjs(start * 1000).format('HH.mm')} tot ${dayjs(end * 1000).format('HH.mm')} uur, ${dayjs(end * 1000).format('DD MMMM')}`
}
