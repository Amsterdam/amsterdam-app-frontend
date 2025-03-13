import {createContext, ReactNode, useState} from 'react'
import {ParkingLicensePlate, ParkingSession} from '@/modules/parking/types'

export type ParkingSessionContextType = {
  addLicensePlate: (licensePlate: ParkingLicensePlate) => void
  addParkingSession: (session: ParkingSession) => void
  licensePlate?: ParkingLicensePlate
  parkingSession?: ParkingSession
}

const initialValue: ParkingSessionContextType = {
  licensePlate: undefined,
  addLicensePlate: () => null,
  addParkingSession: () => null,
  parkingSession: undefined,
}

export const ParkingSessionContext = createContext(initialValue)

type Props = {
  children: ReactNode
}

export const ParkingSessionProvider = ({children}: Props) => {
  const [licensePlate, setLicensePlate] = useState<ParkingLicensePlate>()
  const [parkingSession, setParkingSession] = useState<ParkingSession>()

  const addLicensePlate = (parkingLicensePlate: ParkingLicensePlate) => {
    setLicensePlate(parkingLicensePlate)
  }

  const addParkingSession = (session: ParkingSession) => {
    setParkingSession(session)
  }

  return (
    <ParkingSessionContext.Provider
      value={{
        licensePlate,
        addLicensePlate,
        parkingSession,
        addParkingSession,
      }}>
      {children}
    </ParkingSessionContext.Provider>
  )
}
