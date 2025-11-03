import {skipToken} from '@reduxjs/toolkit/query'
import {Dayjs} from 'dayjs'
import {useMemo} from 'react'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {
  useAccountDetailsQuery,
  useZoneByMachineQuery,
} from '@/modules/parking/service'
import {getRemainingTimeBalance} from '@/modules/parking/utils/getRemainingTimeBalance'
import {getPaymentZone} from '@/modules/parking/utils/paymentZone'

export const useGetRemainingBalance = (
  startTime?: Dayjs,
  endTime?: Dayjs,
  parkingMachineId?: string,
  paymentZoneId?: string,
  cost?: number,
) => {
  const currentPermit = useCurrentParkingPermit()
  const {data: parkingAccount} = useAccountDetailsQuery()
  const {data: parkingMachine} = useZoneByMachineQuery(
    parkingMachineId
      ? {machineId: parkingMachineId, report_code: currentPermit?.report_code}
      : skipToken,
  )
  const paymentZone = useMemo(() => {
    if (!paymentZoneId) {
      return
    }

    return getPaymentZone(currentPermit.payment_zones, paymentZoneId)
  }, [currentPermit.payment_zones, paymentZoneId])

  const remainingTimeBalance = useMemo(
    () =>
      getRemainingTimeBalance(
        currentPermit.time_balance,
        startTime,
        endTime,
        paymentZone ?? parkingMachine,
      ),
    [
      currentPermit.time_balance,
      endTime,
      parkingMachine,
      paymentZone,
      startTime,
    ],
  )

  const remainingWalletBalance = useMemo(
    () =>
      cost && typeof parkingAccount?.wallet?.balance === 'number'
        ? parkingAccount?.wallet?.balance - cost
        : parkingAccount?.wallet?.balance,
    [cost, parkingAccount?.wallet?.balance],
  )

  return {remainingTimeBalance, remainingWalletBalance}
}
