import {capitalizeString} from '@/utils/capitalizeString'
import {type Dayjs} from '@/utils/datetime/dayjs'

type TimeZone = {
  label: string
  start: Dayjs
}

const BLOCK_HOURS = [4, 10, 16, 22]

export const getTimeZones = (now: Dayjs): TimeZone[] => {
  // Find the nearest block hour <= now
  const rounded = now.startOf('hour')
  let blockHour = BLOCK_HOURS[0]

  for (let i = BLOCK_HOURS.length - 1; i >= 0; i--) {
    const candidate = now.startOf('day').hour(BLOCK_HOURS[i])

    if (rounded.isSame(candidate) || rounded.isAfter(candidate)) {
      blockHour = BLOCK_HOURS[i]
      break
    }
  }

  // If now is before 4:00, use yesterday 22:00
  let blockStart = now.startOf('day').hour(blockHour)

  if (blockHour === 4 && rounded.isBefore(now.startOf('day').hour(4))) {
    blockStart = now.subtract(1, 'day').startOf('day').hour(22)
  }

  // Build 4 blocks: nearest hour, +6h, +12h, +18h
  const blocks: TimeZone[] = []

  let start = blockStart

  for (let i = 0; i < 4; i++) {
    const end = start.add(6, 'hour')
    const label = `${start.format('dddd')} ${start.format('HH.mm')} uur`

    blocks.push({label: capitalizeString(label), start})
    start = end
  }

  return blocks
}
