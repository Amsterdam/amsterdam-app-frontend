import {MarkerVariant} from '@/components/features/map/marker/markers'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useSelectedParkingMachineId} from '@/modules/parking/slice'

export const useGetMarkerVariant = () => {
  const selectedParkingMachineId = useSelectedParkingMachineId()
  const {parking_machine_favorite} = useCurrentParkingPermit()

  return (markerId: string): MarkerVariant => {
    if (markerId === selectedParkingMachineId) {
      return MarkerVariant.selectedPin
    }

    if (markerId === parking_machine_favorite) {
      return MarkerVariant.favoritePin
    }

    return MarkerVariant.pin
  }
}
