import {WasteType} from '@/modules/waste-guide/types'
import {capitalizeString} from '@/utils/capitalizeString'
import {dayjs} from '@/utils/datetime/dayjs'

export const getNextCollectionDate = (fraction: WasteType) => {
  const nextDate = dayjs(fraction.next_date)

  const getDateToDisplay = () => {
    if ((dayjs().isSame(nextDate), 'day')) {
      return 'vandaag'
    }

    if (dayjs().add(1, 'day').isSame(nextDate, 'day')) {
      return 'morgen'
    }

    return nextDate.format('dddd D MMMM')
  }

  const dateToDisplay = getDateToDisplay()

  return fraction.next_date ? capitalizeString(dateToDisplay) : ''
}
