import {MigrationManifest, PersistedState} from 'redux-persist'
import {AddressState} from '@/modules/address/slice'
import {AddressCity} from '@/modules/address/types'
import {
  getAddition,
  getAddressLine2,
  getCoordinates,
} from '@/modules/address/utils/transformAddressApiResponse'

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
        additionLetter: bag_huisletter || undefined,
        additionNumber: bag_toevoeging || undefined,
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
}
