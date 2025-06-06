import {cutAmountOfCharsFromString} from '@/utils/cutAmountOfCharsFromString'
import {Dayjs} from '@/utils/datetime/dayjs'
import {formatDate} from '@/utils/datetime/formatDate'
import {isThisYear} from '@/utils/datetime/isThisYear'
import {isToday} from '@/utils/datetime/isToday'

export const formatDateToDisplay = (
  date: string | Dayjs,
  todayAsDate = true,
) => {
  const dateToDisplay = formatDate(date)

  if (!todayAsDate && isToday(date)) {
    return 'Vandaag'
  }

  return isThisYear(date)
    ? cutAmountOfCharsFromString({
        text: dateToDisplay,
        amount: 5,
        position: 'end',
      })
    : dateToDisplay
}
