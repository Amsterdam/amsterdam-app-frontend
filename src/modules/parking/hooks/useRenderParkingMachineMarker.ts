import type {MarkerVariants} from '@/components/features/map/marker/markers'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useSelectedParkingMachineId} from '@/modules/parking/slice'

export const useRenderParkingMachineMarker = () => {
  const selectedParkingMachineId = useSelectedParkingMachineId()
  const {parking_machine_favorite} = useCurrentParkingPermit()

  return (markerId: string): MarkerVariants => {
    if (markerId === selectedParkingMachineId) {
      return 'selectedPin'
    }

    if (markerId === parking_machine_favorite) {
      return 'favoritePin'
    }

    return 'pin'
  }
}
