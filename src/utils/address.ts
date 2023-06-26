import {Address, AddressQueryArg} from '@/modules/address'

export const getAddressParam = (
  address?: Address,
): AddressQueryArg | undefined => {
  if (!address?.coordinates) {
    return {address: address?.shortAddress}
  }
  return {
    address: undefined,
    ...address.coordinates,
  }
}

export const getCoordinates = (
  centroid?: [number, number],
  coordinates?: Address['coordinates'],
) => {
  if (!coordinates) {
    if (!centroid) {
      return
    }
    return {
      lat: centroid[1],
      lon: centroid[0],
    }
  }

  return coordinates
}
