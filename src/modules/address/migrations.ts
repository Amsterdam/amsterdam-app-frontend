import {MigrationManifest, PersistedState} from 'redux-persist'
import {AddressState} from '@/modules/address/slice'
import {AddressCity} from '@/modules/address/types'
import {getAddressLine2, getCoordinates} from '@/utils/address'

type OldAdressState = {
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
  // added in 0.36.0
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
    } = oldAddressState as unknown as OldAdressState

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

    let addition: string | undefined
    if (bag_huisletter) {
      addition = bag_huisletter
    }
    if (bag_toevoeging) {
      addition = bag_toevoeging
    }

    const addressState: AddressState = {
      address: {
        addition,
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
