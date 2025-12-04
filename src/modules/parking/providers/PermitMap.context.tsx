import {createContext, type RefObject} from 'react'
import type {Region} from 'react-native-maps'
import type MapView from 'react-native-maps'
import {ParkingMachine} from '@/modules/parking/types'

type ParkingMapContext = {
  animateToCluster: (region: Region) => void
  mapRef: RefObject<MapView | null>
  onSelectParkingMachine: (id: ParkingMachine['id']) => void
  region?: Region
  resetSelectedParkingMachineId: () => void
  selectedParkingMachineId?: ParkingMachine['id']
  setRegion: (region: Region) => void
}

export const PermitMapContext = createContext<ParkingMapContext | null>(null)
