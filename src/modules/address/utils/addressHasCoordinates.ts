import type {Address} from '@/modules/address/types'

export const addressHasCoordinates = (
  address?: Address,
): address is Address & Required<Pick<Address, 'coordinates'>> =>
  !!address?.coordinates &&
  typeof address.coordinates.lat === 'number' &&
  typeof address.coordinates.lon === 'number'
