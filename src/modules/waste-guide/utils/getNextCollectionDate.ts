import {WasteType} from '@/modules/waste-guide/types'
import {dayjs} from '@/utils/datetime/dayjs'
import {isToday} from '@/utils/datetime/isToday'
import {isTomorrow} from '@/utils/datetime/isTomorrow'
import {capitalizeString} from '@/utils/transform/capitalizeString'

export const getNextCollectionDate = (fraction: WasteType) => {
  const nextDate = dayjs(fraction.next_date)

  const getDateToDisplay = () => {
    if (isToday(fraction.next_date)) {
      return 'vandaag'
    }

    if (isTomorrow(nextDate)) {
      return 'morgen'
    }

    return nextDate.format('dddd D MMMM')
  }

  const dateToDisplay = getDateToDisplay()

  return fraction.next_date ? capitalizeString(dateToDisplay) : ''
}
