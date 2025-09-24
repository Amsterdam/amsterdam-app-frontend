import {useAddress} from '@/modules/address/slice'
import {getGoogleMapsDirectionsUrl} from '@/utils/getGoogleMapsDirectionsUrl'

export const useGetGoogleMapsDirectionsUrl = (destination: {
  lat: number
  lon: number
}) => {
  const address = useAddress()

  return getGoogleMapsDirectionsUrl(address?.coordinates, destination)
}
