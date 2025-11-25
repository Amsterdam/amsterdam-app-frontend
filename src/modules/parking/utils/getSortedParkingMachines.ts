import type {ParkingMachine} from '@/modules/parking/types'
import {type Address, Coordinates} from '@/modules/address/types'
import {getDistance} from '@/utils/getDistance'

// Sort parkingMachines by distance to address if address and coordinates exist
export const getSortedParkingMachines = (
  parkingMachines: ParkingMachine[],
  address?: Address,
) =>
  address?.coordinates
    ? parkingMachines
        .map(parkingMachine => ({
          ...parkingMachine,
          distance: getDistance(
            {lat: parkingMachine.lat, lon: parkingMachine.lon},
            address.coordinates as Coordinates,
          ),
        }))
        .sort((a, b) => a.distance - b.distance)
    : parkingMachines
