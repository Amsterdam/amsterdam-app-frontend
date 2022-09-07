import {cutAmountOfCharsFromString, formatDate} from '@/utils'

export const formatDateToDisplay = (date: string) => {
  const dateToDisplay = formatDate(date)
  const dateToDisplayWithoutYear = cutAmountOfCharsFromString({
    text: dateToDisplay,
    amount: 5,
    position: 'end',
  })

  return dateToDisplayWithoutYear
}
