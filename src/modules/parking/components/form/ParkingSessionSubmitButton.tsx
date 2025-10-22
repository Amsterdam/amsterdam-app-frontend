import {ParkingActivateLicensePlateButton} from '@/modules/parking/components/form/ParkingActivateLicensePlateButton'
import {ParkingStartSessionButton} from '@/modules/parking/components/form/ParkingStartSessionButton'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'

export const ParkingSessionSubmitButton = () => {
  const currentPermit = useCurrentParkingPermit()

  if (currentPermit.no_endtime) {
    return <ParkingActivateLicensePlateButton />
  }

  return <ParkingStartSessionButton />
}
