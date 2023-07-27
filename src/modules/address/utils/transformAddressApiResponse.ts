import {
  Address,
  AddressCity,
  AddressSuggestion,
  Coordinates,
} from '@/modules/address/types'

export const getAddition = (
  huisletter?: string,
  toevoeging?: string,
): string | undefined => {
  if (!huisletter && !toevoeging) {
    return
  }

  return huisletter || toevoeging
}

export const getAddressLine1 = (
  address: Pick<
    AddressSuggestion,
    'straatnaam' | 'huisnummer' | 'huisletter' | 'huisnummertoevoeging'
  >,
) => {
  if (address?.straatnaam && address?.huisnummer) {
    return `${address.straatnaam} ${address.huisnummer}${
      address.huisletter ?? ''
    }${address.huisnummertoevoeging ? '-' + address.huisnummertoevoeging : ''}`
  } else {
    return ''
  }
}

export const getAddressLine2 = (postcode: string, city: AddressCity) => {
  if (!postcode || !city) {
    return ''
  }

  return `${postcode.slice(0, 4)} ${postcode.slice(4)} ${city.toUpperCase()}`
}

const coordinatesRegex = /^POINT\((?<lon>\d+\.\d+) (?<lat>\d+\.\d+)\)$/

export const getCoordinates = (
  centroid: AddressSuggestion['centroide_ll'],
): Coordinates | undefined => {
  const result = coordinatesRegex.exec(centroid)

  if (result?.groups) {
    const {lat, lon} = result.groups as {lat: string; lon: string}

    return {
      lat: +lat,
      lon: +lon,
    }
  } else {
    return undefined
  }
}

export const transformAddressApiResponse = (
  address: AddressSuggestion,
): Address => {
  const {
    huisletter,
    huisnummertoevoeging,
    centroide_ll,
    huisnummer,
    nummeraanduiding_id,
    postcode,
    straatnaam,
    woonplaatsnaam,
  } = address

  return {
    addition: getAddition(huisletter, huisnummertoevoeging),
    additionLetter: huisletter || undefined,
    additionNumber: huisnummertoevoeging || undefined,
    addressLine1: getAddressLine1(address),
    addressLine2: getAddressLine2(postcode, woonplaatsnaam),
    bagId: nummeraanduiding_id,
    city: woonplaatsnaam,
    coordinates: getCoordinates(centroide_ll),
    number: huisnummer,
    postcode,
    street: straatnaam,
  }
}
