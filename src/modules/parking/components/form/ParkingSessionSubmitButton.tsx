import {ParkingActivateLicensePlateButton} from '@/modules/parking/components/form/ParkingActivateLicensePlateButton'
import {ParkingStartSessionButton} from '@/modules/parking/components/form/ParkingStartSessionButton'
import {useCurrentParkingApiVersion} from '@/modules/parking/hooks/useCurrentParkingApiVersion'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {ParkingApiVersion} from '@/modules/parking/types'

export const ParkingSessionSubmitButton = () => {
  const currentPermit = useCurrentParkingPermit()
  const apiVersion = useCurrentParkingApiVersion()

  if (currentPermit.no_endtime && apiVersion === ParkingApiVersion.v2) {
    return <ParkingActivateLicensePlateButton />
  }

  return <ParkingStartSessionButton />
}
