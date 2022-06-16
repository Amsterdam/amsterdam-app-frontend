import {cutAmountOfCharsFromString} from '../cutAmountOfCharsFromString'
import {formatDate} from './formatDate'

export const formatDateToDisplay = (date: string) => {
  const dateToDisplay = formatDate(date)
  const dateToDisplayWithoutYear = cutAmountOfCharsFromString({
    text: dateToDisplay,
    amount: 5,
    position: 'end',
  })
  return dateToDisplayWithoutYear
}
