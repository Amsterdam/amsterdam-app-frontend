import {type Address, Coordinates} from '@/modules/address/types'
import {type PollingStation} from '@/modules/vote/types'
import {getDistance} from '@/utils/getDistance'

// Sort pollingStations by distance to address if address and coordinates exist
export const getSortedPollingStations = (
  pollingStations: PollingStation[],
  address?: Address,
) =>
  address?.coordinates
    ? [...pollingStations].sort((a, b) => {
        const aDist = getDistance(
          {lat: a.position.lat, lon: a.position.lng},
          address.coordinates as Coordinates,
        )
        const bDist = getDistance(
          {lat: b.position.lat, lon: b.position.lng},
          address.coordinates as Coordinates,
        )

        return aDist - bDist
      })
    : pollingStations
