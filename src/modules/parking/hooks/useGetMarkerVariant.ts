import {MarkerVariant} from '@/components/features/map/marker/markers'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {usePermitMapContext} from '@/modules/parking/hooks/usePermitMapContext'

export const useGetMarkerVariant = () => {
  const {parking_machine_favorite} = useCurrentParkingPermit()
  const {selectedParkingMachineId} = usePermitMapContext()

  return (parkingMachineId: string): MarkerVariant => {
    if (parkingMachineId === selectedParkingMachineId) {
      return MarkerVariant.selectedPin
    }

    if (parkingMachineId === parking_machine_favorite) {
      return MarkerVariant.favoritePin
    }

    return MarkerVariant.pin
  }
}
