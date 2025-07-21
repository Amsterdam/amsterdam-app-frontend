import {createContext} from 'react'
import {ParkingPermit} from '@/modules/parking/types'

export const CurrentPermitContext = createContext<ParkingPermit | null>(null)
