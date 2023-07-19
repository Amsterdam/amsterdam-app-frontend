import {cutAmountOfCharsFromString} from '@/utils/cutAmountOfCharsFromString'
import {formatDate} from '@/utils/datetime/formatDate'

export const formatDateToDisplay = (date: string) => {
  const dateToDisplay = formatDate(date)

  return cutAmountOfCharsFromString({
    text: dateToDisplay,
    amount: 5,
    position: 'end',
  })
}
