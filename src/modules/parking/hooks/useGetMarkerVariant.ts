import type {ParkingMachine} from '@/modules/parking/types'
import {MarkerVariant} from '@/components/features/map/marker/markers'

export const useGetMarkerVariant =
  (
    selectedMarkerId?: ParkingMachine['id'],
    favoriteMarkerId?: ParkingMachine['id'],
  ) =>
  (markerId: string): MarkerVariant => {
    if (markerId === selectedMarkerId) {
      return MarkerVariant.selectedPin
    }

    if (markerId === favoriteMarkerId) {
      return MarkerVariant.favoritePin
    }

    return MarkerVariant.pin
  }
