import {WasteType} from '@/modules/waste-guide/types'
import {capitalizeString} from '@/utils/capitalizeString'
import {dayjs} from '@/utils/datetime/dayjs'

export const getNextCollectionDate = (fraction: WasteType) =>
  fraction.next_date
    ? capitalizeString(dayjs(fraction.next_date).format('dddd D MMMM'))
    : ''
