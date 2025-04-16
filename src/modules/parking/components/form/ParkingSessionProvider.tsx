import {createContext, ReactNode, useMemo, useState} from 'react'
import {ParkingLicensePlate, ParkingSession} from '@/modules/parking/types'
import {dayjs, Dayjs} from '@/utils/datetime/dayjs'
import {roundDownToMinutes} from '@/utils/datetime/roundDownToMinutes'

export type ParkingSessionContextType = {
  amount?: number
  endTime?: Dayjs
  licensePlate?: ParkingLicensePlate
  paymentZoneId?: string
  ps_right_id?: number
  report_code?: string
  setAmount: (amount: number) => void
  setEndTime: (datetime: Dayjs | undefined) => void
  setLicensePlate: (licensePlate: ParkingLicensePlate) => void
  setPaymentZoneId: (paymentZoneId: string) => void
  setStartTime: (datetime: Dayjs) => void
  startTime: Dayjs
}

const initialValue: ParkingSessionContextType = {
  licensePlate: undefined,
  setLicensePlate: () => null,
  startTime: roundDownToMinutes(),
  setStartTime: () => null,
  endTime: undefined,
  setEndTime: () => null,
  paymentZoneId: undefined,
  setPaymentZoneId: () => null,
  ps_right_id: undefined,
  report_code: undefined,
  amount: undefined,
  setAmount: () => null,
}

export const ParkingSessionContext = createContext(initialValue)

type Props = {
  children: ReactNode
  parkingSession?: ParkingSession
}

export const ParkingSessionProvider = ({children, parkingSession}: Props) => {
  const [licensePlate, setLicensePlate] = useState<
    ParkingLicensePlate | undefined
  >(
    parkingSession
      ? {
          vehicle_id: parkingSession.vehicle_id,
          visitor_name: parkingSession?.visitor_name,
        }
      : undefined,
  )
  const [startTime, setStartTime] = useState<Dayjs>(
    parkingSession
      ? dayjs(parkingSession.start_date_time)
      : roundDownToMinutes(),
  )
  const [endTime, setEndTime] = useState<Dayjs | undefined>(
    parkingSession ? dayjs(parkingSession.end_date_time) : undefined,
  )
  const [paymentZoneId, setPaymentZoneId] = useState<string | undefined>(
    parkingSession ? parkingSession.payment_zone_id : undefined,
  )
  const [amount, setAmount] = useState<number | undefined>()

  const value = useMemo(
    () => ({
      licensePlate,
      setLicensePlate,
      startTime,
      setStartTime,
      endTime,
      setEndTime,
      paymentZoneId,
      setPaymentZoneId,
      ps_right_id: parkingSession?.ps_right_id,
      report_code: parkingSession?.report_code,
      amount,
      setAmount,
    }),
    [
      amount,
      endTime,
      licensePlate,
      parkingSession?.ps_right_id,
      parkingSession?.report_code,
      paymentZoneId,
      startTime,
    ],
  )

  return (
    <ParkingSessionContext.Provider value={value}>
      {children}
    </ParkingSessionContext.Provider>
  )
}
