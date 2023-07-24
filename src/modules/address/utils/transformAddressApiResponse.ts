import {Address, AddressCity, ApiAddress} from '@/modules/address/types'

export const getAddition = (bag_huisletter: string, bag_toevoeging: string) => {
  if (!bag_huisletter && !bag_toevoeging) {
    return
  }

  return bag_huisletter || bag_toevoeging
}

export const getAddressLine2 = (postcode: string, city: AddressCity) => {
  if (!postcode || !city) {
    return ''
  }

  return `${postcode.slice(0, 4)} ${postcode.slice(4)} ${city.toUpperCase()}`
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

export const transformAddressApiResponse = (address: ApiAddress): Address => {
  const {
    adres,
    bag_huisletter,
    bag_toevoeging,
    centroid,
    coordinates,
    huisnummer,
    landelijk_id,
    postcode,
    straatnaam,
    woonplaats,
  } = address

  return {
    addition: getAddition(bag_huisletter, bag_toevoeging),
    additionLetter: bag_huisletter || undefined,
    additionNumber: bag_toevoeging || undefined,
    addressLine1: adres,
    addressLine2: getAddressLine2(postcode, woonplaats),
    bagId: landelijk_id,
    city: woonplaats,
    coordinates: getCoordinates(centroid, coordinates),
    number: huisnummer,
    postcode,
    street: straatnaam,
  }
}
