import {createContext} from 'react'
import {ParkingMachine} from '@/modules/parking/types'

type ParkingMapContext = {
  onSelectParkingMachine: (id: ParkingMachine['id']) => void
  resetSelectedParkingMachineId: () => void
  selectedParkingMachineId?: ParkingMachine['id']
}

export const PermitMapContext = createContext<ParkingMapContext | null>(null)
