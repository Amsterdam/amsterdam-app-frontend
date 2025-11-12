import {useCurrentParkingApiVersion} from '@/modules/parking/hooks/useCurrentParkingApiVersion'
import {ParkingApiVersion} from '@/modules/parking/types'

export const useGetMaxLicensePlates = () => {
  const apiVersion = useCurrentParkingApiVersion()

  return apiVersion === ParkingApiVersion.v1 ? 9 : 10
}
