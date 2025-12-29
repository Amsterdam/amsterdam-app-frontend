import {useLocation} from '@/modules/address/slice'
import {getGoogleMapsDirectionsUrl} from '@/utils/getGoogleMapsDirectionsUrl'

export const useGetGoogleMapsDirectionsUrl = (destination: {
  lat?: number
  lon?: number
}) => {
  const {location} = useLocation()

  return getGoogleMapsDirectionsUrl(location?.coordinates, destination)
}
