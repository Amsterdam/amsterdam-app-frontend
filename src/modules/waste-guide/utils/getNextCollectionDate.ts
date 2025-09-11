import {WasteType} from '@/modules/waste-guide/types'
import {capitalizeString} from '@/utils/capitalizeString'
import {dayjs} from '@/utils/datetime/dayjs'

export const getNextCollectionDate = (fraction: WasteType) =>
  fraction.next_date
    ? capitalizeString(
        dayjs(fraction.next_date).locale('nl').format('dddd D MMMM'),
      )
    : ''
