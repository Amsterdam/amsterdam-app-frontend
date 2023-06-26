import {AddressState} from '@/modules/address/slice'
import {AddressCity} from '@/modules/address/types'
import {
  AnyPersistedStateTransformer,
  PersistedStateTransformer,
} from '@/store/types'
import {getCoordinates} from '@/utils/address'

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

const transformOldAddressState: PersistedStateTransformer<
  OldAdressState,
  AddressState
> = {
  // Transform old state using Dutch keys and centroid rather than coordinates
  appVersion: '0.36.0',
  transform: oldAddressState => {
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
    } = oldAddressState

    let addition: string | undefined
    if (bag_huisletter) {
      addition = bag_huisletter
    }
    if (bag_toevoeging) {
      addition = bag_toevoeging
    }

    return {
      address: {
        addition,
        bagId: bagNummeraanduidingId,
        city: woonplaats,
        coordinates: getCoordinates(centroid, coordinates),
        number: huisnummer,
        postcode,
        shortAddress: adres,
        street: straatnaam,
      },
    }
  },
}

export const transformers: AnyPersistedStateTransformer[] = [
  transformOldAddressState,
]
