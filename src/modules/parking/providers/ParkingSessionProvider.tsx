import {createContext, ReactNode, useMemo, useState} from 'react'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'
import {ParkingLicensePlate} from '@/modules/parking/types'
import {Dayjs} from '@/utils/datetime/dayjs'
import {roundDownPer5Minutes} from '@/utils/datetime/roundDownPer5Minutes'

export type ParkingSessionContextType = {
  bottomSheetVariant: ParkingSessionBottomSheetVariant
  endTime?: Dayjs
  licensePlate?: ParkingLicensePlate
  setBottomSheetVariant: (variant: ParkingSessionBottomSheetVariant) => void
  setEndTime: (datetime: Dayjs | undefined) => void
  setLicensePlate: (licensePlate: ParkingLicensePlate) => void
  setStartTime: (datetime: Dayjs) => void
  startTime: Dayjs
}

const initialValue: ParkingSessionContextType = {
  licensePlate: undefined,
  setLicensePlate: () => null,
  startTime: roundDownPer5Minutes(),
  setStartTime: () => null,
  endTime: undefined,
  setEndTime: () => null,
  bottomSheetVariant: ParkingSessionBottomSheetVariant.licensePlate,
  setBottomSheetVariant: () => null,
}

export const ParkingSessionContext = createContext(initialValue)

type Props = {
  children: ReactNode
}

export const ParkingSessionProvider = ({children}: Props) => {
  const [licensePlate, setLicensePlate] = useState<ParkingLicensePlate>()
  const [startTime, setStartTime] = useState<Dayjs>(roundDownPer5Minutes())
  const [endTime, setEndTime] = useState<Dayjs | undefined>()
  const [bottomSheetVariant, setBottomSheetVariant] =
    useState<ParkingSessionBottomSheetVariant>(
      ParkingSessionBottomSheetVariant.licensePlate,
    )

  const value = useMemo(
    () => ({
      licensePlate,
      setLicensePlate,
      startTime,
      setStartTime,
      endTime,
      setEndTime,
      bottomSheetVariant,
      setBottomSheetVariant,
    }),
    [bottomSheetVariant, endTime, licensePlate, startTime],
  )

  return (
    <ParkingSessionContext.Provider value={value}>
      {children}
    </ParkingSessionContext.Provider>
  )
}
