import {Address, AddressCity, AddressQueryArg} from '@/modules/address'

export const getAddressParam = (
  address?: Address,
): AddressQueryArg | undefined => {
  if (!address?.coordinates) {
    return {address: address?.addressLine1}
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

export const getAddressLine2 = (postcode: string, city: AddressCity) => {
  if (!postcode || !city) {
    return ''
  }

  return `${postcode.slice(0, 4)} ${postcode.slice(4)} ${city.toUpperCase()}`
}
