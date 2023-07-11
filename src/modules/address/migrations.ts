import {MigrationManifest, PersistedState} from 'redux-persist'
import {AddressState} from '@/modules/address/slice'
import {AddressCity} from '@/modules/address/types'
import {getAddition, getAddressLine2, getCoordinates} from '@/utils/address'

type AddressStateNegative1 = {
  adres: string
  bagNummeraanduidingId: string
  bag_huisletter: string
  bag_toevoeging: string
  centroid?: [number, number]
  coordinates?: {
    lat: number
    lon: number
  }
  huisnummer: number
  postcode: string
  straatnaam: string
  woonplaats: AddressCity
}

type AdressState0 = {
  address?: {
    addition?: string
    addressLine1: string
    addressLine2: string
    bagId: string
    city: AddressCity
    coordinates?: {
      lat: number
      lon: number
    }
    number: number
    postcode: string
    street: string
  }
}

export const migrations: MigrationManifest = {
  // added in 0.37.0
  0: oldAddressState => {
    const {
      adres,
      bag_huisletter,
      bag_toevoeging,
      bagNummeraanduidingId,
      woonplaats,
      centroid,
      coordinates,
      huisnummer,
      postcode,
      straatnaam,
    } = oldAddressState as unknown as AddressStateNegative1

    if (
      [
        adres,
        bag_huisletter,
        bag_toevoeging,
        bagNummeraanduidingId,
        woonplaats,
        huisnummer,
        postcode,
        straatnaam,
      ].some(item => item === undefined)
    ) {
      return {} as PersistedState
    }

    const addressState: AddressState = {
      address: {
        addition: getAddition(bag_huisletter, bag_toevoeging),
        addressLine1: adres,
        addressLine2: getAddressLine2(postcode, woonplaats),
        bagId: bagNummeraanduidingId,
        city: woonplaats,
        coordinates: getCoordinates(centroid, coordinates),
        number: huisnummer,
        postcode,
        street: straatnaam,
      },
    }

    return addressState as PersistedState
  },
  // added in 0.38.0
  1: oldAddressState => {
    const {address: oldAddress} = oldAddressState as unknown as AdressState0

    if (!oldAddress) {
      return {} as PersistedState
    }

    const {addition} = oldAddress
    let additionLetter
    let additionNumber

    if (addition) {
      if (!isNaN(parseInt(addition, 10))) {
        additionNumber = addition
      } else {
        additionLetter = addition
      }
    }

    const addressState: AddressState = {
      address: {
        ...oldAddress,
        additionLetter,
        additionNumber,
      },
    }

    return addressState as PersistedState
  },
}
