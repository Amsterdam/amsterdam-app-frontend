import {type Address, Coordinates} from '@/modules/address/types'
import {type PollingStation} from '@/modules/elections/types'
import {getDistance} from '@/utils/getDistance'

// Sort pollingStations by distance to address if address and coordinates exist
export const getSortedPollingStations = (
  pollingStations: PollingStation[],
  address?: Address,
) =>
  address?.coordinates
    ? pollingStations
        .map(station => ({
          ...station,
          distance: getDistance(
            {lat: station.position.lat, lon: station.position.lng},
            address.coordinates as Coordinates,
          ),
        }))
        .sort((a, b) => a.distance - b.distance)
    : pollingStations
