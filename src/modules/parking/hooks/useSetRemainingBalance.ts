import {skipToken} from '@reduxjs/toolkit/query'
import {Dayjs} from 'dayjs'
import {useEffect, useMemo} from 'react'
import type {PaymentZone} from '@/modules/parking/types'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {
  useAccountDetailsQuery,
  useZoneByMachineQuery,
} from '@/modules/parking/service'
import {
  selectRemainingTimeBalance,
  selectRemainingWalletBalance,
  setRemainingTimeBalance,
  setRemainingWalletBalance,
} from '@/modules/parking/slice'
import {
  getPaymentZone,
  getPaymentZoneDay,
} from '@/modules/parking/utils/paymentZone'

export const useSetRemainingBalance = (
  startTime?: Dayjs,
  endTime?: Dayjs,
  parkingMachineId?: string,
  paymentZoneId?: string,
  cost?: number,
) => {
  const dispatch = useDispatch()
  const currentPermit = useCurrentParkingPermit()
  const {data: parkingAccount} = useAccountDetailsQuery()
  const {data: parkingMachine} = useZoneByMachineQuery(
    parkingMachineId
      ? {machineId: parkingMachineId, permitId: currentPermit?.report_code}
      : skipToken,
  )
  const remainingTimeBalance = useSelector(selectRemainingTimeBalance)
  const remainingWalletBalance = useSelector(selectRemainingWalletBalance)
  const paymentZone = useMemo(() => {
    if (!paymentZoneId) {
      return
    }

    return getPaymentZone(currentPermit.payment_zones, paymentZoneId)
  }, [currentPermit.payment_zones, paymentZoneId])

  useEffect(() => {
    if (parkingAccount?.wallet?.balance === undefined) {
      return
    }

    if (cost === undefined) {
      dispatch(setRemainingWalletBalance(parkingAccount?.wallet?.balance))

      return
    }

    dispatch(setRemainingWalletBalance(parkingAccount?.wallet?.balance - cost))
  }, [dispatch, parkingAccount?.wallet?.balance, cost])

  useEffect(() => {
    if (currentPermit?.time_balance === undefined) {
      return
    }

    if (startTime && endTime && (paymentZone || parkingMachine)) {
      const zone = paymentZone ?? (parkingMachine as PaymentZone)
      // Get the weekday number for the start time
      const weekday = startTime.day()
      // Find the PaymentZoneDay for this weekday
      const paymentZoneDay = getPaymentZoneDay(zone, weekday)

      if (!paymentZoneDay) {
        return
      }

      // Calculate the allowed interval for parking on this day
      const [startHour, startMinute] = paymentZoneDay.start_time
        .split(':')
        .map(Number)
      const [endHour, endMinute] = paymentZoneDay.end_time
        .split(':')
        .map(Number)
      const allowedStart = startTime
        .clone()
        .hour(startHour)
        .minute(startMinute)
        .second(0)
      const allowedEnd = startTime
        .clone()
        .hour(endHour)
        .minute(endMinute)
        .second(0)

      // Clamp the session to the allowed interval
      const sessionStart = startTime.isAfter(allowedStart)
        ? startTime
        : allowedStart
      const sessionEnd = endTime.isBefore(allowedEnd) ? endTime : allowedEnd

      const durationSeconds = Math.max(
        sessionEnd.diff(sessionStart, 'second'),
        0,
      )
      const remaining = currentPermit.time_balance - durationSeconds

      dispatch(setRemainingTimeBalance(remaining))

      return
    }

    dispatch(setRemainingTimeBalance(currentPermit.time_balance))
  }, [
    dispatch,
    startTime,
    endTime,
    currentPermit.time_balance,
    paymentZone,
    parkingMachine,
  ])

  return {remainingTimeBalance, remainingWalletBalance}
}
