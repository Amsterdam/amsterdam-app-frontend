import {formatTimeDurationToDisplay} from '@/utils/datetime/formatTimeDurationToDisplay'

export const getParkingTimeForMoneyBalance = (
  moneyBalance: number,
  parkingRate: number,
) => formatTimeDurationToDisplay(moneyBalance / parkingRate, 'hours')
